# Generated by Django 5.0.6 on 2024-07-04 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='price',
            field=models.PositiveIntegerField(default=1000),
        ),
    ]