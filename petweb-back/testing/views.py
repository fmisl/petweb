# from django.http import HttpResponse
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse


class fileList(APIView):
    def get(self, request, format=None):
        # return HttpResponse("Hello, world. You're at the polls index.")

        items = [{"id": 0, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.21, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 38, "Sex": "M", "Update": "20.07.15"},
        {"id": 1, "Opened": False, "Select": False, "Tracer": "FBB", "SUVR": 1.5, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 26, "Sex": "M", "Update": "20.07.15"},
        {"id": 2, "Opened": False, "Select": False, "Tracer": "FBB", "SUVR": 1.1, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 39, "Sex": "M", "Update": "20.07.15"},
        {"id": 3, "Opened": False, "Select": False, "Tracer": "FBP", "SUVR": 2.1, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 33, "Sex": "M", "Update": "20.07.15"},
        {"id": 4, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 34, "Sex": "M", "Update": "20.07.15"},
        {"id": 5, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.51, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 42, "Sex": "M", "Update": "20.07.15"},
        {"id": 6, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 1.2, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 55, "Sex": "M", "Update": "20.07.15"},
        {"id": 7, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 1.52, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"},
        {"id": 8, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 0.72, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 46, "Sex": "M", "Update": "20.07.15"},
        {"id": 9, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.0, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 88, "Sex": "M", "Update": "20.07.15"},
        {"id": 10, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.2, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 56, "Sex": "M", "Update": "20.07.15"},
        {"id": 11, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.8, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 47, "Sex": "M", "Update": "20.07.15"},
        {"id": 12, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 3.0, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 86, "Sex": "M", "Update": "20.07.15"},
        {"id": 13, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 66, "Sex": "M", "Update": "20.07.15"},
        {"id": 14, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.9, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"},
        {"id": 15, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.2, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 56, "Sex": "M", "Update": "20.07.15"},
        {"id": 16, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.8, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 47, "Sex": "M", "Update": "20.07.15"},
        {"id": 17, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 3.0, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 86, "Sex": "M", "Update": "20.07.15"},
        {"id": 18, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 66, "Sex": "M", "Update": "20.07.15"},
        {"id": 19, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.9, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"},
        {"id": 20, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.2, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 56, "Sex": "M", "Update": "20.07.15"},
        {"id": 21, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.8, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 47, "Sex": "M", "Update": "20.07.15"},
        {"id": 22, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 3.0, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 86, "Sex": "M", "Update": "20.07.15"},
        {"id": 23, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 66, "Sex": "M", "Update": "20.07.15"},
        {"id": 24, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.9, "PatientName": "Sandwich Eater",
         "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"}]
        return JsonResponse(items, safe=False)
