from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/sounds', views.SoundListCreate.as_view())
]
