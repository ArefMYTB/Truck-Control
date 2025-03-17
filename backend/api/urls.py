from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('login/', views.login, name='login'),
    path('captcha/refresh/', views.refresh_captcha, name='refresh_captcha'),
    path('captcha/', include('captcha.urls')), 

    path('dashboard/', views.get_dashboard_data, name='dashboard_data'),
    path('videos/', views.get_camera_videos, name='camera_videos'),
    # path("stream_video/", views.stream_video, name="stream_video"),
    
    path('trucklog/', views.get_truck_data, name='get_truck_data'),
    path('trucklog/update/<int:pk>/', views.update_truck, name='update_truck'),
    path('trucklog/delete/<int:pk>/', views.delete_truck, name='delete_truck'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])