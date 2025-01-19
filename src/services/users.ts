import { account, databases } from '@/config/appwrite-config';
import { APPWRITE_DATABASE_ID, USERS_COLLECTION_ID } from '@/constants';
import { ID, Query } from 'appwrite';

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

export const getLoggedInUser = async () => {
  try {
    const authResponse = await account.get();
    const userDocResponse = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('userId', authResponse.$id)]
    );
    const user = userDocResponse.documents[0];
    const finalUserObject = {
      ...authResponse,
      ...user,
      userDocId: user.$id,
    };

    return {
      success: true,
      message: 'User fetched successfully',
      data: finalUserObject,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return {
      success: true,
      message: 'User logged out successfully',
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserProfile = async ({
  name,
  profilePictureUrl,
  userDocId,
}: {
  name: string;
  profilePictureUrl: string;
  userDocId: string;
}) => {
  try {
    await account.updateName(name);

    await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      USERS_COLLECTION_ID,
      userDocId,
      {
        name,
        profilePictureUrl,
      }
    );

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changeUserPassword = async ({
  password,
  oldPassword,
}: {
  password: string;
  oldPassword: string;
}) => {
  try {
    await account.updatePassword(password, oldPassword);
    return {
      success: true,
      message: 'Password changed successfully',
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
