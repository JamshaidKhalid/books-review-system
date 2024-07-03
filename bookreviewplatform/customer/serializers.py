from rest_framework import serializers
from django.contrib.auth import get_user_model
from genre.models import Genre  # Make sure to import Genre model

Customer = get_user_model()

class CustomerRegisterSerializer(serializers.ModelSerializer):
    genres = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True, required=False)

    class Meta:
        model = Customer
        fields = [
            'username',
            'email',
            'password',
            'name',
            'genres',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        name = validated_data.get('name')
        genres = validated_data.pop('genres', [])

        customer = Customer(username=username, email=email, name=name)
        customer.set_password(password)
        customer.save()

        customer.genres.set(genres)  # Add genres after saving the user
        return customer
