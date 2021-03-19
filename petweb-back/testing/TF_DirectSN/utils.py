# from keras.layers.core import Layer
import tensorflow as tf
import numpy as np

def sub2ind(siz, subs, **kwargs):
    """
    assumes column-order major
    """
    # subs is a list
    assert len(siz) == len(subs), 'found inconsistent siz and subs: %d %d' % (len(siz), len(subs))

    k = np.cumprod(siz[::-1])

    ndx = subs[-1]
    for i, v in enumerate(subs[:-1][::-1]):
        ndx = ndx + v * k[i]

    return ndx

class Dense3DSpatialTransformer():
    def __init__(self, padding = False):
        self.padding = padding

    def _transform(self, I, dx, dy, dz, interp='linear'):
        self.interp = interp
        batch_size = tf.shape(dx)[0]
        height = tf.shape(dx)[1]
        width = tf.shape(dx)[2]
        depth = tf.shape(dx)[3]

        # Convert dx and dy to absolute locations
        x_mesh, y_mesh, z_mesh = self._meshgrid(height, width, depth)
        x_mesh = tf.expand_dims(x_mesh, 0)
        y_mesh = tf.expand_dims(y_mesh, 0)
        z_mesh = tf.expand_dims(z_mesh, 0)

        x_mesh = tf.tile(x_mesh, [batch_size, 1, 1, 1])
        y_mesh = tf.tile(y_mesh, [batch_size, 1, 1, 1])
        z_mesh = tf.tile(z_mesh, [batch_size, 1, 1, 1])
        x_new = dx + x_mesh
        y_new = dy + y_mesh
        z_new = dz + z_mesh

        return self._interpolate(I, x_new, y_new, z_new)

    def _transform_back(self, I, dx, dy, dz, interp='linear'):
        self.interp = interp
        batch_size = tf.shape(dx)[0]
        height = tf.shape(dx)[1]
        width = tf.shape(dx)[2]
        depth = tf.shape(dx)[3]

        # Convert dx and dy to absolute locations
        x_mesh, y_mesh, z_mesh = self._meshgrid(height, width, depth)
        x_mesh = tf.expand_dims(x_mesh, 0)
        y_mesh = tf.expand_dims(y_mesh, 0)
        z_mesh = tf.expand_dims(z_mesh, 0)

        x_mesh = tf.tile(x_mesh, [batch_size, 1, 1, 1])
        y_mesh = tf.tile(y_mesh, [batch_size, 1, 1, 1])
        z_mesh = tf.tile(z_mesh, [batch_size, 1, 1, 1])
        x_new = -dx + x_mesh
        y_new = -dy + y_mesh
        z_new = -dz + z_mesh

        return self._interpolate(I, x_new, y_new, z_new)

    def _repeat(self, x, n_repeats):
        rep = tf.transpose(
            tf.expand_dims(tf.ones(shape=tf.stack([n_repeats, ])), 1), [1, 0])
        rep = tf.cast(rep, dtype='int32')
        x = tf.matmul(tf.reshape(x, (-1, 1)), rep)
        return tf.reshape(x, [-1])

    def _meshgrid(self, height, width, depth):
        x_t = tf.matmul(tf.ones(shape=tf.stack([height, 1])),
                        tf.transpose(tf.expand_dims(tf.linspace(0.0,
                                                                tf.cast(width, tf.float32)-1.0, width), 1), [1, 0]))
        y_t = tf.matmul(tf.expand_dims(tf.linspace(0.0,
                                                   tf.cast(height, tf.float32)-1.0, height), 1),
                        tf.ones(shape=tf.stack([1, width])))

        x_t = tf.tile(tf.expand_dims(x_t, 2), [1, 1, depth])
        y_t = tf.tile(tf.expand_dims(y_t, 2), [1, 1, depth])

        z_t = tf.linspace(0.0, tf.cast(depth, tf.float32)-1.0, depth)
        z_t = tf.expand_dims(tf.expand_dims(z_t, 0), 0)
        z_t = tf.tile(z_t, [height, width, 1])

        return x_t, y_t, z_t

    def _interpolate(self, im, x, y, z):
        if self.padding:
            im = tf.pad(im, [[0, 0], [1, 1], [1, 1], [1, 1], [0, 0]], "CONSTANT")

        num_batch = tf.shape(im)[0]
        height = tf.shape(im)[1]
        width = tf.shape(im)[2]
        depth = tf.shape(im)[3]
        channels = im.get_shape().as_list()[4]

        out_height = tf.shape(x)[1]
        out_width = tf.shape(x)[2]
        out_depth = tf.shape(x)[3]

        x = tf.reshape(x, [-1])
        y = tf.reshape(y, [-1])
        z = tf.reshape(z, [-1])

        padding_constant = 1 if self.padding else 0
        x = tf.cast(x, 'float32') + padding_constant
        y = tf.cast(y, 'float32') + padding_constant
        z = tf.cast(z, 'float32') + padding_constant

        if self.interp == 'linear':
            max_x = tf.cast(width - 1, 'int32')
            max_y = tf.cast(height - 1, 'int32')
            max_z = tf.cast(depth - 1, 'int32')

            x0 = tf.cast(tf.floor(x), 'int32')
            x1 = x0 + 1
            y0 = tf.cast(tf.floor(y), 'int32')
            y1 = y0 + 1
            z0 = tf.cast(tf.floor(z), 'int32')
            z1 = z0 + 1

            x0 = tf.clip_by_value(x0, 0, max_x)
            x1 = tf.clip_by_value(x1, 0, max_x)
            y0 = tf.clip_by_value(y0, 0, max_y)
            y1 = tf.clip_by_value(y1, 0, max_y)
            z0 = tf.clip_by_value(z0, 0, max_z)
            z1 = tf.clip_by_value(z1, 0, max_z)

            dim3 = depth
            dim2 = depth*width
            dim1 = depth*width*height
            base = self._repeat(tf.range(num_batch)*dim1,
                                out_height*out_width*out_depth)

            base_y0 = base + y0*dim2
            base_y1 = base + y1*dim2

            idx_a = base_y0 + x0*dim3 + z0
            idx_b = base_y1 + x0*dim3 + z0
            idx_c = base_y0 + x1*dim3 + z0
            idx_d = base_y1 + x1*dim3 + z0
            idx_e = base_y0 + x0*dim3 + z1
            idx_f = base_y1 + x0*dim3 + z1
            idx_g = base_y0 + x1*dim3 + z1
            idx_h = base_y1 + x1*dim3 + z1

            # use indices to lookup pixels in the flat image and restore
            # channels dim
            im_flat = tf.reshape(im, tf.stack([-1, channels]))
            im_flat = tf.cast(im_flat, 'float32')

            Ia = tf.gather(im_flat, idx_a)
            Ib = tf.gather(im_flat, idx_b)
            Ic = tf.gather(im_flat, idx_c)
            Id = tf.gather(im_flat, idx_d)
            Ie = tf.gather(im_flat, idx_e)
            If = tf.gather(im_flat, idx_f)
            Ig = tf.gather(im_flat, idx_g)
            Ih = tf.gather(im_flat, idx_h)

            # and finally calculate interpolated values
            x1_f = tf.cast(x1, 'float32')
            y1_f = tf.cast(y1, 'float32')
            z1_f = tf.cast(z1, 'float32')

            dx = x1_f - x
            dy = y1_f - y
            dz = z1_f - z

            wa = tf.expand_dims((dz * dx * dy), 1)
            wb = tf.expand_dims((dz * dx * (1-dy)), 1)
            wc = tf.expand_dims((dz * (1-dx) * dy), 1)
            wd = tf.expand_dims((dz * (1-dx) * (1-dy)), 1)
            we = tf.expand_dims(((1-dz) * dx * dy), 1)
            wf = tf.expand_dims(((1-dz) * dx * (1-dy)), 1)
            wg = tf.expand_dims(((1-dz) * (1-dx) * dy), 1)
            wh = tf.expand_dims(((1-dz) * (1-dx) * (1-dy)), 1)

            output = tf.add_n([wa*Ia, wb*Ib, wc*Ic, wd*Id,
                               we*Ie, wf*If, wg*Ig, wh*Ih])
            output = tf.reshape(output, tf.stack(
                [-1, out_height, out_width, out_depth, channels]))
        else:
            roundx = tf.cast(tf.round(y), 'int32')
            roundy = tf.cast(tf.round(x), 'int32')
            roundz = tf.cast(tf.round(z), 'int32')

            # clip values
            max_x = tf.cast(height - 1, 'int32')
            max_y = tf.cast(width - 1, 'int32')
            max_z = tf.cast(depth - 1, 'int32')

            roundx = tf.clip_by_value(roundx, 0, max_x)
            roundy = tf.clip_by_value(roundy, 0, max_y)
            roundz = tf.clip_by_value(roundz, 0, max_z)

            # get values
            # tf stacking is slow. replace with gather
            # roundloc = tf.stack(roundloc, axis=-1)
            # interp_vol = tf.gather_nd(vol, roundloc)
            idx = sub2ind(im.shape[1:-1], [roundx, roundy, roundz])
            output = tf.gather(tf.reshape(im, [-1, im.shape[-1]]), idx)
            output = tf.reshape(output, [num_batch, height, width, depth, channels])


        return output