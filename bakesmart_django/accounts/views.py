from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import  UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView) :
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        refresh=RefreshToken.for_user(user)
        return Response({
            "user":serializer.data,
            "refresh":str(refresh),
            "access":str(refresh.access_token),
        },status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    return Response({
        "username" : user.username,
        "email":user.email,
        "role": getattr(user,"role","user")
    })
