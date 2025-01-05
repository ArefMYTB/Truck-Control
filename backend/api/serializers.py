from rest_framework import serializers
from .models import TruckLog

class TruckLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckLog
        fields = '__all__'
