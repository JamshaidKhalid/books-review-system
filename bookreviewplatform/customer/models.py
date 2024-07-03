# customers/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from genre.models import Genre

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class Customer(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    genres = models.ManyToManyField(Genre, blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Remove `email` from REQUIRED_FIELDS

    objects = CustomUserManager()

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customer_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customer_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.email
