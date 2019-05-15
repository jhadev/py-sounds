from django.db import models
from django.utils import timezone

# Create your models here.


class Character(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Sound(models.Model):
    displayName = models.CharField(max_length=255)
    name = models.CharField(max_length=50)
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    audio = models.CharField(max_length=500)
    date_created = models.DateTimeField(default=timezone.now)