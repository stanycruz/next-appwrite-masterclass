import { account } from '@/config/appwrite-config';
import { ID } from 'appwrite';

export const registerNewUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return {
      success: true,
      message: 'User registered successfully',
      data: response,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
