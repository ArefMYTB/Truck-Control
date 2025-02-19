from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from .models import Truck
from .serializers import TruckSerializer
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login as auth_login
from .forms import LoginForm
from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url
from django.shortcuts import render


@csrf_exempt
def refresh_captcha(request):
    if request.method == 'GET':
        new_key = CaptchaStore.generate_key()
        new_image = captcha_image_url(new_key)
        return JsonResponse({'image': new_image, 'key': new_key})
    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = LoginForm(data)
            if form.is_valid():
                username = data.get('username')
                password = data.get('password')

                user = authenticate(username=username, password=password)
                if user:
                    auth_login(request, user)  # Logs in the user
                    return JsonResponse({'is_valid': True, 'message': 'Login successful'})
                else:
                    return JsonResponse({'is_valid': False, 'message': 'Invalid credentials'})
            else:
                return JsonResponse({'is_valid': False, 'errors': form.errors})
        except Exception as e:
            return JsonResponse({'error': 'Invalid request', 'details': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)


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
    load_type = request.query_params.get('load_type', None)
    container_size = request.query_params.get('container_size', None)
    lp_codes = request.query_params.get('lp_codes', None)
    container_codes = request.query_params.get('container_codes', None)
    # container_prefix = request.query_params.get('container_prefix', None)
    # container_number = request.query_params.get('container_number', None)

    filters = {}

    if load_type:
        filters['load_type__icontains'] = load_type

    if container_size:
        filters['Container_size'] = container_size

    trucks = Truck.objects.filter(**filters)

    if lp_codes:
        trucks = trucks.filter(lp_codes__icontains=lp_codes)

    if container_codes:
        trucks = trucks.filter(container_codes__icontains=container_codes)

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
#     lp_codes=["5n1142"],
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

# curl -X POST ws://localhost:8000/ws/api/receivelicenseplatedata/ \
#      -H "Content-Type: application/json" \
#      -d '{
#            "lp_codes": ["14ein15536"],
#            "lp_image": "images/lp.png",
#            "vehicle_image_front": "images/front.png"
#          }'
