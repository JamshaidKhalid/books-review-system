# customers/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from genre.models import Genre

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
        genres = validated_data.pop('genres', [])
        password = validated_data.pop('password')
        customer = Customer(**validated_data)
        customer.set_password(password)
        customer.save()
        customer.genres.set(genres)
        return customer

class CustomerSerializer(serializers.ModelSerializer):
    genres = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True)
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'username',
            'email',
            'name',
            'genres',
            'followers',
            'following',
        ]
