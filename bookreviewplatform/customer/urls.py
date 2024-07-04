from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from .views import CustomerRegisterView, CustomerViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'profile', CustomerViewSet, basename='profile')

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('', include(router.urls)),
    path('profile/follow/', CustomerViewSet.as_view({'post': 'follow'}), name='customer-follow'),
    path('profile/unfollow/', CustomerViewSet.as_view({'post': 'unfollow'}), name='customer-unfollow'),
    path('profile/<int:pk>/followers/', CustomerViewSet.as_view({'get': 'followers'}), name='customer-followers'),
    path('profile/<int:pk>/following/', CustomerViewSet.as_view({'get': 'following'}), name='customer-following'),
    path('list_users/', CustomerViewSet.as_view({'get': 'list_users'}), name='list-users'),
]
