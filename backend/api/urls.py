from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/dashboard/', views.get_dashboard_data, name='dashboard_data'),
]
