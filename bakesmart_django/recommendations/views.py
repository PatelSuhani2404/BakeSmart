from math import isfinite
import re
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

PRODUCTS_API = "http://127.0.0.1:5000/api/products"

def _norm(s):
    if not s:
        return []
    return [t for t in re.split(r'[^a-z0-9]+', str(s).lower()) if t]

def _price(p):
    try:
        return float(p)
    except Exception:
        return None

def similarity(a, b):
    """
    Simple score:
    +3 if same category
    +2 if same flavor (case-insensitive)
    + (# of overlapping tokens in name)
    - price_penalty (0..1) where penalty = |pa - pb| / max(pa, pb)
    """
    score = 0.0

    if (a.get('category') or '').lower() == (b.get('category') or '').lower():
        score += 3.0

    if (a.get('flavor') or '').lower() == (b.get('flavor') or '').lower() and (a.get('flavor') or '') != '':
        score += 2.0

    na = set(_norm(a.get('name')))
    nb = set(_norm(b.get('name')))
    if na and nb:
        score += float(len(na.intersection(nb)))

    pa = _price(a.get('price'))
    pb = _price(b.get('price'))
    if pa and pb and pa > 0 and pb > 0 and isfinite(pa) and isfinite(pb):
        penalty = abs(pa - pb) / max(pa, pb)
        score -= penalty  

    return score

@api_view(['GET'])
@permission_classes([AllowAny])  
def recommend_similar(request):
    """
    /api/recommendations/similar/?id=<productId>
    or
    /api/recommendations/similar/?name=<productName>

    Returns top 6 similar products (excluding the seed item).
    """
    seed_id = request.GET.get('id')
    seed_name = request.GET.get('name')

    try:
        resp = requests.get(PRODUCTS_API, timeout=5)
        resp.raise_for_status()
        products = resp.json()
    except Exception as e:
        return Response({"error": f"Failed to fetch products: {e}"}, status=status.HTTP_502_BAD_GATEWAY)

    if not isinstance(products, list) or len(products) == 0:
        return Response({"error": "No products found"}, status=status.HTTP_404_NOT_FOUND)

    seed = None
    if seed_id:
        for p in products:
            if str(p.get('_id') or p.get('id')) == str(seed_id):
                seed = p
                break
    elif seed_name:
        for p in products:
            if (p.get('name') or '').strip().lower() == seed_name.strip().lower():
                seed = p
                break

    if not seed:
        return Response({"error": "Seed product not found. Provide ?id or ?name."}, status=status.HTTP_400_BAD_REQUEST)

    scored = []
    seed_key = str(seed.get('_id') or seed.get('id') or '')
    for p in products:
        key = str(p.get('_id') or p.get('id') or '')
        if key == seed_key:
            continue
        s = similarity(seed, p)
        scored.append((s, p))

    scored.sort(key=lambda x: x[0], reverse=True)
    top = [p for (_, p) in scored[:6]]

    def normalize_prod(prod):
        return {
            "id": str(prod.get('_id') or prod.get('id')),
            "name": prod.get('name'),
            "price": prod.get('price'),
            "image": prod.get('image'),
            "flavor": prod.get('flavor'),
            "weight": prod.get('weight'),
            "category": prod.get('category'),
        }

    return Response([normalize_prod(p) for p in top], status=status.HTTP_200_OK)


import os, joblib, numpy as np, requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

MODEL_PATH = os.path.join(os.path.dirname(__file__), "ml_model.joblib")

_model = None
def get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            return None
        _model = joblib.load(MODEL_PATH)
    return _model

def _normalize(prod):
    return {
        "id": str(prod.get("pid") or prod.get("_id") or prod.get("id")),
        "name": prod.get("name"),
        "price": prod.get("price"),
        "image": prod.get("image"),
        "flavor": prod.get("flavor"),
        "weight": prod.get("weight"),
        "category": prod.get("category"),
    }