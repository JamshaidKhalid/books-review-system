from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'rating', 'text')
    search_fields = ('user__email', 'book__title')
    ordering = ('book',)
