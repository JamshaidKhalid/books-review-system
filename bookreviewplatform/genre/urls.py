from django.urls import path, include
from .views import GenreViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'genre', GenreViewSet)

urlpatterns = [
    path('', include(router.urls)),
]