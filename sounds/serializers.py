from rest_framework import serializers
from sounds.models import Sound, Character


class SoundSerializer(serializers.ModelSerializer):

    character = serializers.ReadOnlyField(source='character.name')

    class Meta:
        model = Sound
        fields = '__all__'
