from rest_framework import serializers
from sounds.models import Sound, Character


class SoundSerializer(serializers.ModelSerializer):

    character = serializers.ReadOnlyField(source='character.name')
    charId = serializers.ReadOnlyField(source='character.id')

    class Meta:
        model = Sound
        fields = '__all__'
        read_only_fields = ('displayName', 'name', 'audio', 'date_created')
