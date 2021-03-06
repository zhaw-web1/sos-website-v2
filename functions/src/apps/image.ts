import {Request, Response} from 'express';
import * as sharp from 'sharp';
import * as functions from 'firebase-functions';
import {storage, initializeApp} from 'firebase-admin';
import {tmpdir} from 'os';
import {dirname, join} from 'path';
import * as fs from 'fs-extra';

initializeApp();

export const thumbnailGenerator = functions.storage.object().onFinalize(async (object, context) => {
  const bucket = storage().bucket(object.bucket);
  const filePath = object.name;
  const fileName = filePath.split('/').pop();
  const bucketDir = dirname(filePath);

  const workingDir = join(tmpdir(), 'thumbs');
  const tmpFilePath = join(workingDir, 'source.png');

  if ((!object.metadata || !object.metadata['generateThumbnails']) || !object.contentType.includes('image')) {
    console.log('exiting function');
    return false;
  }

  await fs.ensureDir(workingDir);

  await bucket.file(filePath).download({
    destination: tmpFilePath
  });

  // 3. Resize the images and define an array of upload promises
  const sizes = [256, 600, 1920];

  const uploadPromises = sizes.map(async size => {
    const thumbName = `image@${size}`;
    const thumbPath = join(workingDir, thumbName);

    // Resize source image
    await sharp(tmpFilePath)
      .resize(size)
      .jpeg({
        quality: 40
      })
      .toFile(thumbPath);

    // Upload to GCS
    return bucket.upload(thumbPath, {
      destination: join(bucketDir, thumbName),
      metadata: {
        contentType: 'image/jpeg'
      }
    });
  });

  // 4. Run the upload operations
  await Promise.all(uploadPromises);

  // 5. Cleanup remove the tmp/thumbs from the filesystem
  return fs.remove(workingDir);

});
