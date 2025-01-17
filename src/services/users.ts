import { account, databases } from '@/config/appwrite-config';
import { APPWRITE_DATABASE_ID, USERS_COLLECTION_ID } from '@/constants';
import { ID } from 'appwrite';

export const registerNewUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    // store data in appwrite authentication
    const response = await account.create(ID.unique(), email, password, name);

    // store data in appwrite database, users collection with all the user details
    await databases.createDocument(
      APPWRITE_DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId: response.$id,
        name,
        email,
        profilePictureUrl: '',
      }
    );
    return {
      success: true,
      message: 'User registered successfully, please login',
      data: response,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return {
      success: true,
      message: 'User logged in successfully',
      data: response,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
