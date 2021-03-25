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
import threading, time
import math
from testing.TF_DirectSN.PTQuant_eval_affine_v1 import train
from testing.TF_DirectSN.QuantWithSurface import _quantification
import datetime
from . import models, serializers


class uploader(APIView):
    # def async_function(self, request, Format, myfiles, caseID):
    def update_quantification_DB(self, request, myfile, Qresult):
        print(Qresult)
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        case = models.Case.objects.filter(fileID=myfile['fileID'])[0]
        case.Frontal_L = round(float(Qresult[0][0]), 2)
        case.Frontal_L_C = round(float(Qresult[0][1]), 2)
        case.Frontal_R = round(float(Qresult[1][0]), 2)
        case.Frontal_R_C = round(float(Qresult[1][1]), 2)
        case.Cingulate_L = round(float(Qresult[2][0]), 2)
        case.Cingulate_L_C = round(float(Qresult[2][1]), 2)
        case.Cingulate_R = round(float(Qresult[3][0]), 2)
        case.Cingulate_R_C = round(float(Qresult[3][1]), 2)
        case.Striatum_L = round(float(Qresult[4][0]), 2)
        case.Striatum_L_C = round(float(Qresult[4][1]), 2)
        case.Striatum_R = round(float(Qresult[5][0]), 2)
        case.Striatum_R_C = round(float(Qresult[5][1]), 2)
        case.Thalamus_L = round(float(Qresult[6][0]), 2)
        case.Thalamus_L_C = round(float(Qresult[6][1]), 2)
        case.Thalamus_R = round(float(Qresult[7][0]), 2)
        case.Thalamus_R_C = round(float(Qresult[7][1]), 2)
        case.Occipital_L = round(float(Qresult[8][0]), 2)
        case.Occipital_L_C = round(float(Qresult[8][1]), 2)
        case.Occipital_R = round(float(Qresult[9][0]), 2)
        case.Occipital_R_C = round(float(Qresult[9][1]), 2)
        case.Parietal_L = round(float(Qresult[10][0]), 2)
        case.Parietal_L_C = round(float(Qresult[10][1]), 2)
        case.Parietal_R = round(float(Qresult[11][0]), 2)
        case.Parietal_R_C = round(float(Qresult[11][1]), 2)
        case.Temporal_L = round(float(Qresult[12][0]), 2)
        case.Temporal_L_C = round(float(Qresult[12][1]), 2)
        case.Temporal_R = round(float(Qresult[13][0]), 2)
        case.Temporal_R_C = round(float(Qresult[13][1]), 2)
        case.Composite = round(float(Qresult[14][0]), 2)
        case.Composite_C = round(float(Qresult[14][1]), 2)
        case.SUVR = round(float(Qresult[14][0]), 2)
        case.Centiloid = round(float(Qresult[14][1]), 2)
        case.save()


    def async_function(self, request, myfiles):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        for myfile in myfiles:
            print(os.path.join(user_path, myfile['FileName']))
            target_file = os.path.join(database_path, myfile['FileName'])
            target_folder = os.path.join(database_path, ",".join(myfile['FileName'].split('.')[:-1]))

            # newCase = models.Case.objects.filter(pk=caseID)[0]
            # Step1: File save (hdr, img, nii)
            print("Step1: process list check: ", myfile['FileName'])
            if os.path.exists(target_folder):
                print("---------"+myfile['FileName']+" is already done"+"---------")
            else:
                print("Step2: create target folder ")
                os.mkdir(target_folder)
                nimg3D = nib.load(target_file) # 이미지 불러오기

                # img hdr 파일을 생성해서 각 폴더에 생성하기....
                nib.save(nimg3D, os.path.join(database_path, myfile['fileID'], "input_"+myfile['fileID']+".img"))

                img3D = np.array(nimg3D.dataobj)  # numpy array로 변환
                oriSize = img3D.shape[0] * img3D.shape[1] * img3D.shape[2]
                dsfactor = [float(f) / w for w, f in zip([2, 2, 2], nimg3D.header['pixdim'][1:4])] # 픽셀크기 2mm로 변환용 factor
                if nimg3D.header['pixdim'][1]==nimg3D.header['pixdim'][2] and nimg3D.header['pixdim'][1]==nimg3D.header['pixdim'][3]:
                    dsfactor = [float(f) / w for w, f in
                                zip([img3D.shape[0], img3D.shape[1], img3D.shape[2]], [91, 109, 91])]  # 픽셀크기 2mm로 변환용 factor

                img3D_2mm = nd.interpolation.zoom(np.squeeze(img3D), zoom=dsfactor) # 2mm 픽셀로 스케일 변환

                # axial 91, coronal 109, sagittal 91 크기로 잘라내기 (crop)
                zoomedX, zoomedY, zoomedZ = img3D_2mm.shape
                # vx, vy, vz = [0, 0, 0]
                if zoomedX >= 91 and zoomedY >= 109 and zoomedZ >= 91:
                    cX, cY, cZ = [math.floor(zoomedX / 2), math.floor(zoomedY / 2), math.floor(zoomedZ / 2)] # 중심 좌표 계산
                    offsetX, offsetY, offsetZ = [math.floor(91 / 2), math.floor(109 / 2), math.floor(91 / 2)]
                    img3D_crop = img3D_2mm[max(0, cX - offsetX):min(91, cX + offsetX + 1), max(0, cY - offsetY):min(109, cY + offsetY + 1),
                            max(0, cZ - offsetZ):min(91, cZ + offsetZ + 1)]
                    vx, vy, vz = img3D_crop.shape # 크기는 (91, 109, 91) 이어야함
                    uint8_img3D = (img3D_crop-img3D_crop.min()) / (img3D_crop.max()-img3D_crop.min())
                else:
                    vx, vy, vz = img3D_2mm.shape # 크기는 (91, 109, 91) 이어야함
                    uint8_img3D = img3D_2mm
                uint8_img3D = 255 * uint8_img3D
                uint8_img3D = uint8_img3D.astype(np.uint8)
                hx, hy, hz = [int(vx/2), int(vy/2), int(vz/2)]

                print("Step3: create input image")
                for iz in range(vz):
                    uint8_img2D = uint8_img3D[:,:,iz]
                    uint8_img2D = np.rot90(uint8_img2D)
                    # colored_image = cm1(uint8_img2D)
                    # colored_image2 = cm2(uint8_img2D)
                    file_name = "input_" + "axial_" + str(iz) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                for iy in range(vy):
                    uint8_img2D = uint8_img3D[:,iy,:]
                    uint8_img2D = np.rot90(uint8_img2D)
                    # colored_image = cm1(uint8_img2D)
                    # colored_image2 = cm2(uint8_img2D)
                    file_name = "input_" + "coronal_" + str(iy) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                for ix in range(vx):
                    uint8_img2D = uint8_img3D[ix,:,:]
                    uint8_img2D = np.rot90(uint8_img2D)
                    # colored_image = cm1(uint8_img2D)
                    # colored_image2 = cm2(uint8_img2D)
                    file_name = "input_" + "sagittal_" + str(ix) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)
                print("---------complete generating input png files--------")

                print("Step4: algorithm(DL)")
                # start = time.perf_counter()
                inout_path = os.path.join(database_path, myfile['fileID'])
                train(inout_path, myfile['fileID'])

                print("Step5: Quantification")
                aal_region, centil_suvr = _quantification(inout_path, inout_path, maxval=100, threshold=1.2, vmax=2.5, oriSize=oriSize)
                # print(aal_region, centil_suvr)
                full_path1 = os.path.join(inout_path, 'aal_subregion.txt')
                # full_path2 = os.path.join(inout_path, 'global_centil.txt')
                Qresult = np.append(aal_region[:,0,:], centil_suvr[:,0].reshape(1,2), axis=0)
                np.savetxt(full_path1, Qresult, '%.3f')
                self.update_quantification_DB(request, myfile, Qresult)
                print("----------complete train & quantification------------")

                target_file = os.path.join(database_path, myfile['fileID'], "output_"+myfile['fileID']+".img")
                nimg3D = nib.load(target_file) # 이미지 불러오기
                img3D = np.array(nimg3D.dataobj)

                # nii 파일을 database 폴더에 생성하기....
                nib.save(nimg3D, os.path.join(database_path, myfile['fileID'], "output_"+myfile['fileID']+".nii"))

                vx, vy, vz = img3D.shape
                uint8_img3D = (img3D - img3D.min()) / (img3D.max() - img3D.min())
                uint8_img3D = 255 * uint8_img3D
                uint8_img3D = uint8_img3D.astype(np.uint8)
                hz = int(vz / 2)
                hx = int(vx / 2)
                hy = int(vy / 2)

                print("Step6: create output image")
                for iz in range(vz):
                    uint8_img2D = uint8_img3D[:,:,iz]
                    uint8_img2D = np.rot90(uint8_img2D)
                    # colored_image = cm1(uint8_img2D)
                    # colored_image2 = cm2(uint8_img2D)
                    file_name = "output_" + "axial_" + str(iz) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                for iy in range(vy):
                    uint8_img2D = uint8_img3D[:,iy,:]
                    uint8_img2D = np.rot90(uint8_img2D)
                    # colored_image = cm1(uint8_img2D)
                    # colored_image2 = cm2(uint8_img2D)
                    file_name = "output_" + "coronal_" + str(iy) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                for ix in range(vx):
                    uint8_img2D = uint8_img3D[ix,:,:]
                    uint8_img2D = np.rot90(uint8_img2D)
                    # colored_image = cm1(uint8_img2D)
                    # colored_image2 = cm2(uint8_img2D)
                    file_name = "output_" + "sagittal_" + str(ix) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)
                print("---------complete generating output png files--------")

    def put(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')
        if not os.path.exists(uploader_path):
            os.mkdir(uploader_path)
        database_path = os.path.join(user_path, 'database')
        if not os.path.exists(database_path):
            os.mkdir(database_path)

        jsonData = request.data
        print(len(jsonData))
        database_files = os.listdir(database_path)
        NofNii = len([v for i, v in enumerate(database_files) if (v.split(".")[-1] == 'nii')])

        # [np.savetxt(os.path.join(database_path, str(NofNii+i)+"_"+",".join(v['FileName'].split(".")[:-1])+".txt"),[]) for i, v in enumerate(jsonData)]
        for i, v in enumerate(jsonData):
            newCase = models.Case.objects.create(
                Opened=False,
                Select=False,
                Focus=False,
                Group=0,
                fileID=None,
                OriginalFileName=v['FileName'],
                FileName=None,
                PatientID=None,
                PatientName=None,
                Age=None,
                Sex=None,
                Tracer=None,
                SUVR=None,
                Centiloid=None,
            )
            newCase.save()
            newFileID = newCase.id
            mv(os.path.join(uploader_path, v['FileName']), os.path.join(database_path, str(newFileID) + ".nii"))
            newCase.fileID = str(newFileID)
            newCase.FileName = str(newFileID)+".nii"
            newCase.Tracer = "[11C]PIB"
            newCase.PatientName = v['FileName']
            newCase.PatientID = str(newFileID)
            newCase.Age = 38
            newCase.Sex = 'M'
            # fileList = [{'id': int(filename.split('.')[0]), 'Opened': False, 'Select': False, 'Tracer': '[18F]FBP',
            #              'SUVR': 2.21, 'Centiloid': centiloidArray[int(filename.split('.')[0])], 'FileName': filename,
            #              'fileID': filename.split('.')[0],
            #              'PatientName': 'Sandwich Eater', 'PatientID': '1010102213', 'Age': 38, 'Sex': 'M',
            #              'Update': '20.08.15', 'Group': 0}
            # PatientID = None,
            # PatientName = None,
            # Age = None,
            # Sex = None,
            # Tracer = None,
            newCase.save()
        # [mv(os.path.join(uploader_path, v['FileName']), os.path.join(database_path, str(NofNii+i)+".nii")) for i, v in enumerate(jsonData)]

        # delete all files in uploader
        filenames = os.listdir(uploader_path)
        [os.remove(os.path.join(uploader_path, filename)) for i, filename in enumerate(filenames)
         if (filename.split(".")[-1]=='nii' or filename.split(".")[-1]=='jpg')]

        allCases = models.Case.objects.all().values()
        serializer = serializers.CaseSerializer(allCases, many=True)

        # centiloidArray = []
        # filenames = os.listdir(database_path) # 파일목록불러오기
        # for i, filename in enumerate(filenames):
        #     if filename.split(".")[-1]=='nii':
        #         try:
        #             txt_file_path = os.path.join(database_path, ",".join(filename.split(".")[:-1]), 'aal_subregion.txt')
        #             file = open(txt_file_path, 'r')
        #             lines = file.read().split('\n')
        #             data = lines[-2].split(' ')[1]
        #             centiloidArray.append(data)
        #             file.close()
        #
        #
        #         except:
        #             centiloidArray.append(None)
        # # ########################################################################################
        # filenames = os.listdir(database_path)
        # fileList = [{'id': int(filename.split('.')[0]), 'Opened': False, 'Select': False, 'Tracer': '[11C]PIB', 'SUVR': 2.21, 'Centiloid':centiloidArray[int(filename.split('.')[0])], 'FileName': filename, 'fileID': filename.split('.')[0],
        #              'PatientName': 'Sandwich Eater', 'PatientID':'1010102213','Age':38,'Sex':'M', 'Update':'20.08.15', 'Group': 0}
        #             for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii')]



        # thread = threading.Thread(target=self.async_function, args=(request, Format, myfiles, caseID))
        # temp = self.async_function(self, request, fileList)
        thread = threading.Thread(target=self.async_function, args=(request, list(allCases)))
        thread.start()

        return Response(data=serializer.data, status=status.HTTP_200_OK)
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
        fileList = [{'id': i, 'Focus': False,'FileName': filename, 'Tracer': '[11C]PIB', 'PatientName': 'Sandwich Eater', 'Group': 0, 'fileID': None}
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

    def delete(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        selectedFiles = request.data
        for selectedFile in selectedFiles:
            targetFolder = os.path.join(database_path, selectedFile['fileID'])
            print("fileID", selectedFile['fileID'], targetFolder)
            models.Case.objects.filter(fileID=selectedFile['fileID']).delete()
            # os.remove(targetFolder)

        allCases = models.Case.objects.all()
        serializer = serializers.CaseSerializer(allCases, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        if not os.path.exists(user_path):
            os.mkdir(user_path)
        database_path = os.path.join(user_path, 'database')
        if not os.path.exists(database_path):
            os.mkdir(database_path)

        allCases = models.Case.objects.all()
        serializer = serializers.CaseSerializer(allCases, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
        # return JsonResponse(items, safe=False)

    def put(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        if request.data['method'] == 'ungroupIndividual':
            fileID = request.data['fileID']
            print('ungroupIndividual', fileID)
            selectedCase = models.Case.objects.filter(fileID=fileID)[0]
            selectedCase.Group = 0
            selectedCase.save()
        elif request.data['method'] == 'groupSelection':
            selectedFiles = request.data['list']
            for selectedFile in selectedFiles:
                selectedCase = models.Case.objects.filter(fileID=selectedFile['fileID'])[0]
                selectedCase.Group = 1
                selectedCase.save()
                # os.remove(targetFolder)

        allCases = models.Case.objects.all()
        serializer = serializers.CaseSerializer(allCases, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)