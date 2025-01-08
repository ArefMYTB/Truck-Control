from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TruckLog
from .serializers import TruckLogSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


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


@api_view(['GET'])
def get_camera_videos(request):
    video_data = [
        {"id": "4", "title": "دوربین پلاک خوان", "video_src": "/media/videos/LP.mp4"},
        {"id": "3", "title": "دوربین کانتینر بغل", "video_src": "/media/videos/side.mp4"},
        {"id": "2", "title": "دوربین پشت", "video_src": "/media/videos/back.mp4"},
        {"id": "1", "title": "دوربین روبرو", "video_src": "/media/videos/front.mp4"},
    ]

    return Response(video_data)







class TruckLogViewSet(ModelViewSet):
    queryset = TruckLog.objects.all()
    serializer_class = TruckLogSerializer


