export const APPWRITE_DATABASE_ID = '6789bfc10026465da71e';
export const USERS_COLLECTION_ID = '6789bfdb002c177d459a';
export const STORAGE_BUCKET_ID = '678d5685002abedeef10';

// routes which do not require authentication
export const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

// routes which require authentication
export const privateRoutes = ['/dashboard', '/profile'];
