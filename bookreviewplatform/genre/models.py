from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.name
