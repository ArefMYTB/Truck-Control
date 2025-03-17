from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/newtruck/(?P<service_name>\w+)/$", consumers.NewTruckConsumer.as_asgi()),
    # re_path(r'ws/video_stream/$', consumers.VideoStreamConsumer.as_asgi()),
    # path("ws/stream/", consumers.StreamConsumer.as_asgi()),
]