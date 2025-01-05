from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TruckLog
from .serializers import TruckLogSerializer

class TruckLogViewSet(ModelViewSet):
    queryset = TruckLog.objects.all()
    serializer_class = TruckLogSerializer
