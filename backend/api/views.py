from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Truck
from .serializers import TruckSerializer

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



@api_view(['GET'])
def get_truck_data(request):
    trucks = Truck.objects.all() 
    serializer = TruckSerializer(trucks, many=True)
    return Response(serializer.data)


# Data
# python manage.py shell
# from api.models import Truck

# Truck.objects.create(
#     plate_part1='18',
#     plate_letter='ب',
#     plate_part2='815',
#     plate_code='10',
#     container_part1='MIOU',
#     container_part2='486429',
#     container_part3='4',
#     container_part4='45G1',
#     load_type='نوع ۱',
#     container_size='۲۰ فوت',
#     driver_id='0123456789',
#     driver_confirmed=True,
#     weight='2000kg',
#     seal=True,
#     goods_type='کالا ۱',
#     route_type='مسیر ۱',
#     status='وضعیت ۱',
#     invoice_date='2025-01-01',
#     pass_date='2025-01-02',
# )

# Truck.objects.create(
#     plate_part1='27',
#     plate_letter='د',
#     plate_part2='345',
#     plate_code='11',
#     container_part1='MIOU',
#     container_part2='486429',
#     container_part3='4',
#     container_part4='45G1',
#     load_type='نوع ۲',
#     container_size='۴۰ فوت',
#     driver_id='9876543210',
#     driver_confirmed=False,
#     weight='4000kg',
#     seal=False,
#     goods_type='کالا ۲',
#     route_type='مسیر ۲',
#     status='وضعیت ۲',
#     invoice_date='2025-01-03',
#     pass_date='2025-01-04',
# )

