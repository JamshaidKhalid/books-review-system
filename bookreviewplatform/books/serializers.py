from rest_framework import serializers
from .models import Book
from genre.models import Genre
from genre.serializers import GenreSerializer
from reviews.serializers import ReviewSerializer

class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True, write_only=True, source='genres')
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date', 'genres', 'genre_ids', 'cover_image', 'reviews']
