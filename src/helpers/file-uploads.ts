import { storage } from '@/config/appwrite-config';
import { STORAGE_BUCKET_ID } from '@/constants';
import { ID } from 'appwrite';

export const uploadFileAndGetURL = async (file: File) => {
  try {
    const response = await storage.createFile(
      STORAGE_BUCKET_ID,
      ID.unique(),
      file
    );
    const url = storage.getFileDownload(STORAGE_BUCKET_ID, response.$id);

    return url;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};
