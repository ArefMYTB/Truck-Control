from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
    trucks = Truck.objects.all()
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
#     vehicle_image_front="@/app/assets/images/luffy.jpg",
#     vehicle_image_back="@/app/assets/images/luffy.jpg",
#     lp_codes=["1236910س"],
#     lp_image="@/app/assets/images/lp.png",
#     lp_acc=88,
#     plate_type="Iran",
#     container_codes=["MIOU525872145G1"],
#     container_image="@/app/assets/images/cp.png",
#     container_acc=77,
#     Container_size="20 فوت",
#     load_type="فله",
#     seal=True,
#     imdg=True,
#     driver_id="9876543210",
#     driver_face="@/app/assets/images/luffy.jpg",
#     driver_confirmed = True,
#     log_time="2025-01-14 10:30:00",
#     status="تست",
#     weight="200kg"
# )












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