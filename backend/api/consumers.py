import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import base64
from PIL import Image
from io import BytesIO
import os
from pathlib import Path
from django.utils import timezone
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

class NewTruckConsumer(WebsocketConsumer):
    def connect(self):
        self.service_name = self.scope["url_route"]["kwargs"]["service_name"]
        self.service_group_name = f"service_{self.service_name}"
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.service_group_name, self.channel_name
        )
        # Accept the WebSocket connection
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.service_group_name, self.channel_name
        )

    # Receive truck data from WebSocket
    def receive(self, text_data):
        from .models import Truck

        # Get the current time
        current_time = timezone.now().strftime('%Y-%m-%d %H:%M:%S') 

        text_data_json = json.loads(text_data)

        # Save the plate and container images
        if "lp_image_src" in text_data_json and text_data_json["lp_image_src"] != None:
            lp_im = Image.open(BytesIO(base64.b64decode(text_data_json["lp_image_src"].encode('utf-8'))))
            lp_im.save(f'{MEDIA_ROOT}{text_data_json["lp_image"]}', 'PNG')

        if "container_image_src" in text_data_json and text_data_json["container_image_src"] != None:
            cp_im = Image.open(BytesIO(base64.b64decode(text_data_json["container_image_src"].encode('utf-8'))))
            cp_im.save(f'{MEDIA_ROOT}{text_data_json["container_image"]}', 'PNG')

        # If this is "lp image" data -> create new Truck
        if text_data_json.get("lp_image"):
            if "vehicle_image_front_src" in text_data_json and text_data_json["vehicle_image_front_src"] != None:
                cp_im = Image.open(BytesIO(base64.b64decode(text_data_json["vehicle_image_front_src"].encode('utf-8'))))
                cp_im.save(f'{MEDIA_ROOT}{text_data_json["vehicle_image_front"]}', 'PNG')
            vehicle_image_front = text_data_json["vehicle_image_front"]
            lp_codes = text_data_json["lp_codes"]
            lp_acc = text_data_json["lp_acc"]
            lp_image = text_data_json["lp_image"]
            plate_type = text_data_json["plate_type"]

            new_truck = Truck.objects.create(
                vehicle_image_front=vehicle_image_front,
                lp_codes=lp_codes,
                lp_image=lp_image,
                lp_acc=lp_acc,
                plate_type=plate_type,
                Container_size="20 فوت",
                load_type="فله",
                seal=False,
                imdg=False,
                driver_id="9876543210",
                driver_face="images/luffy.jpg",
                driver_confirmed=False,
                log_time=current_time,
                status="تست",
                weight="200kg"
            ) 
            
            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.service_group_name, {"type": "chat.message", "lp_codes": lp_codes}
            )

        # If this is "container image" data -> update last truck
        elif text_data_json.get("container_image"):
            
            if "vehicle_image_back_src" in text_data_json and text_data_json["vehicle_image_back_src"] != None:
                cp_im = Image.open(BytesIO(base64.b64decode(text_data_json["vehicle_image_back_src"].encode('utf-8'))))
                cp_im.save(f'{MEDIA_ROOT}{text_data_json["vehicle_image_back"]}', 'PNG')

            vehicle_image_back = text_data_json["vehicle_image_back"]
            container_codes = text_data_json["container_codes"]
            container_image = text_data_json["container_image"]
            container_acc = text_data_json["container_acc"]

            try:
                truck = Truck.objects.latest('id')
                if not truck.container_image:
                    truck.vehicle_image_back = vehicle_image_back
                    truck.container_codes = container_codes
                    truck.container_acc = container_acc
                    truck.container_image = container_image
                    truck.save()
                else:
                    # Skip because this truck already has a container_image
                    print("Already existed")
                    pass
            except Truck.DoesNotExist:
                # Handle error if somehow last_truck_id is missing or deleted
                pass

            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.service_group_name, {"type": "chat.message", "container_codes": container_codes}
            )

    # Receive message from room group
    def chat_message(self, event):
        self.send(text_data="Got it")


from channels.generic.websocket import AsyncWebsocketConsumer

class VideoStreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Connect")
        # Called when the websocket is handshaking as part of the connection process.
        self.room_group_name = 'video_stream'

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Called when the WebSocket closes for any reason
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Called when a message is received from the WebSocket
        print("recieve")
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))




# import asyncio
# import subprocess
# from channels.generic.websocket import AsyncWebsocketConsumer

# class StreamConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("WebSocket connect attempt")
#         # Accept WebSocket connection
#         await self.accept()

#         # Start FFmpeg process to capture RTSP stream
#         try:
#             self.ffmpeg_process = subprocess.Popen(
#                 [
#                     'ffmpeg',
#                     '-i', 'rtsp://admin:Admin%40123@192.168.10.11:554',  # Replace with your RTSP stream URL
#                     '-f', 'mjpeg',  # MJPEG format
#                     '-q:v', '5',  # Set quality level
#                     '-'
#                 ],
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE
#             )

#             print("FFmpeg process started")

#             # Start sending frames asynchronously
#             asyncio.create_task(self.stream_video())

#         except Exception as e:
#             print(f"Error starting FFmpeg process: {e}")
#             await self.close()

#     async def stream_video(self):
#         try:
#             while True:
#                 # Read the video data (frame) from FFmpeg
#                 frame = self.ffmpeg_process.stdout.read(1024)
#                 if not frame:
#                     print("No frame received. Exiting.")
#                     break

#                 print("Sending frame to WebSocket")
#                 # Send the frame to WebSocket
#                 await self.send(bytes_data=frame)
#         except Exception as e:
#             print(f"Error while streaming video: {e}")

#     async def disconnect(self, close_code):
#         print(f"WebSocket disconnected with code {close_code}")
#         if self.ffmpeg_process:
#             self.ffmpeg_process.kill()
#             print("FFmpeg process killed")
