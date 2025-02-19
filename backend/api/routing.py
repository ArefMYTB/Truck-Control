from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/newtruck/(?P<service_name>\w+)/$", consumers.NewTruckConsumer.as_asgi()),
]