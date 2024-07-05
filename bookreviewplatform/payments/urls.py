# payments/urls.py
from django.urls import path
from .views import create_checkout_session

urlpatterns = [
    path('payments/create-checkout-session/', create_checkout_session, name='create-checkout-session'),
]