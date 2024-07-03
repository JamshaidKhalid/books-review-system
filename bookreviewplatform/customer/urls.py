from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from customer.views import RegisterCustomerAPIView
from customer.views import LogoutAPIView

urlpatterns = [
    path('api/login', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register', RegisterCustomerAPIView.as_view(), name='register'),
    path('api/logout', LogoutAPIView.as_view(), name='logout'),
]