from django.urls import path
from .views import recommend_similar

urlpatterns = [
    path('similar/',recommend_similar,name='recommend-similar'),
]