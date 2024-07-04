from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import ImageViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('customer.urls')),
    path('api/', include('genre.urls')),
    path('api/', include('books.urls')),
    path('api/', include('reviews.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('book_covers/<str:image_name>/', ImageViewSet.as_view(), name='image-detail'),
]
