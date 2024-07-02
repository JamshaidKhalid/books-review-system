from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from customer.serializers import CustomerRegisterSerializer

class RegisterCustomerAPIView(APIView):
    serializer_class = CustomerRegisterSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            serialized_data = serializer.data
            return Response(serialized_data = serialized_data, status=201)
        return Response(serializer.errors, status=400)
