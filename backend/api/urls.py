from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('login/', views.login, name='login'),
    path('captcha/refresh/', views.refresh_captcha, name='refresh_captcha'),
    path('captcha/', include('captcha.urls')), 

    path('api/dashboard/', views.get_dashboard_data, name='dashboard_data'),
    path('api/videos/', views.get_camera_videos, name='camera_videos'),
    
    path('api/trucklog/', views.get_truck_data, name='get_truck_data'),
    path('api/trucklog/update/<int:pk>/', views.update_truck, name='update_truck'),
    path('api/trucklog/delete/<int:pk>/', views.delete_truck, name='delete_truck'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)