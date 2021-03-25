from rest_framework import serializers
from . import models


# class SliceSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = models.Slice
#         fields = '__all__'


class CaseSerializer(serializers.ModelSerializer):
    # slices = SliceSerializer(many=True)
   # Update = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = models.Case
        fields = '__all__'
