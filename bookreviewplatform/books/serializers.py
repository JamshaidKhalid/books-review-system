
from rest_framework import serializers
from .models import Book
from genre.models import Genre  # Import Genre model
from genre.serializers import GenreSerializer  # Import GenreSerializer

class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True, write_only=True, source='genres')

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date', 'genres', 'genre_ids', 'cover_image']
