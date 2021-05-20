# from django.http import HttpResponse
import os, shutil
import subprocess
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
from testing.TF_DirectSN.PTQuant_eval_affine_v1 import train_pib
from testing.TF_DirectSN.eval_cyc_coregpy import train
from testing.TF_DirectSN.QuantWithSurface import _quantification
import datetime
from . import models, serializers
import cv2
import base64
import imageio
import dicom2nifti
import json
from zipfile import ZipFile

class uploader(APIView):
    # def async_function(self, request, Format, myfiles, caseID):
    def update_quantification_DB(self, request, myfile, Qresult):
        print(Qresult)
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        userID = models.User.objects.filter(username=username)[0]
        case = models.Case.objects.filter(UserID=userID, fileID=myfile['fileID'])[0]
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

    # in_suvr_max
    # in_suvr_min
    # out_suvr_max
    # out_suvr_min
    def async_function(self, request):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        userID = models.User.objects.filter(username=username)[0]
        myfiles = models.Case.objects.filter(UserID=userID)
        # target_mip_size=[45,54,45]
        # target_mip_size=[51,69,51]
        target_mip_size=[91,109,91]
        for myfile in myfiles.values():
            # print(os.path.join(user_path, myfile['FileName']))
            target_file = os.path.join(database_path, myfile['FileName'])
            target_folder = os.path.join(database_path, ",".join(myfile['FileName'].split('.')[:-1]))
            tracerName = myfile['Tracer']
            print(tracerName)
            #
            # Step1: File save (hdr, img, nii)
            print("Step1: process list check: ", myfile['FileName'])
            if os.path.exists(target_folder):
                print("---------"+myfile['FileName']+" is already done"+"---------")
            else:


                print("Step2: create target folder ")
                os.mkdir(target_folder)
                origin_nimg3D = nib.load(target_file) # 이미지 불러오기
                InputAffineX0 = origin_nimg3D.affine[0][0]
                InputAffineY1 = origin_nimg3D.affine[1][1]
                InputAffineZ2 = origin_nimg3D.affine[2][2]

                # c_in=0.5*np.array(origin_nimg3D.shape)
                # c_out=np.array(origin_nimg3D.shape)
                # transform=np.array([[1,0,0],[0,np.sign(InputAffineY1),0],[0,0,1]])
                # offset=c_in-c_out.dot(transform)
                # nimg3D=nd.interpolation.affine_transform(origin_nimg3D,transform.T,order=0,offset=offset,output_shape=2*c_out,cval=0.0,output=np.float32)
                nimg3D = origin_nimg3D
                # img hdr 파일을 생성해서 각 폴더에 생성하기....
                nib.save(nimg3D, os.path.join(database_path, myfile['fileID'], "input_"+myfile['fileID']+".img"))



                img3D = np.array(nimg3D.dataobj)  # numpy array로 변환
                oriSize = img3D.shape[0] * img3D.shape[1] * img3D.shape[2]
                dsfactor = [float(f) / w for w, f in zip([2, 2, 2], nimg3D.header['pixdim'][1:4])] # 픽셀크기 2mm로 변환용 factor
                # if nimg3D.header['pixdim'][1]==nimg3D.header['pixdim'][2] and nimg3D.header['pixdim'][1]==nimg3D.header['pixdim'][3]:
                #     dsfactor = [float(f) / w for w, f in
                #                 zip([img3D.shape[0], img3D.shape[1], img3D.shape[2]], [91, 109, 91])]  # 픽셀크기 2mm로 변환용 factor
                print("Step4: algorithm(DL)----------------------------------------------------------------------")
                # start = time.perf_counter()
                inout_path = os.path.join(database_path, myfile['fileID'])

                if tracerName.find('PIB') is not -1:
                    train_pib(inout_path, myfile['fileID'])
                else:
                    train(inout_path, myfile['fileID'])

                print("Step5: Quantification")
                aal_region, centil_suvr, sn_crbl_idx = _quantification(inout_path, inout_path, maxval=100, threshold=1.2, vmax=2.5, oriSize=oriSize, tracer_name=tracerName)
                # print(aal_region, centil_suvr)
                full_path1 = os.path.join(inout_path, 'aal_subregion.txt')
                # full_path2 = os.path.join(inout_path, 'global_centil.txt')
                Qresult = np.append(aal_region[:,0,:], centil_suvr[:,0].reshape(1,2), axis=0)
                np.savetxt(full_path1, Qresult, '%.3f')
                self.update_quantification_DB(request, myfile, Qresult)
                print("----------complete train & quantification--------------------------------------------------------------")


                # Converting SUVR
                img3D = img3D / sn_crbl_idx
                in_suvr_max = img3D.max()
                in_suvr_min = img3D.min()


                img3D_2mm = nd.interpolation.zoom(np.squeeze(img3D), zoom=dsfactor, order=1) # 2mm 픽셀로 스케일 변환
                img3D_2mm = np.pad(img3D_2mm, ((50,50),(50,50),(50,50)), mode='constant')
                zoomedX, zoomedY, zoomedZ = img3D_2mm.shape
                cX, cY, cZ = [math.floor(zoomedX / 2), math.floor(zoomedY / 2), math.floor(zoomedZ / 2)]  # 중심 좌표 계산
                xPadding = 20
                yPadding = 10
                offsetX, offsetY, offsetZ = [math.floor(min(91, zoomedX) / 2 + xPadding), math.floor(min(109, zoomedY) / 2 + yPadding), math.floor(min(91, zoomedZ) / 2)]
                img3D_crop = img3D_2mm[cX - offsetX:cX + offsetX + 1, cY - offsetY:cY + offsetY + 1, cZ - offsetZ:cZ + offsetZ + 1]

                # dsfactor2 = [float(f) / w for w, f in zip([img3D_crop.shape[0], img3D_crop.shape[1], img3D_crop.shape[2]], [91, 109, 91])] # 픽셀크기 2mm로 변환용 factor
                # img3D_crop = nd.interpolation.zoom(np.squeeze(img3D_crop), zoom=dsfactor2) # 2mm 픽셀로 스케일 변환
                # img3D_2mm = nd.interpolation.zoom(np.squeeze(img3D), zoom=dsfactor) # 2mm 픽셀로 스케일 변환

                vx, vy, vz = img3D_crop.shape # 크기는 (91, 109, 91) 이어야함

                # uint8_img3D = img3D_2mm/img3D_2mm.max()*255

                # uint8_img3D = (img3D_2mm - img3D_2mm.min()) / (img3D_2mm.max() - img3D_2mm.min())
                # uint8_img3D = 255 * uint8_img3D
                # uint8_img3D = uint8_img3D.astype(np.uint8)

                print("Step3: create input image")
                getCase = models.Case.objects.filter(UserID=userID, fileID=myfile['fileID'])[0]
                # tracerName = getCase.Tracer
                getCase.InputAffineParamsX0=InputAffineX0
                getCase.InputAffineParamsY1=InputAffineY1
                getCase.InputAffineParamsZ2=InputAffineZ2
                getCase.in_suvr_max = in_suvr_max
                getCase.in_suvr_min = in_suvr_min
                getCase.save()
                reg_img3D = (img3D_crop-img3D_crop.min()) / (img3D_crop.max()-img3D_crop.min())
                scale_img3D = 32767 * reg_img3D
                uint16_img3D = scale_img3D.astype(np.uint16)
                # inverted_uint16_img3D = -uint16_img3D+uint16_img3D.max()
                ####################################################################################

                # dsfactor_sampled = [float(f) / w for w, f in zip(scale_img3D.shape,target_mip_size)]
                # mip_img3D_crop = nd.interpolation.zoom(scale_img3D, zoom=dsfactor_sampled)
                mip_img3D_crop = scale_img3D
                maxStep = 45
                # uniformImg = np.ones(mip_img3D_crop.shape)
                uniformImg = mip_img3D_crop > 1
                for i in range(maxStep):
                    print(i)
                    angle1=i*8/180*np.pi
                    c1=np.cos(angle1)
                    s1=np.sin(angle1)

                    # angle2=8/180*np.pi
                    # c2=np.cos(angle2)
                    # s2=np.sin(angle2)

                    c_in=0.5*np.array(mip_img3D_crop.shape)
                    c_out=np.array(mip_img3D_crop.shape)
                    transform=np.array([[c1,-s1,0],[s1,c1,0],[0,0,1]])
                    # transform2=np.array([[c2,0,-s2],[0,1,0],[s2,0,c2]])
                    # transform=transform1 # np.dot(transform1, transform2)
                    offset=c_in-c_out.dot(transform)
                    dst1=nd.interpolation.affine_transform(mip_img3D_crop,transform.T,order=0,offset=offset,output_shape=2*c_out,cval=0.0,output=np.float32)
                    # dst1=dst1-np.min(dst1)
                    # RotatedUniformImg = nd.interpolation.affine_transform(uniformImg,transform.T,order=1,offset=offset,output_shape=2*c_out,cval=0.0,output=np.float32)

                    [sx, sy, sz] = dst1.shape
                    [offsetX, offsetY, offsetZ] = np.uint16(np.array([sx, sy, sz])/6)
                    crop1 = dst1[offsetX:sx-offsetX-1, offsetY:sy-offsetY-1, offsetZ:sz-offsetZ-1]
                    # cropedRotatedUniformImg = RotatedUniformImg[offsetX:sx-offsetX-1, offsetY:sy-offsetY-1, offsetZ:sz-offsetZ-1]
                    # proj = crop1[:, :, :].sum(axis=0)
                    proj = np.max(crop1, axis=0)
                    # temp = cropedRotatedUniformImg[:, :, :].sum(axis=0)
                    # column_proj1 = np.rot90(proj*1.5 / (temp + (temp==0)))
                    column_proj1 = np.rot90(proj)
                    column_proj1 = np.clip(column_proj1,0,32767)
                    # column_proj1 = 32767 * (column_proj1-column_proj1.min()) / (column_proj1.max()-column_proj1.min())
                    column_proj1 = column_proj1.astype(np.uint16)
                    # column_proj1 = np.rot90(crop1[:, :, :].sum(axis=0))

                    # offset2=c_in-c_out.dot(transform2)
                    # dst2=nd.interpolation.affine_transform(uint8_img3D,transform2.T,order=3,offset=offset2,output_shape=2*c_out,cval=0.0,output=np.float32)

                    # column_proj1 = np.rot90(dst1[:, :, :].sum(axis=0)) # row
                    # column_proj2 = np.rot90(dst2[:, :, :].sum(axis=0)) # row

                    file_name = "mip_input_axial_" + str(i) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    # reg_img = (column_proj1 - column_proj1.min()) / (column_proj1.max() - column_proj1.min())
                    # reg_img = 32767 * reg_img
                    reg_img = column_proj1.astype(np.uint16)
                    # width, height = 109, 91
                    width, height = target_mip_size[1:3] # 109, 91
                    resized_img = cv2.resize(reg_img, (width + 2*yPadding, height))
                    # inverted_resized_img = -resized_img + 32767
                    # Image.fromarray(resized_img).save(full_path)

                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="input",
                        ImageID=str(i),
                        Direction="mip",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()
                ####################################################################################




                # axial plane
                for iz in range(vz):
                    # uint8_img2D = uint8_img3D[:,:,iz]
                    # uint8_img2D = np.rot90(uint8_img2D)
                    # # colored_image = cm1(uint8_img2D)
                    # # colored_image2 = cm2(uint8_img2D)
                    # file_name = "input_" + "axial_" + str(iz) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                    uint16_img2D = uint16_img3D[:,:,iz]
                    uint16_img2D = np.rot90(uint16_img2D)
                    width, height = 91 + 2*xPadding, 109 + 2*yPadding # (x axis, y axis)
                    resized_img = cv2.resize(uint16_img2D, (width, height))
                    # inverted_resized_img = -resized_img + 32767
                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="input",
                        ImageID=str(iz),
                        Direction="axial",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()
                # coronal plane
                for iy in range(vy):
                    # uint8_img2D = uint8_img3D[:,iy,:]
                    # uint8_img2D = np.rot90(uint8_img2D)
                    # # colored_image = cm1(uint8_img2D)
                    # # colored_image2 = cm2(uint8_img2D)
                    # file_name = "input_" + "coronal_" + str(iy) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                    uint16_img2D = uint16_img3D[:,iy,:]
                    uint16_img2D = np.rot90(uint16_img2D)
                    width, height = 91 + 2*xPadding, 91
                    resized_img = cv2.resize(uint16_img2D, (width, height))
                    # inverted_resized_img = -resized_img + 32767
                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="input",
                        ImageID=str(iy),
                        Direction="coronal",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()
                # sagittal plane
                for ix in range(vx):
                    # uint8_img2D = uint8_img3D[ix,:,:]
                    # uint8_img2D = np.rot90(uint8_img2D)
                    # # colored_image = cm1(uint8_img2D)
                    # # colored_image2 = cm2(uint8_img2D)
                    # file_name = "input_" + "sagittal_" + str(ix) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                    uint16_img2D = uint16_img3D[ix,:,:]
                    uint16_img2D = np.rot90(uint16_img2D)
                    width, height = 109 + 2*yPadding, 91
                    resized_img = cv2.resize(uint16_img2D, (width, height))
                    # inverted_resized_img = -resized_img + 32767
                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="input",
                        ImageID=str(ix),
                        Direction="sagittal",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()

                print("---------complete generating input png files--------")
                #
                # print("Step4: algorithm(DL)")
                # # start = time.perf_counter()
                # inout_path = os.path.join(database_path, myfile['fileID'])
                # train(inout_path, myfile['fileID'])
                #
                # print("Step5: Quantification")
                # aal_region, centil_suvr = _quantification(inout_path, inout_path, maxval=100, threshold=1.2, vmax=2.5, oriSize=oriSize)
                # # print(aal_region, centil_suvr)
                # full_path1 = os.path.join(inout_path, 'aal_subregion.txt')
                # # full_path2 = os.path.join(inout_path, 'global_centil.txt')
                # Qresult = np.append(aal_region[:,0,:], centil_suvr[:,0].reshape(1,2), axis=0)
                # np.savetxt(full_path1, Qresult, '%.3f')
                # self.update_quantification_DB(request, myfile, Qresult)
                # print("----------complete train & quantification------------")

                target_file = os.path.join(database_path, myfile['fileID'], "output_"+myfile['fileID']+".img")
                nimg3D = nib.load(target_file) # 이미지 불러오기
                OutputAffineX0 = nimg3D.affine[0][0]
                OutputAffineY1 = nimg3D.affine[1][1]
                OutputAffineZ2 = nimg3D.affine[2][2]
                getCase = models.Case.objects.filter(UserID=userID, fileID=myfile['fileID'])[0]
                getCase.OutputAffineParamsX0=OutputAffineX0
                getCase.OutputAffineParamsY1=OutputAffineY1
                getCase.OutputAffineParamsZ2=OutputAffineZ2
                img3D = np.array(nimg3D.dataobj)

                # Converting to SUVR scale
                img3D = img3D / sn_crbl_idx
                img3D = nd.gaussian_filter(img3D, 2/2.355/2)
                img3D_2mm = img3D

                # nii 파일을 database 폴더에 생성하기....
                nib.save(nimg3D, os.path.join(database_path, myfile['fileID'], "output_"+myfile['fileID']+".nii"))


                # img3D_2mm = nd.interpolation.zoom(np.squeeze(img3D), zoom=dsfactor, order=1) # 2mm 픽셀로 스케일 변환
                img3D_2mm = np.pad(img3D_2mm, ((50,50),(50,50),(50,50)), mode='constant')
                zoomedX, zoomedY, zoomedZ = img3D_2mm.shape
                cX, cY, cZ = [math.floor(zoomedX / 2), math.floor(zoomedY / 2), math.floor(zoomedZ / 2)]  # 중심 좌표 계산
                # xPadding = 20
                offsetX, offsetY, offsetZ = [math.floor(min(91, zoomedX) / 2 + xPadding), math.floor(min(109, zoomedY) / 2 + yPadding), math.floor(min(91, zoomedZ) / 2)]
                img3D = img3D_2mm[cX - offsetX:cX + offsetX + 1, cY - offsetY:cY + offsetY + 1, cZ - offsetZ:cZ + offsetZ + 1]


                vx, vy, vz = img3D.shape
                out_suvr_max = img3D.max()
                out_suvr_min = img3D.min()
                getCase.out_suvr_max = out_suvr_max
                getCase.out_suvr_min = out_suvr_min
                getCase.save()
                float_img3D = 32767 * (img3D - img3D.min()) / (img3D.max() - img3D.min())
                # uint8_img3D = uint8_img3D.astype(np.uint8)

                uint16_img3D = (img3D-img3D.min()) / (img3D.max()-img3D.min())
                uint16_img3D = 32767 * uint16_img3D
                uint16_img3D = uint16_img3D.astype(np.uint16)
                print("Step6: create output image")
                for iz in range(vz):
                    # uint8_img2D = uint8_img3D[:,:,iz]
                    # uint8_img2D = np.rot90(uint8_img2D)
                    # # colored_image = cm1(uint8_img2D)
                    # # colored_image2 = cm2(uint8_img2D)
                    # file_name = "output_" + "axial_" + str(iz) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                    uint16_img2D = uint16_img3D[:,:,iz]
                    uint16_img2D = np.rot90(uint16_img2D)
                    width, height = 91 + 2*xPadding, 109 + 2*yPadding
                    resized_img = cv2.resize(uint16_img2D, (width, height))
                    # inverted_resized_img = -resized_img + 32767
                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="output",
                        ImageID=str(iz),
                        Direction="axial",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()

                for iy in range(vy):
                    # uint8_img2D = uint8_img3D[:,iy,:]
                    # uint8_img2D = np.rot90(uint8_img2D)
                    # # colored_image = cm1(uint8_img2D)
                    # # colored_image2 = cm2(uint8_img2D)
                    # file_name = "output_" + "coronal_" + str(iy) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                    uint16_img2D = uint16_img3D[:,iy,:]
                    uint16_img2D = np.rot90(uint16_img2D)
                    width, height = 91 + 2*xPadding, 91
                    resized_img = cv2.resize(uint16_img2D, (width, height))
                    # inverted_resized_img = -resized_img + 32767
                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="output",
                        ImageID=str(iy),
                        Direction="coronal",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()

                for ix in range(vx):
                    # uint8_img2D = uint8_img3D[ix,:,:]
                    # uint8_img2D = np.rot90(uint8_img2D)
                    # # colored_image = cm1(uint8_img2D)
                    # # colored_image2 = cm2(uint8_img2D)
                    # file_name = "output_" + "sagittal_" + str(ix) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # Image.fromarray(uint8_img2D.astype(np.uint8)).save(full_path)

                    uint16_img2D = uint16_img3D[ix,:,:]
                    uint16_img2D = np.rot90(uint16_img2D)
                    width, height = 109 + 2*yPadding, 91
                    resized_img = cv2.resize(uint16_img2D, (width, height))
                    # inverted_resized_img = -resized_img + 32767
                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="output",
                        ImageID=str(ix),
                        Direction="sagittal",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()


                maxStep = 45
                # uniformImg = np.ones(float_img3D.shape)


                # dsfactor_sampled = [float(f) / w for w, f in zip(float_img3D.shape,target_mip_size)]
                # float_img3D = nd.interpolation.zoom(float_img3D, zoom=dsfactor_sampled)

                uniformImg = float_img3D > 1
                for i in range(maxStep):
                    print(i)
                    angle1=i*8/180*np.pi
                    c1=np.cos(angle1)
                    s1=np.sin(angle1)

                    # angle2=8/180*np.pi
                    # c2=np.cos(angle2)
                    # s2=np.sin(angle2)

                    c_in=0.5*np.array(float_img3D.shape)
                    c_out=np.array(float_img3D.shape)
                    transform=np.array([[c1,-s1,0],[s1,c1,0],[0,0,1]])
                    # transform2=np.array([[c2,0,-s2],[0,1,0],[s2,0,c2]])
                    # transform=transform1 # np.dot(transform1, transform2)
                    offset=c_in-c_out.dot(transform)
                    dst1=nd.interpolation.affine_transform(float_img3D,transform.T,order=0,offset=offset,output_shape=2*c_out,cval=0.0,output=np.float32)
                    # dst1=dst1-np.min(dst1)
                    # RotatedUniformImg = nd.interpolation.affine_transform(uniformImg,transform.T,order=1,offset=offset,output_shape=2*c_out,cval=0.0,output=np.float32)

                    [sx, sy, sz] = dst1.shape
                    [offsetX, offsetY, offsetZ] = np.uint16(np.array([sx, sy, sz])/6)
                    crop1 = dst1[offsetX:sx-offsetX-1, offsetY:sy-offsetY-1, offsetZ:sz-offsetZ-1]
                    # cropedRotatedUniformImg = RotatedUniformImg[offsetX:sx-offsetX-1, offsetY:sy-offsetY-1, offsetZ:sz-offsetZ-1]
                    # proj = crop1[:, :, :].sum(axis=0)
                    proj = np.max(crop1, axis=0)
                    # temp = cropedRotatedUniformImg[:, :, :].sum(axis=0)
                    # column_proj1 = np.rot90(proj*1.5 / (temp + (temp==0)))
                    column_proj1 = np.rot90(proj)
                    column_proj1 = np.clip(column_proj1,0,32767)
                    # column_proj1 = 32767 * (column_proj1-column_proj1.min()) / (column_proj1.max()-column_proj1.min())
                    column_proj1 = column_proj1.astype(np.uint16)
                    # column_proj1 = np.rot90(crop1[:, :, :].sum(axis=0))

                    # offset2=c_in-c_out.dot(transform2)
                    # dst2=nd.interpolation.affine_transform(uint8_img3D,transform2.T,order=3,offset=offset2,output_shape=2*c_out,cval=0.0,output=np.float32)

                    # column_proj1 = np.rot90(dst1[:, :, :].sum(axis=0)) # row
                    # column_proj2 = np.rot90(dst2[:, :, :].sum(axis=0)) # row

                    file_name = "mip_output_axial_" + str(i) + ".png"
                    full_path = os.path.join(target_folder, file_name)
                    # reg_img = (column_proj1 - column_proj1.min()) / (column_proj1.max() - column_proj1.min())
                    # reg_img = 32767 * reg_img
                    reg_img = column_proj1.astype(np.uint16)
                    # width, height = 109, 91
                    width, height = target_mip_size[1:3]
                    resized_img = cv2.resize(reg_img, (width + 2*yPadding, height))
                    # inverted_resized_img = -resized_img + 32767

                    # Image.fromarray(resized_img).save(full_path)

                    b64 = base64.b64encode(resized_img).decode('utf-8')
                    # inverted_b64 = base64.b64encode(inverted_resized_img).decode('utf-8')
                    b64Slice = models.Slice.objects.create(
                        Type="output",
                        ImageID=str(i),
                        Direction="mip",
                        Width=width,
                        Height=height,
                        Depth=32767,
                        CaseID=getCase,
                        B64Data=b64,
                        # InvB64Data=inverted_b64,
                    )
                    b64Slice.save()
                    # imageio.imwrite(full_path,reg_img.astype(np.uint16))

                    # file_name = "mip_output_sagittal_" + str(i) + ".png"
                    # full_path = os.path.join(target_folder, file_name)
                    # reg_img = (column_proj2 - column_proj2.min()) / (column_proj2.max() - column_proj2.min())
                    # reg_img = 65535 * reg_img
                    # Image.fromarray(reg_img.astype(np.uint16)).save(full_path)
                    # # imageio.imwrite(full_path,reg_img.astype(np.uint16))
                print("---------complete generating output png files--------")
            userID = models.User.objects.filter(username=username)[0]
            case = models.Case.objects.filter(UserID=userID, fileID=myfile['fileID'])[0]
            case.Complete = True
            case.save()

    def put(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')
        if not os.path.exists(uploader_path):
            os.mkdir(uploader_path)



        database_path = os.path.join(user_path, 'database')
        if not os.path.exists(database_path):
            os.mkdir(database_path)


        jsonData = request.data['obj']
        selectedTracer = request.data['Tracer']
        if request.data['addToWorklist']:
            Group = 1
        else:
            Group = 0
        print(len(jsonData))
        database_files = os.listdir(database_path)
        NofNii = len([v for i, v in enumerate(database_files) if (v.split(".")[-1] == 'nii')])

        userID = models.User.objects.filter(username=username)[0]
        # [np.savetxt(os.path.join(database_path, str(NofNii+i)+"_"+",".join(v['FileName'].split(".")[:-1])+".txt"),[]) for i, v in enumerate(jsonData)]
        for i, v in enumerate(jsonData):
            newCase = models.Case.objects.create(
                UserID=userID,
                Opened=False,
                Select=False,
                Focus=False,
                Group=Group,
                fileID=None,
                OriginalFileName=v['FileName'],
                FileName=None,
                PatientID=None,
                PatientName=None,
                Age=None,
                Sex=None,
                AcquisitionDateTime=None,
                Tracer=selectedTracer,
                SUVR=None,
                Centiloid=None,
            )
            newCase.save()

            newFileID = newCase.id

            try:
                json_filename = v['FileName'][:-3]+"json"
                json_path = os.path.join(uploader_path, json_filename)
                with open(json_path) as json_file:
                    json_data = json.load(json_file)

                newCase.fileID = str(newFileID)
                newCase.FileName = str(newFileID)+".nii"
                # newCase.Tracer = "[11C]PIB"
                newCase.PatientName = json_data['PatientName']
                newCase.PatientID = json_data['PatientID']
                newCase.Age = json_data['PatientBirthDate']
                newCase.Sex = json_data['PatientSex']
                newCase.AcquisitionDateTime = json_data['AcquisitionDateTime'].split('T')[0]
                mv(os.path.join(uploader_path, v['FileName'][:-3]+"json"), os.path.join(database_path, str(newFileID) + ".json"))
            except:
                print('there is no json file')
                newCase.fileID = str(newFileID)
                newCase.FileName = str(newFileID)+".nii"
                # newCase.Tracer = "[11C]PIB"
                # newCase.PatientName = v['FileName']
                newCase.PatientName = 'Anonymous ('+v['FileName']+')'
                newCase.PatientID = '-'
                newCase.Age = '-'
                newCase.Sex = '-'
                newCase.AcquisitionDateTime = '-'

            mv(os.path.join(uploader_path, v['FileName']), os.path.join(database_path, str(newFileID) + ".nii"))
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

        for filename in os.listdir(uploader_path):
            file_path = os.path.join(uploader_path, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))

        # userID = models.User.objects.filter(username=username)[0]
        # # allCases = models.Case.objects.filter(UserID=userID)[0]
        # allCases = models.Case.objects.filter(UserID=userID).values()
        # serializer = serializers.CaseSerializer(allCases, many=True)

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
        # thread = threading.Thread(target=self.async_function, args=(request, list(allCases.values())))
        thread = threading.Thread(target=self.async_function, args=[request])
        thread.start()
        # self.async_function(request)

        userID = models.User.objects.filter(username=username)[0]
        allCases = models.Case.objects.filter(UserID=userID)
        serializer = serializers.CaseSerializer(allCases, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        # return Response("put post test ok", status=200)

    def post(self, request, format=None):
        print("success")
        userId = request.user.id
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')
        myfiles = request.FILES.getlist('myfiles')

        if not os.path.exists(uploader_path):
            os.mkdir(uploader_path)

        # Check if file attached
        if not myfiles:
            return Response(data="Files are not attached correctly", status=status.HTTP_400_BAD_REQUEST)

        file_name = myfiles[0].name
        # print(file_name)
        file_format = file_name.split('.')

        # Input Dicom
        if file_format[-1].lower() == "dcm" or file_format[-1].lower() == "ima" or file_format[-1].lower() == "dicom":
            Format = "dcm"
            if len(myfiles) <= 50:
                return Response(data="Error1: the number of dcm files is not enough (>=50)", status=status.HTTP_400_BAD_REQUEST)
        # Input hdr/img
        elif file_format[-1] == "img" or file_format[-1] == "hdr":
            Format = "analyze"
            if len(myfiles) != 2:
                return Response(data="Error1: a pair of .hdr and .img is required", status=status.HTTP_400_BAD_REQUEST)
        # Input Nifti
        elif file_format[-1] == "nii":
            Format = "nifti"
            if len(myfiles) < 1:
                return Response(data="Error1: Must be uploaded more than one", status=status.HTTP_400_BAD_REQUEST)
        elif len(myfiles) > 50:
            Format = "dcm"
        else:
            return Response(data="Error1: File format is not supported. (dcm, hdr/img, nii formats are only supported)",
                            status=status.HTTP_400_BAD_REQUEST)

        InputAffineX0 = []
        InputAffineY1 = []
        InputAffineZ2 = []
        # Save files in user_path/uploader
        if Format == "dcm":
            print('dcm')
            dcm_folder_path = os.path.join(uploader_path, file_format[0])

            for filename in os.listdir(uploader_path):
                file_path = os.path.join(uploader_path, filename)
                try:
                    if os.path.isfile(file_path) or os.path.islink(file_path):
                        os.unlink(file_path)
                    elif os.path.isdir(file_path):
                        shutil.rmtree(file_path)
                except Exception as e:
                    print('Failed to delete %s. Reason: %s' % (file_path, e))
            while len(os.listdir(uploader_path)) != 0:
                print("Directory is not empty")

            if not os.path.exists(dcm_folder_path):
                os.mkdir(dcm_folder_path)


            for idx, myfile in enumerate(myfiles):
                # dcm file name template: {Type}_{Direction}_{CaseID}_{SliceID}.{Format}
                filename = myfile.name
                # fs = FileSystemStorage(location=folderPath)  # defaults to   MEDIA_ROOT
                # fout = fs.save(filename, myfile)
                # mydcm_path = os.path.join("uploads", "case_" + str(caseID), "dcm")
                # dcm_folder_path = os.path.join(file_path, "dcm")
                # myfile.name = filename
                fs = FileSystemStorage(location=dcm_folder_path)  # defaults to   MEDIA_ROOT
                fs.save(filename, myfile)
                # print("dcm: ", idx)
                # dcmpath = os.path.join(dcm_folder_path, filename)
                # dataset = pydicom.dcmread(dcmpath)
            # dicom2nifti.convert_directory(dcm_folder_path, uploader_path, reorient=True, compression=False)
            dcm2niix_path = os.path.join(settings.BASE_DIR, 'dcm2niix.exe')
            # subprocess.run([dcm2niix_path, "-o", r'uploads\dwnusa\uploader', "-f", "%t_%p_%s", dcm_folder_path])
            try:
                subprocess.run([dcm2niix_path, "-o", uploader_path, "-b", "y", "-ba", "n", "-f", "%t_%p_%s", dcm_folder_path], check=True)
            except subprocess.CalledProcessError as e:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            database_files = os.listdir(uploader_path)
            for idx, myfile in enumerate(database_files):
                if (myfile.split(".")[-1] == 'nii'):
                    print(myfile)
                    NiiPath = os.path.join(uploader_path, myfile)
                    nimg3D = nib.load(NiiPath)
                    InputAffineX0.append(nimg3D.affine[0][0])
                    InputAffineY1.append(nimg3D.affine[1][1])
                    InputAffineZ2.append(nimg3D.affine[2][2])
                    np.array(nimg3D.header['pixdim'][1:4])
                    dsfactor = [float(f) / w for w, f in
                                zip([2, 2, 2], nimg3D.header['pixdim'][1:4])]  # 픽셀크기 2mm로 변환용 factor
                    img3D = np.squeeze(np.array(nimg3D.dataobj))
                    img3D = nd.interpolation.zoom(img3D, zoom=dsfactor)  # 2mm 픽셀로 스케일 변환
                    # vx, vy, vz = img3D_2mm.shape # 크기는 (91, 109, 91) 이어야함
                    vx, vy, vz = img3D.shape
                    # Save jpg files
                    hz = int(vz / 2)
                    hy = int(vy / 2)
                    hx = int(vx / 2)
                    saveJPGPath_hz = os.path.join(uploader_path, ",".join(myfile.split('.')[:-1]) + "_hz.jpg")
                    saveJPGPath_hy = os.path.join(uploader_path, ",".join(myfile.split('.')[:-1]) + "_hy.jpg")
                    saveJPGPath_hx = os.path.join(uploader_path, ",".join(myfile.split('.')[:-1]) + "_hx.jpg")
                    uint8_img2D = img3D[:, :, hz]
                    uint8_img2D = (uint8_img2D - uint8_img2D.min()) / (uint8_img2D.max() - uint8_img2D.min())
                    uint8_img2D = 255 * uint8_img2D
                    uint8_img2D = np.rot90(uint8_img2D)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(saveJPGPath_hz)
                    uint8_img2D = img3D[:, hy, :]
                    uint8_img2D = (uint8_img2D - uint8_img2D.min()) / (uint8_img2D.max() - uint8_img2D.min())
                    uint8_img2D = 255 * uint8_img2D
                    uint8_img2D = np.rot90(uint8_img2D)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(saveJPGPath_hy)
                    uint8_img2D = img3D[hx, :, :]
                    uint8_img2D = (uint8_img2D - uint8_img2D.min()) / (uint8_img2D.max() - uint8_img2D.min())
                    uint8_img2D = 255 * uint8_img2D
                    uint8_img2D = np.rot90(uint8_img2D)
                    Image.fromarray(uint8_img2D.astype(np.uint8)).save(saveJPGPath_hx)
        elif Format == "analyze":
            print('analyze')
        elif Format == "nifti":
            print('nifti')
            fs = FileSystemStorage()
            # [fs.save(os.path.join(uploader_path, f.name), f) for i, f in enumerate(myfiles) if (f.name.split(".")[-1]=='nii')]

            for i, f in enumerate(myfiles):
                saveNiiPath = os.path.join(uploader_path, f.name)
                if (f.name.split(".")[-1]=='nii'):
                    # Save nii files
                    fs.save(saveNiiPath, f)
                    nimg3D = nib.load(saveNiiPath)
                    InputAffineX0.append(nimg3D.affine[0][0])
                    InputAffineY1.append(nimg3D.affine[1][1])
                    InputAffineZ2.append(nimg3D.affine[2][2])
                    np.array(nimg3D.header['pixdim'][1:4])
                    dsfactor = [float(f) / w for w, f in zip([2, 2, 2], nimg3D.header['pixdim'][1:4])] # 픽셀크기 2mm로 변환용 factor
                    img3D = np.squeeze(np.array(nimg3D.dataobj))
                    img3D = nd.interpolation.zoom(img3D, zoom=dsfactor) # 2mm 픽셀로 스케일 변환
                    # vx, vy, vz = img3D_2mm.shape # 크기는 (91, 109, 91) 이어야함
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

        filenames = [_ for _ in os.listdir(uploader_path) if _.endswith(".nii")]
        fileList = [{'id': i, 'Focus': False,'FileName': filename, 'Tracer': '[11C]PIB', 'PatientName': 'Sandwich Eater', 'Group': 0, 'fileID': None,
                     'InputAffineX0':InputAffineX0[i],'InputAffineY1':InputAffineY1[i],'InputAffineZ2':InputAffineZ2[i]}
                     for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii')]


        return Response(data=fileList, status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        uploader_path = os.path.join(user_path, 'uploader')

        if not os.path.exists(uploader_path):
            os.mkdir(uploader_path)

        filenames = os.listdir(uploader_path)
        [os.remove(os.path.join(uploader_path, filename)) for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii' or filename.split(".")[-1]=='jpg')]

        for filename in os.listdir(uploader_path):
            file_path = os.path.join(uploader_path, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))

        return Response("delete test ok", status=200)


class fileList(APIView):

    def delete(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        selectedFiles = request.data
        userID = models.User.objects.filter(username=username)[0]
        for selectedFile in selectedFiles:
            targetFolder = os.path.join(database_path, selectedFile['fileID'])
            print("fileID", selectedFile['fileID'], targetFolder)
            models.Case.objects.filter(UserID=userID, fileID=selectedFile['fileID']).delete()
            # os.remove(targetFolder)
        allCases = models.Case.objects.filter(UserID=userID)
        serializer = serializers.CaseSerializer(allCases, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        username = request.user.username
        print(str(username) + ' is currently connected')
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        if not os.path.exists(user_path):
            os.mkdir(user_path)
        database_path = os.path.join(user_path, 'database')
        if not os.path.exists(database_path):
            os.mkdir(database_path)

        userID = models.User.objects.filter(username=username)[0]
        allCases = models.Case.objects.filter(UserID=userID)
        serializer = serializers.CaseSerializer(allCases, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
        # return JsonResponse(items, safe=False)

    def put(self, request, format=None):
        username = request.user.username
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        userID = models.User.objects.filter(username=username)[0]
        if request.data['method'] == 'ungroupIndividual':
            fileID = request.data['fileID']
            print('ungroupIndividual', fileID)
            selectedCase = models.Case.objects.filter(UserID=userID, fileID=fileID)[0]
            selectedCase.Group = 0
            selectedCase.save()
        elif request.data['method'] == 'groupSelection':
            selectedFiles = request.data['list']
            for selectedFile in selectedFiles:
                selectedCase = models.Case.objects.filter(UserID=userID, fileID=selectedFile['fileID'])[0]
                selectedCase.Group = 1
                selectedCase.save()
                # os.remove(targetFolder)

        allCases = models.Case.objects.filter(UserID=userID)
        serializer = serializers.CaseSerializer(allCases, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class viewer(APIView):
    def get(self, request, fileID, format=None):
        username = request.user.username
        # user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        # if not os.path.exists(user_path):
        #     os.mkdir(user_path)
        # database_path = os.path.join(user_path, 'database')
        # if not os.path.exists(database_path):
        #     os.mkdir(database_path)
        # temp = 8
        allSlices = models.Slice.objects.filter(CaseID=fileID)
        serializer = serializers.SliceSerializer(allSlices, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class export(APIView):
    def put(self, request, format=None):
        username = request.user.username
        id_tuple = tuple([v['id'] for v in request.data['selectedList']])
        user_path = os.path.join(settings.MEDIA_ROOT, str(username))
        database_path = os.path.join(user_path, 'database')
        downloader_path = os.path.join(user_path, 'downloader')
        if not os.path.exists(downloader_path):
            os.mkdir(downloader_path)
        target_path = os.path.join(downloader_path, 'brightonix_imaging.zip')
        userID = models.User.objects.filter(username=username)[0]
        selectedCase = models.Case.objects.filter(UserID=userID, Group=1, id__in=id_tuple)
        # selectedCase = models.Case.objects.filter(Group=1)
        # create a ZipFile object
        zipObj = ZipFile(target_path, 'w')
        for idx, filename in enumerate(selectedCase):
            fullpath = os.path.join(database_path, filename.fileID, "output_"+filename.FileName)
            targetpath = os.path.join(database_path, filename.fileID, str(idx)+"_"+filename.PatientName+".nii")
            # Add multiple files to the zip
            zipObj.write(fullpath, os.path.basename(targetpath))
        # close the Zip File
        zipObj.close()
        return Response(status=status.HTTP_200_OK)