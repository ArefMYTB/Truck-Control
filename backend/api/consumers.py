import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Truck
import base64
from PIL import Image
from io import BytesIO

import os
from pathlib import Path
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
        text_data_json = json.loads(text_data)

        # Save the images
        if text_data_json["lp_image_src"] != None:
            lp_im = Image.open(BytesIO(base64.b64decode(text_data_json["lp_image_src"].encode('utf-8'))))
            lp_im.save(f'{MEDIA_ROOT}{text_data_json["lp_image"]}', 'PNG')

        if text_data_json["container_image_src"] != None:
            cp_im = Image.open(BytesIO(base64.b64decode(text_data_json["container_image_src"].encode('utf-8'))))
            cp_im.save(f'{MEDIA_ROOT}{text_data_json["container_image"]}', 'PNG')

        vehicle_image_front = text_data_json["vehicle_image_front"]
        vehicle_image_back = text_data_json["vehicle_image_back"]
        lp_codes = text_data_json["lp_codes"]
        lp_image = text_data_json["lp_image"]
        container_codes = text_data_json["container_codes"]
        container_image = text_data_json["container_image"]

        # Create new data
        Truck.objects.create(
            vehicle_image_front=vehicle_image_front,
            vehicle_image_back=vehicle_image_back,
            lp_codes=lp_codes,
            lp_image=lp_image,
            lp_acc=[70],
            plate_type="Iran",
            container_codes=container_codes,
            container_image=container_image,
            container_acc=[60],
            Container_size="20 فوت",
            load_type="فله",
            seal=False,
            imdg=False,
            driver_id="9876543210",
            driver_face="images/luffy.jpg",
            driver_confirmed=False,
            log_time="2025-01-14 10:30:00",
            status="تست",
            weight="200kg"
        )

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.service_group_name, {"type": "chat.message", "lp_codes": lp_codes}
        )

    # Receive message from room group
    def chat_message(self, event):
        self.send(text_data="Got it")