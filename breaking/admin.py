from django.contrib import admin
from .models import Sound, Character

# Register your models here.


class CharacterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class SoundAdmin(admin.ModelAdmin):
    list_display = ('character', 'displayName', 'audio')


admin.site.register(Sound, SoundAdmin)
admin.site.register(Character, CharacterAdmin)