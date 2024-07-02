from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken


from customer.serializers import CustomerRegisterSerializer

class RegisterCustomerAPIView(APIView):
    serializer_class = CustomerRegisterSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            customer = serializer.save()
            serialized_data = serializer.data
            return Response(serialized_data, status=201)
        return Response(serializer.errors, status=400)


class LogoutAPIView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'success': 'User logged out successfully'}, status=200)
        except Exception as e:
            return Response({'error': 'Something went wrong'}, status=400)
