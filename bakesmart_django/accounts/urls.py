from django.urls import path
from .views import MyTokenObtainPairView, register_user, get_user_profile
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('login/',MyTokenObtainPairView.as_view(),name='login'),
    path('register/',register_user,name='register'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('user/',get_user_profile,name="user-profile"),
]