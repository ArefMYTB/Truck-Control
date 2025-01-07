from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TruckLog
from .serializers import TruckLogSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class TruckLogViewSet(ModelViewSet):
    queryset = TruckLog.objects.all()
    serializer_class = TruckLogSerializer


@api_view(['GET'])
def get_dashboard_data(request):
    data = {
        "total_20foot_entries": 800,
        "total_fele_entries": 350,
        "total_40foot_entries": 250,
    }

    total_entries = sum(data.values())

    data_percentage = {key: (value / total_entries) * 100 for key, value in data.items()}

    response_data = {
        "getTotal": total_entries,
        "entries": data,
        "percentages": data_percentage
    }

    return Response(response_data)
