from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
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
    lp_code_range = request.query_params.get('lp_code_range', None)
    load_type = request.query_params.get('load_type', None)
    container_size = request.query_params.get('container_size', None)

    filters = {}

    if lp_code_range:
        try:
            start, end = map(int, lp_code_range.split('-'))
            filters['lp_codes__contains'] = [str(code) for code in range(start, end + 1)]
        except ValueError:
            pass

    if load_type:
        filters['load_type__icontains'] = load_type

    if container_size:
        filters['Container_size'] = container_size

    trucks = Truck.objects.filter(**filters)
    serializer = TruckSerializer(trucks, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
def update_truck(request, pk):
    try:
        truck = Truck.objects.get(pk=pk)
    except Truck.DoesNotExist:
        return Response({'error': 'Truck not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TruckSerializer(truck, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_truck(request, pk):
    try:
        truck = Truck.objects.get(pk=pk)
        truck.delete()
        return Response({"message": "Truck deleted successfully"}, status=status.HTTP_200_OK)
    except Truck.DoesNotExist:
        return Response({"error": "Truck not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error deleting truck: {e}")
        return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Data
# python manage.py shell
# from api.models import Truck

# Truck.objects.create(
#     vehicle_image_front="images/front.png",
#     vehicle_image_back="images/back.png",
#     lp_codes=["1236914ج"],
#     lp_image="images/lp.png",
#     lp_acc=[70],
#     plate_type="Iran",
#     container_codes=["MIOU525872245G1"],
#     container_image="images/cp.png",
#     container_acc=[60],
#     Container_size="20 فوت",
#     load_type="فله",
#     seal=False,
#     imdg=True,
#     driver_id="9876543210",
#     driver_face="images/luffy.jpg",
#     driver_confirmed=False,
#     log_time="2025-01-14 10:30:00",
#     status="تست",
#     weight="200kg"
# )
