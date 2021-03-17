from django.urls import path

from . import views

urlpatterns = [
    path('', views.fileList.as_view(), name='fileList'),
]