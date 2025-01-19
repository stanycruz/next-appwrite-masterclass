export interface IUser {
  name: string;
  email: string;
  userId: string;
  userDocId: string;
  profilePictureUrl: string;
  $createdAt: string;
  $updatedAt: string;
  emailVerification: boolean;
}
