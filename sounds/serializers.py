from rest_framework import serializers
from sounds.models import Sound


class SoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sound
        fields = '__all__'