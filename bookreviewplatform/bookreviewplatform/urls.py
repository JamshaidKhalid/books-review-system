from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('customer.urls')),
    path('api/', include('genre.urls')),
    path('api/', include('books.urls')),
]
