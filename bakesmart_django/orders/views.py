from django.shortcuts import render
from django.http import HttpResponse
from .models import Order
from rest_framework import viewsets, permissions
from .serializers import OrderSerializer

# Create your views here.

def home(request):
    return HttpResponse("Welcome to BakeSmart Backend!")

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class=OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff :
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)