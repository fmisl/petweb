# from django.http import HttpResponse
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import nibabel as nib
from django.core.files.storage import FileSystemStorage
import numpy as np
from scipy import ndimage as nd
from PIL import Image
from shutil import move as mv


class uploader(APIView):

    def put(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')
        if not os.path.exists(uploader_path):
            os.mkdir(uploader_path)
        database_path = os.path.join(user_path, 'database')
        if not os.path.exists(database_path):
            os.mkdir(database_path)
        # receivedData = json.loads(request.data)
        jsonData = request.data
        print(len(jsonData))
        [mv(os.path.join(uploader_path, v['FileName']), os.path.join(database_path,v['FileName'])) for i, v in enumerate(jsonData)]

        # delete all files in uploader
        filenames = os.listdir(uploader_path)
        [os.remove(os.path.join(uploader_path, filename)) for i, filename in enumerate(filenames)
         if (filename.split(".")[-1]=='nii' or filename.split(".")[-1]=='jpg')]

        filenames = os.listdir(database_path)
        fileList = [{'id': i, 'Opened': False, 'Select': False, 'Tracer': '11C-PIB', 'SUVR': 2.21, 'FileName': filename,
                     'PatientName': 'Sandwich Eater', 'PatientID':'1010102213','Age':38,'Sex':'M', 'Update':'20.08.15'}
                    for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii')]

        return Response(data=fileList, status=status.HTTP_200_OK)
        # return Response("put post test ok", status=200)

    def post(self, request, format=None):
        print("success")
        userId = request.user.id
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')
        myfiles = request.FILES.getlist('myfiles')

        # Check if file attached
        if not myfiles:
            return Response(data="Files are not attached correctly", status=status.HTTP_400_BAD_REQUEST)

        # Save files in user_path/uploader
        fs = FileSystemStorage()
        # [fs.save(os.path.join(uploader_path, f.name), f) for i, f in enumerate(myfiles) if (f.name.split(".")[-1]=='nii')]

        for i, f in enumerate(myfiles):
            saveNiiPath = os.path.join(uploader_path, f.name)
            if (f.name.split(".")[-1]=='nii'):
                # Save nii files
                fs.save(saveNiiPath, f)
                nimg3D = nib.load(saveNiiPath)
                img3D = np.squeeze(np.array(nimg3D.dataobj))
                vx, vy, vz = img3D.shape
                # Save jpg files
                hz = int(vz/2)
                hy = int(vy/2)
                hx = int(vx/2)
                saveJPGPath_hz = os.path.join(uploader_path, ",".join(f.name.split('.')[:-1])+"_hz.jpg")
                saveJPGPath_hy = os.path.join(uploader_path, ",".join(f.name.split('.')[:-1])+"_hy.jpg")
                saveJPGPath_hx = os.path.join(uploader_path, ",".join(f.name.split('.')[:-1])+"_hx.jpg")
                uint8_img2D = img3D[:,:,hz]
                uint8_img2D = (uint8_img2D - uint8_img2D.min()) / (uint8_img2D.max() - uint8_img2D.min())
                uint8_img2D = 255 * uint8_img2D
                uint8_img2D = np.rot90(uint8_img2D)
                Image.fromarray(uint8_img2D.astype(np.uint8)).save(saveJPGPath_hz)
                uint8_img2D = img3D[:,hy,:]
                uint8_img2D = (uint8_img2D - uint8_img2D.min()) / (uint8_img2D.max() - uint8_img2D.min())
                uint8_img2D = 255 * uint8_img2D
                uint8_img2D = np.rot90(uint8_img2D)
                Image.fromarray(uint8_img2D.astype(np.uint8)).save(saveJPGPath_hy)
                uint8_img2D = img3D[hx,:,:]
                uint8_img2D = (uint8_img2D - uint8_img2D.min()) / (uint8_img2D.max() - uint8_img2D.min())
                uint8_img2D = 255 * uint8_img2D
                uint8_img2D = np.rot90(uint8_img2D)
                Image.fromarray(uint8_img2D.astype(np.uint8)).save(saveJPGPath_hx)

        filenames = os.listdir(uploader_path)
        fileList = [{'id': i, 'Focus': False,'FileName': filename, 'Tracer': '11C-PIB', 'PatientName': 'Sandwich Eater'}
                    for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii')]
        return Response(data=fileList, status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')

        filenames = os.listdir(uploader_path)
        [os.remove(os.path.join(uploader_path, filename)) for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii' or filename.split(".")[-1]=='jpg')]
        return Response("delete test ok", status=200)


class fileList(APIView):

    def get(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        if not os.path.exists(database_path):
            os.mkdir(database_path)

        filenames = os.listdir(database_path)
        fileList = [{'id': i, 'Opened': False, 'Select': False, 'Tracer': '11C-PIB', 'SUVR': 2.21, 'FileName': filename,
                     'PatientName': 'Sandwich Eater', 'PatientID':'1010102213','Age':38,'Sex':'M', 'Update':'20.08.15'}
                    for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii')]

        return Response(data=fileList, status=status.HTTP_200_OK)
        # return JsonResponse(items, safe=False)

        # items = [{"id": 0, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.21, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 38, "Sex": "M", "Update": "20.07.15"},
        # {"id": 1, "Opened": False, "Select": False, "Tracer": "FBB", "SUVR": 1.5, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 26, "Sex": "M", "Update": "20.07.15"},
        # {"id": 2, "Opened": False, "Select": False, "Tracer": "FBB", "SUVR": 1.1, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 39, "Sex": "M", "Update": "20.07.15"},
        # {"id": 3, "Opened": False, "Select": False, "Tracer": "FBP", "SUVR": 2.1, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 33, "Sex": "M", "Update": "20.07.15"},
        # {"id": 4, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 34, "Sex": "M", "Update": "20.07.15"},
        # {"id": 5, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.51, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 42, "Sex": "M", "Update": "20.07.15"},
        # {"id": 6, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 1.2, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 55, "Sex": "M", "Update": "20.07.15"},
        # {"id": 7, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 1.52, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"},
        # {"id": 8, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 0.72, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 46, "Sex": "M", "Update": "20.07.15"},
        # {"id": 9, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.0, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 88, "Sex": "M", "Update": "20.07.15"},
        # {"id": 10, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.2, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 56, "Sex": "M", "Update": "20.07.15"},
        # {"id": 11, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.8, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 47, "Sex": "M", "Update": "20.07.15"},
        # {"id": 12, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 3.0, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 86, "Sex": "M", "Update": "20.07.15"},
        # {"id": 13, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 66, "Sex": "M", "Update": "20.07.15"},
        # {"id": 14, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.9, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"},
        # {"id": 15, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.2, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 56, "Sex": "M", "Update": "20.07.15"},
        # {"id": 16, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.8, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 47, "Sex": "M", "Update": "20.07.15"},
        # {"id": 17, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 3.0, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 86, "Sex": "M", "Update": "20.07.15"},
        # {"id": 18, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 66, "Sex": "M", "Update": "20.07.15"},
        # {"id": 19, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.9, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"},
        # {"id": 20, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.2, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 56, "Sex": "M", "Update": "20.07.15"},
        # {"id": 21, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.8, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 47, "Sex": "M", "Update": "20.07.15"},
        # {"id": 22, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 3.0, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 86, "Sex": "M", "Update": "20.07.15"},
        # {"id": 23, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.5, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 66, "Sex": "M", "Update": "20.07.15"},
        # {"id": 24, "Opened": False, "Select": False, "Tracer": "C-PIB", "SUVR": 2.9, "PatientName": "Sandwich Eater",
        #  "PatientID": "Sandwich Eater", "Age": 72, "Sex": "M", "Update": "20.07.15"}]