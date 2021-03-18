from django.urls import path

from . import views

urlpatterns = [
    path('', views.fileList.as_view(), name='fileList'),
    path('uploader/', views.uploader.as_view(), name='uploader'),
    # path('operator/', views.operator.as_view(), name='operator'),
]