
from django.db import models
from genre.models import Genre  

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()
    genres = models.ManyToManyField(Genre)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)

    def __str__(self):
        return self.title
