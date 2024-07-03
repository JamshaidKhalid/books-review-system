# customers/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomerRegisterView, CustomerViewSet
from rest_framework_simplejwt.views import TokenBlacklistView

router = DefaultRouter()
router.register(r'profile', CustomerViewSet, basename='profile')

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer-register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('', include(router.urls)),
]
