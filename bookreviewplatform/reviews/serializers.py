
from rest_framework import serializers
from .models import Review
from books.models import Book
from customer.models import Customer

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'user', 'book', 'rating', 'text']

    def create(self, validated_data):
        user = self.context['request'].user
        book = validated_data['book']
        rating = validated_data['rating']
        text = validated_data['text']
        review = Review.objects.create(user=user, book=book, rating=rating, text=text)
        return review
