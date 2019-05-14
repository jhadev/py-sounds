from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/breaking', views.SoundListCreate.as_view())
]