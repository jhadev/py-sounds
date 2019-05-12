from django.db import models
from django.utils import timezone

# Create your models here.


class Sound(models.Model):
    displayName = models.CharField(max_length=255)
    name = models.CharField(max_length=50)
    character = models.CharField(max_length=50)
    charId = models.IntegerField()
    audio = models.CharField(max_length=500)
    date_created = models.DateTimeField(default=timezone.now)