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


class uploader(APIView):
    # def async_function(self, request, Format, myfiles, caseID):
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

                # # target_folder = "case" + str(caseID)
                # # case_fullpath = os.path.join(settings.MEDIA_ROOT, case_folder)
                # # myfile_name = "input_"+str(caseID)
                #
                # # Step2 : Input file to png save
                # print("Step4: Input file to png save, ", caseID)
                #
                # myfile_name = "input_" + str(caseID)
                # myimg_full_path = os.path.join(case_fullpath, myfile_name + ".img")
                # nimg3D = nib.load(myimg_full_path)
                # img3D = np.array(nimg3D.dataobj) # img3D = nimg3D.get_data()
                # oriSize = img3D.shape[0]*img3D.shape[1]*img3D.shape[2]
                #
                # dsfactor = [float(f) / w for w, f in zip([2, 2, 2], nimg3D.header['pixdim'][1:4])]
                # img3D = nd.interpolation.zoom(np.squeeze(img3D), zoom=dsfactor)
                # # if img3D.shape[1] < 109:
                # #     zpad = np.zeros([img3D.shape[0], 1, img3D.shape[2]], dtype=np.float32)
                # #     img3D = np.concatenate((img3D, zpad), axis=1)
                # cX, cY, cZ = [math.floor(img3D.shape[0]/2), math.floor(img3D.shape[1]/2)+10, math.floor(img3D.shape[2]/2)]
                # offsetX, offsetY, offsetZ = [math.floor(91/2), math.floor(109/2), math.floor(91/2)]
                # img3D = img3D[cX-offsetX:cX+offsetX+1, cY-offsetY:cY+offsetY+1, cZ-offsetZ:cZ+offsetZ+1]
                # if img3D.shape[1] < 109:
                #     zpad = np.zeros([img3D.shape[0], 109-img3D.shape[1], img3D.shape[2]], dtype=np.float32)
                #     img3D = np.concatenate((img3D,zpad), axis=1)
                # if img3D.shape[2] < 91:
                #     zpad = np.zeros([img3D.shape[0], img3D.shape[1], 91-img3D.shape[2]], dtype=np.float32)
                #     img3D = np.concatenate((img3D,zpad), axis=2)
                #
                # vx, vy, vz = img3D.shape
                # # print(vx, vy, vz)
                # uint16_img3D = (img3D-img3D.min()) / (img3D.max()-img3D.min())
                # uint16_img3D = 32767 * uint16_img3D
                # uint16_img3D = uint16_img3D.astype(np.uint16)
                #
                # # Get the color map by name:
                # cm1 = plt.get_cmap('hot')
                # # cm2 = plt.get_cmap('nipy_spectral')
                # cm2 = plt.get_cmap('jet')
                # # Apply the colormap like a function to any array:
                # # print(vx, vy, vz)
                # uint8_img3D = (img3D-img3D.min()) / (img3D.max()-img3D.min())
                # uint8_img3D = 255 * uint8_img3D
                # uint8_img3D = uint8_img3D.astype(np.uint8)
                # hz = int(vz/2)
                # hx = int(vx/2)
                # hy = int(vy/2)
                #
                # for iz in range(vz):
                #     # if iz == hz:
                #         mytmp_name = "input1_" + "axial_" + str(caseID) + "_" + str(iz) + ".png"
                #         mytmp_name2 = "input2_" + "axial_" + str(caseID) + "_" + str(iz) + ".png"
                #         uint16_img2D = uint16_img3D[:,:,iz]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # img = sitk.GetImageFromArray(x)
                #         # sitk.WriteImage(img, "your_image_name_here.dcm")
                #         # base64
                #         width, height = 91, 109
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="input",
                #             Direction="axial",
                #             ImageID=str(iz),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         full_path2 = os.path.join(case_fullpath, mytmp_name2)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress ("+Format+"): axial", iz)
                #         # print("axial: ", iz)
                #         uint8_img2D = uint8_img3D[:,:,iz]
                #         uint8_img2D = np.rot90(uint8_img2D)
                #         colored_image = cm1(uint8_img2D)
                #         colored_image2 = cm2(uint8_img2D)
                #         Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8)).save(full_path)
                #         Image.fromarray((colored_image2[:, :, :3] * 255).astype(np.uint8)).save(full_path2)
                #         # filename1 = os.path.join(settings.MEDIA_ROOT, mytmp_name)
                #         # filename2 = os.path.join(settings.MEDIA_ROOT, mytmp_name2)
                #         # dataset1 = pydicom.dcmread(filename1)
                #         # dataset2 = pydicom.dcmread(filename2)
                #         # client.store_instances(datasets=[full_path])
                #         # client.store_instances(datasets=[full_path2])
                # for iy in range(vy):
                #     # if iy == hy:
                #         mytmp_name = "input1_" + "coronal_" + str(caseID) + "_" + str(iy) + ".png"
                #         mytmp_name2 = "input2_" + "coronal_" + str(caseID) + "_" + str(iy) + ".png"
                #         uint16_img2D = uint16_img3D[:,iy,:]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 91, 91
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="input",
                #             Direction="coronal",
                #             ImageID=str(iy),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         full_path2 = os.path.join(case_fullpath, mytmp_name2)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress ("+Format+"): coronal", iy)
                #         # print("coronal: ", iy)
                #         uint8_img2D = uint8_img3D[:,iy,:]
                #         uint8_img2D = np.rot90(uint8_img2D)
                #         colored_image = cm1(uint8_img2D)
                #         colored_image2 = cm2(uint8_img2D)
                #         Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8)).save(full_path)
                #         Image.fromarray((colored_image2[:, :, :3] * 255).astype(np.uint8)).save(full_path2)
                # for ix in range(vx):
                #     # if ix == hx:
                #         mytmp_name = "input1_" + "sagittal_" + str(caseID) + "_" + str(ix) + ".png"
                #         mytmp_name2 = "input2_" + "sagittal_" + str(caseID) + "_" + str(ix) + ".png"
                #         uint16_img2D = uint16_img3D[ix,:,:]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 109, 91
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="input",
                #             Direction="sagittal",
                #             ImageID=str(ix),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         full_path2 = os.path.join(case_fullpath, mytmp_name2)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress ("+Format+"): sagittal", ix)
                #         # print("sagittal: ", ix)
                #         uint8_img2D = uint8_img3D[ix,:,:]
                #         uint8_img2D = np.rot90(uint8_img2D)
                #         colored_image = cm1(uint8_img2D)
                #         colored_image2 = cm2(uint8_img2D)
                #         Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8)).save(full_path)
                #         Image.fromarray((colored_image2[:, :, :3] * 255).astype(np.uint8)).save(full_path2)
                #
                # newCase.DebugFlag = 2
                # newCase.Step2 = True
                # newCase.save()
                #
                # # Step3: algorithm
                # print("Step3: algorithm(DL), ", caseID)
                # start = time.perf_counter()
                # inout_path = os.path.join(settings.MEDIA_ROOT, "case"+str(caseID))
                # train(inout_path, str(caseID))
                #
                # newCase.DebugFlag = 3
                # newCase.Step3 = True
                # newCase.save()
                #
                # # Step4: quantification
                # print("Step3: quantification, ", caseID)
                # inout_path = os.path.join(settings.MEDIA_ROOT, "case"+str(caseID))
                # print("Progress ("+Format+"): quantization Start")
                #
                # # aal_region_norm, aal_region, aal_count  = quantification(inout_path)
                # aal_region, centil_suvr = _quantification(inout_path, case_fullpath, maxval=100, threshold=1.2, vmax=2.5, oriSize=oriSize)
                #
                # full_path1 = os.path.join(case_fullpath, 'aal_subregion.txt')
                # full_path2 = os.path.join(case_fullpath, 'global_centil.txt')
                # np.savetxt(full_path1, aal_region[:,0,:], '%.3f')
                # np.savetxt(full_path2, centil_suvr[:,0], '%.3f')
                #
                # print(aal_region, centil_suvr)
                # # [Frontal_L, Frontal_R, Cingulate_L, Cingulate_R, Striatum_L, Striatum_R, Thalamus_L, Thalamus_R, Occipital_L,
                # #  Occipital_L, Parietal_L, Parietal_R, Temporal_L, Temporal_R]
                # newCase.Global = np.sum(aal_region[:,0,0])/14
                # newCase.Lateral_Temporal = (aal_region[12,0,0] + aal_region[13,0,0])/2
                # newCase.Lateral_Parietal = (aal_region[10,0,0] + aal_region[11,0,0])/2
                # newCase.PC_PRC = (aal_region[2,0,0] + aal_region[3,0,0] + aal_region[4,0,0] + aal_region[5,0,0] + aal_region[6,0,0] + aal_region[7,0,0])/6
                # newCase.Frontal = (aal_region[0,0,0] + aal_region[1,0,0])/2
                #
                # # for i in range(0, int(aal_region_norm.shape[1])):
                # #
                # #     tmp = np.reshape(aal_region_norm[:, i], [4, 2])
                # #
                # #     tmp1 = np.reshape(aal_region[:, i], [4, 2])
                # #     tmp2 = np.reshape(aal_count[:, i], [4, 2])
                # #
                # #     tmp3 = np.sum(tmp1, axis=1) / np.sum(tmp2, axis=1)
                # #
                # #     tmp3_global = np.sum(tmp1, axis=(0, 1)) / np.sum(tmp2, axis=(0, 1))
                # #
                # #     newCase.Global = tmp3_global
                # #     newCase.Lateral_Temporal = tmp3[3]
                # #     newCase.Lateral_Parietal = tmp3[2]
                # #     newCase.PC_PRC = tmp3[1]
                # #     newCase.Frontal = tmp3[0]
                #
                # print("Progress ("+Format+"): quantization END (pass)")
                # newCase.DebugFlag = 4
                # newCase.Step4 = True
                # newCase.save()
                #
                # duration = time.perf_counter()-start
                # print("algorithm+quantification time= ", duration)
                #
                #
                # # Step5: Output nii file save
                # print("Step5: Output nii file save, ", caseID)
                #
                # inout_path = os.path.join(settings.MEDIA_ROOT, "case" + str(caseID))
                # myfile_name = "output_" + str(caseID)
                #
                # img_path = os.path.join(inout_path, myfile_name + ".img")
                # nii_path = os.path.join(inout_path, myfile_name + ".nii")
                #
                # out_img = nib.load(img_path)
                # nib.save(out_img, nii_path)
                # hdrVolume = models.Volume.objects.create(
                #     Type="output",
                #     Format="hdr",
                #     # SizeX=,
                #     # SizeY=,
                #     # SizeZ=,
                #     File=os.path.join(case_folder, myfile_name + ".hdr"),
                #     CaseID=newCase,
                # )
                # hdrVolume.save()
                # imgVolume = models.Volume.objects.create(
                #     Type="output",
                #     Format="img",
                #     # SizeX=,
                #     # SizeY=,
                #     # SizeZ=,
                #     File=os.path.join(case_folder, myfile_name + ".img"),
                #     CaseID=newCase,
                # )
                # imgVolume.save()
                # niftiVolume = models.Volume.objects.create(
                #     Type="output",
                #     Format="nii",
                #     # SizeX=,
                #     # SizeY=,
                #     # SizeZ=,
                #     File=os.path.join(case_folder, myfile_name + ".nii"),
                #     CaseID=newCase,
                # )
                # niftiVolume.save()
                #
                # newCase.DebugFlag = 5
                # newCase.Step5 = True
                # newCase.save()
                #
                # # Step6: Save output nii to png
                # print("Step6: Save output nii to png, ", caseID)
                #
                # myimg_full_path = os.path.join(case_fullpath, myfile_name + ".img")
                # nimg3D = nib.load(myimg_full_path)
                # img3D = np.array(nimg3D.dataobj)
                # vx, vy, vz = img3D.shape
                #
                # uint16_img3D = (img3D-img3D.min()) / (img3D.max()-img3D.min())
                # uint16_img3D = 32767 * uint16_img3D
                # uint16_img3D = uint16_img3D.astype(np.uint16)
                #
                # # Get the color map by name:
                # # cm = plt.get_cmap('nipy_spectral')
                # # Apply the colormap like a function to any array:
                # # print(vx, vy, vz)
                # uint8_img3D = (img3D-img3D.min()) / (img3D.max()-img3D.min())
                # uint8_img3D = 255 * uint8_img3D
                # uint8_img3D = uint8_img3D.astype(np.uint8)
                # hz = int(vz/2)
                # hx = int(vx/2)
                # hy = int(vy/2)
                # for iz in range(vz):
                #     # if iz == hz:
                #         mytmp_name = "output1_" + "axial_" + str(caseID) + "_" + str(iz) + ".png"
                #         mytmp_name2 = "output2_" + "axial_" + str(caseID) + "_" + str(iz) + ".png"
                #         uint16_img2D = uint16_img3D[:, :, iz]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 91, 109
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="output",
                #             Direction="axial",
                #             ImageID=str(iz),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         full_path2 = os.path.join(case_fullpath, mytmp_name2)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress (" + Format + "): axial", iz)
                #         # print("axial: ", iz)
                #         uint8_img2D = uint8_img3D[:,:,iz]
                #         uint8_img2D = np.rot90(uint8_img2D)
                #         colored_image = cm1(uint8_img2D)
                #         colored_image2 = cm2(uint8_img2D)
                #         Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8)).save(full_path)
                #         Image.fromarray((colored_image2[:, :, :3] * 255).astype(np.uint8)).save(full_path2)
                # for iy in range(vy):
                #     # if iy == hy:
                #         mytmp_name = "output1_" + "coronal_" + str(caseID) + "_" + str(iy) + ".png"
                #         mytmp_name2 = "output2_" + "coronal_" + str(caseID) + "_" + str(iy) + ".png"
                #         uint16_img2D = uint16_img3D[:, iy, :]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 91, 91
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="output",
                #             Direction="coronal",
                #             ImageID=str(iy),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         full_path2 = os.path.join(case_fullpath, mytmp_name2)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress (" + Format + "): coronal", iy)
                #         # print("coronal: ", iy)
                #         uint8_img2D = uint8_img3D[:, iy, :]
                #         uint8_img2D = np.rot90(uint8_img2D)
                #         colored_image = cm1(uint8_img2D)
                #         colored_image2 = cm2(uint8_img2D)
                #         Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8)).save(full_path)
                #         Image.fromarray((colored_image2[:, :, :3] * 255).astype(np.uint8)).save(full_path2)
                # for ix in range(vx):
                #     # if ix == hx:
                #         mytmp_name = "output1_" + "sagittal_" + str(caseID) + "_" + str(ix) + ".png"
                #         mytmp_name2 = "output2_" + "sagittal_" + str(caseID) + "_" + str(ix) + ".png"
                #         uint16_img2D = uint16_img3D[ix, :, :]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 109, 91
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="output",
                #             Direction="sagittal",
                #             ImageID=str(ix),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         full_path2 = os.path.join(case_fullpath, mytmp_name2)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress (" + Format + "): sagittal", ix)
                #         # print("sagittal: ", ix)
                #         uint8_img2D = uint8_img3D[ix, :, :]
                #         uint8_img2D = np.rot90(uint8_img2D)
                #         colored_image = cm1(uint8_img2D)
                #         colored_image2 = cm2(uint8_img2D)
                #         Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8)).save(full_path)
                #         Image.fromarray((colored_image2[:, :, :3] * 255).astype(np.uint8)).save(full_path2)
                #
                #
                #
                # # Step7: Save ct to png
                # print("Step7: Save ct to png, ", caseID)
                #
                # brain_path = os.path.join(settings.MEDIA_ROOT, "MNI152_T1_2mm.nii")
                # myimg_full_path = os.path.join(brain_path)
                # nimg3D = nib.load(myimg_full_path)
                # img3D = np.array(nimg3D.dataobj)
                # vx, vy, vz = img3D.shape
                #
                # uint16_img3D = (img3D-img3D.min()) / (img3D.max()-img3D.min())
                # uint16_img3D = 32767 * uint16_img3D
                # uint16_img3D = uint16_img3D.astype(np.uint16)
                # hz = int(vz/2)
                # hx = int(vx/2)
                # hy = int(vy/2)
                # for iz in range(vz):
                #     # if iz == hz:
                #         mytmp_name = "brain_" + "axial_" + str(caseID) + "_" + str(iz) + ".png"
                #         uint16_img2D = uint16_img3D[:, :, iz]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 91, 109
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="brain",
                #             Direction="axial",
                #             ImageID=str(iz),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress (" + Format + "): axial", iz)
                #         # print("axial: ", iz)
                # for iy in range(vy):
                #     # if iy == hy:
                #         mytmp_name = "brain_" + "coronal_" + str(caseID) + "_" + str(iy) + ".png"
                #         uint16_img2D = uint16_img3D[:, iy, :]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 91, 91
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="brain",
                #             Direction="coronal",
                #             ImageID=str(iy),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress (" + Format + "): coronal", iy)
                #         # print("coronal: ", iy)
                # for ix in range(vx):
                #     # if ix == hx:
                #         mytmp_name = "brain_" + "sagittal_" + str(caseID) + "_" + str(ix) + ".png"
                #         uint16_img2D = uint16_img3D[ix, :, :]
                #         uint16_img2D = np.rot90(uint16_img2D)
                #         # base64
                #         width, height = 109, 91
                #         resized_img = cv2.resize(uint16_img2D, (width, height))
                #         b64 = base64.b64encode(resized_img).decode('utf-8')
                #         b64Slice = models.Slice.objects.create(
                #             Type="brain",
                #             Direction="sagittal",
                #             ImageID=str(ix),
                #             Format="b64",
                #             B64Data=b64,
                #             CaseID=newCase,
                #         )
                #         b64Slice.save()
                #         full_path = os.path.join(case_fullpath, mytmp_name)
                #         # tmp = Image.fromarray(uint16_img2D)
                #         # tmp.save(full_path)
                #         # imageio.imwrite(full_path, uint16_img2D)
                #         print("Progress (" + Format + "): sagittal", ix)
                #         # print("sagittal: ", ix)
                # newCase.DebugFlag = 6
                # newCase.Step6 = True
                # newCase.Ready = True
                # newCase.save()

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
        [mv(os.path.join(uploader_path, v['FileName']), os.path.join(database_path, str(NofNii+i)+".nii")) for i, v in enumerate(jsonData)]

        filenames = os.listdir(database_path)
        fileList = [{'id': i, 'Opened': False, 'Select': False, 'Tracer': '11C-PIB', 'SUVR': 2.21, 'FileName': filename, 'fileID': filename.split('.')[0],
                     'PatientName': 'Sandwich Eater', 'PatientID':'1010102213','Age':38,'Sex':'M', 'Update':'20.08.15', 'Group': 0}
                    for i, filename in enumerate(filenames) if (filename.split(".")[-1]=='nii')]

        # delete all files in uploader
        filenames = os.listdir(uploader_path)
        [os.remove(os.path.join(uploader_path, filename)) for i, filename in enumerate(filenames)
         if (filename.split(".")[-1]=='nii' or filename.split(".")[-1]=='jpg')]

        # thread = threading.Thread(target=self.async_function, args=(request, Format, myfiles, caseID))
        thread = threading.Thread(target=self.async_function, args=(request, fileList))
        thread.start()

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
        fileList = [{'id': i, 'Focus': False,'FileName': filename, 'Tracer': '11C-PIB', 'PatientName': 'Sandwich Eater', 'Group': 0, 'fileID': None}
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
        fileList = [{'id': i, 'Opened': False, 'Select': False, 'Tracer': '11C-PIB', 'SUVR': 2.21, 'FileName': filename, 'fileID': filename.split('.')[0],
                     'PatientName': 'Sandwich Eater', 'PatientID':'1010102213','Age':38,'Sex':'M', 'Update':'20.08.15', 'Group': 0}
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