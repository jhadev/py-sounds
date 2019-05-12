from django.http import HttpResponse
from django.shortcuts import render
from .models import Sound

# Create your views here.


def index(request):
    sounds = Sound.objects.all()

    return render(request, 'index.html', {'sounds': sounds})
