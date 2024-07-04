from django.contrib import admin
from .models import Review

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('customer', 'book', 'rating', 'created_at')
    search_fields = ('customer__email', 'book__title', 'rating', 'text')
    list_filter = ('rating', 'created_at')

admin.site.register(Review, ReviewAdmin)
