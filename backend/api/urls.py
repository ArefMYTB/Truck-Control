from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/dashboard/', views.get_dashboard_data, name='dashboard_data'),
    path('api/videos/', views.get_camera_videos, name='camera_videos'),
    path('api/trucklog/', views.get_truck_data, name='get_truck_data'),
    path('api/trucklog/<int:pk>/', views.update_truck, name='update_truck'),
    path('api/trucklog/delete/<int:pk>/', views.delete_truck, name='delete_truck'),
]

