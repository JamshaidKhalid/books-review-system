# Generated by Django 5.0.6 on 2024-07-03 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('genre', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='genre',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
    ]