from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from django.http import HttpResponse
import os

class ImageViewSet(APIView):
    def get(self, request, image_name):
        image_path = os.path.join(settings.BASE_DIR, 'book_covers', image_name)
        try:
            with open(image_path, 'rb') as image_file:
                return HttpResponse(image_file.read(), content_type="image/jpeg")  # Adjust content type as per your image type
        except FileNotFoundError:
            return HttpResponse(status=404)
