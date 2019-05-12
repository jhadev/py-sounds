from django.http import HttpResponse
from django.shortcuts import render
from .models import Sound
from rest_framework import generics
from sounds.serializers import SoundSerializer

# Create your views here.


class SoundListCreate(generics.ListCreateAPIView):
    queryset = Sound.objects.all()
    serializer_class = SoundSerializer


def index(request):
    sounds = Sound.objects.all()

    return render(request, 'index.html', {'sounds': sounds})
