from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
## django integration setting
from django.conf import settings

import time
import os, shutil

import tensorflow as tf
from testing.TF_DirectSN import layers_coregpy as lays
from testing.TF_DirectSN.utils import Dense3DSpatialTransformer
from testing.TF_DirectSN.spm2py_coreg import coreg_mrc1
from shutil import copyfile
import glob
from django.conf import settings

import numpy as np
from .. import models

FLAGS = tf.flags.FLAGS
stages = 3


def train(inout_path, caseID):
    checkpoint_dir = r".\testing\TF_DirectSN\05_20_01_30_CascadedGAN_Unet_augment"
    # checkpoint_dir = r".\testing\TF_DirectSN\02_14_20_10_CascadedGAN_Unet_augment_v1"
    # V1 = 'C:\\Users\SKKang\Downloads\\fMNI152_T1_2mm.img'
    in_file = "input_" + caseID
    out_file = "output_" + caseID
    in_file_full_path = os.path.join(inout_path, in_file + ".img")
    coreged = coreg(V2=in_file_full_path)
    coreged = np.transpose(coreged, [2, 1, 0])

    maxp = np.quantile(coreged.reshape([-1]), 0.95)

    coreged = coreged / maxp

    # numofset = len(os.listdir(testdir))

    with tf.Graph().as_default():

        pet_in = tf.placeholder(tf.float32,
                               [91, 109, 91],
                               name="PET")
        # pet_in = tf.placeholder(tf.float32,
        #                        [127, 344, 344],
        #                        name="PET")

        pet = tf.pad(pet_in, [[10, 11], [1, 2], [10, 11]], mode='constant')

        pet = tf.expand_dims(tf.expand_dims(pet, axis=-1), axis=0)

        # mr = tf.expand_dims(mr, axis=-1)

        gimg = pet

        dst = Dense3DSpatialTransformer()
        dgan = lays.deformedGAN()

        def_list = []
        for i in range(0, stages):
            deform = dgan.autoencoder(gimg, scope='gen_' + str(i), reuse=False)
            gimg = dst._transform(gimg, deform[:, :, :, :, 0], deform[:, :, :, :, 1], deform[:, :, :, :, 2])
            def_list.append(deform)

        defos = 0
        for defo in def_list:
            defos += defo

        gimg = dst._transform(pet, defos[:, :, :, :, 0], defos[:, :, :, :, 1], defos[:, :, :, :, 2], interp='linear')
        # gimg_mr = dst._transform(mr, defos[:, :, :, :, 0], defos[:, :, :, :, 1], defos[:, :, :, :, 2], interp='nearest')

        saver_re = tf.train.Saver()

        with tf.Session(config=tf.ConfigProto(allow_soft_placement=True)) as sess:
            ckpt = tf.train.get_checkpoint_state(checkpoint_dir)

            if ckpt and ckpt.model_checkpoint_path:
                saver_re.restore(sess, ckpt.model_checkpoint_path)
            else:
                print('No checkpoint file found')
                return

            # fname = time.strftime("%m_%d_%H_%M")
            # fname = fname + 'test'
            # tfi = os.path.join(r'.\testing\TF_DirectSN\testResults\coregpy', fname)
            # tfi = os.path.join(inout_path, fname)
            # if tf.gfile.Exists(tfi):
            #     tf.gfile.DeleteRecursively(tfi)
            # tf.gfile.MakeDirs(tfi)

            # hdrBasePath = 'D:\\DNN_directSN\\dataset\\test\\indv_PET\\resampled'
            # hdrlist = glob.glob(os.path.join(hdrBasePath, '*.hdr'))

            for i in range(0, 1):

                [xr, defosr]= sess.run(
                    [gimg, defos], feed_dict={pet_in: coreged})
                xr = xr*maxp

                # for ii, in_path in enumerate(outkeys):

                name = 'test'
                gimg_tmp = xr[0, 10:101, 1:110, 10:101].flatten()
                gimg_tmp = gimg_tmp.astype(dtype=np.int16)
                gimg_tmp.tofile(os.path.join(inout_path, out_file+".img"))
                # shutil.copy(os.path.join(hdrBasePath, name + '.hdr'), os.path.join(tfi, 'eval_gimg_' + name + '.hdr'))

                # defosr = defosr[0, 10:101, 1:110, 10:101,:].flatten()
                # defosr = defosr.astype(dtype=np.float32)
                # defosr.tofile(os.path.join(inout_path, 'eval_defo_' + name))
                # inout_path = os.path.join(settings.MEDIA_ROOT, "case_66")
                src_file_path = os.path.join(settings.BASE_DIR, "testing", "TF_DirectSN", "src", "output.hdr")
                dst_file_path = os.path.join(inout_path, "output_"+caseID+".hdr")
                copyfile(src_file_path, dst_file_path)
                    # gxhr_tmp = xr[ii, :, :, :].flatten()
                    # gxhr_tmp.tofile(os.path.join(tfi, 'eval_labl' + name))

                print(i, name)


# train()

# def main(argv=None):  # pylint: disable=unused-argument
#     train()
#
# if __name__ == '__main__':
#     tf.app.run()
