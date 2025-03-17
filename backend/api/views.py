from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from .models import Truck
from .serializers import TruckSerializer
import random
from django.http import JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login as auth_login
from .forms import LoginForm
from captcha.models import CaptchaStore
from captcha.helpers import captcha_image_url
from django.shortcuts import render
import cv2
import threading
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

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




# class VideoCamera:
#     def __init__(self):
#         self.video_url = "rtsp://admin:Admin%40123@192.168.10.11:554"
#         self.video = cv2.VideoCapture(self.video_url, cv2.CAP_FFMPEG)

#         if not self.video.isOpened():
#             print("Failed to open RTSP stream")
#             self.running = False
#             return
        
#         self.running = True
#         self.grabbed, self.frame = self.video.read()
#         self.lock = threading.Lock()  # Prevents race conditions
#         self.thread = threading.Thread(target=self.update, daemon=True)
#         self.thread.start()

#     def update(self):
#         while self.running:
#             grabbed, frame = self.video.read()
#             if not grabbed:
#                 print("Failed to grab frame, retrying...")
#                 continue  # Prevents self.frame from being None
#             with self.lock:
#                 self.frame = frame

#     def get_frame(self):
#         with self.lock:
#             if self.frame is None:
#                 return None

#             success, jpeg = cv2.imencode('.jpg', self.frame)
#             if not success:
#                 print("Encoding failed")
#                 return None  # Prevent sending invalid data

#             return jpeg.tobytes()


#     def stop(self):
#         self.running = False
#         self.thread.join()  # Ensures clean exit
#         self.video.release()

# def get_camera(camera):
#     while camera.running:
#         frame = camera.get_frame()
#         # print(frame)
#         if frame:
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
#         else:
#             print("No frame available")

# def stream_video(request):
#     cam = VideoCamera()
#     if not cam.running:
#         return StreamingHttpResponse("Failed to open RTSP stream", status=500)

#     try:
#         return StreamingHttpResponse(
#             get_camera(cam),
#             content_type='multipart/x-mixed-replace; boundary=frame'
#         )
#     except Exception as e:
#         print(f"Error occurred: {e}")
#         cam.stop()
    
#     return StreamingHttpResponse("Stream stopped", status=500)




@api_view(['GET'])
def get_camera_videos(request):
    video_data = [
        {"id": "4", "title": "دوربین پلاک خوان", "video_src": "/media/temp/LP.mp4"},
        {"id": "3", "title": "دوربین کانتینر بغل", "video_src": "/media/temp/side.mp4"},
        {"id": "2", "title": "دوربین پشت", "video_src": "/media/temp/back.mp4"},
        {"id": "1", "title": "دوربین روبرو", "video_src": "/stream.m3u8"},
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
