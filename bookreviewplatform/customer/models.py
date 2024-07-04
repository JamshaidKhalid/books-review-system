from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from genre.models import Genre

class CustomerManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):
        user = self.create_user(email, name, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class Customer(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    genres = models.ManyToManyField(Genre, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomerManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin
