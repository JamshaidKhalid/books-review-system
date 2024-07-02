from rest_framework import serializers
from django.contrib.auth import get_user_model

Customer = get_user_model()

class CustomerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'username',
            'email',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')

        customer = Customer(username=username, email=email)
        
        customer.set_password(password)
        customer.save()
        return customer 



