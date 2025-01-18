export const APPWRITE_DATABASE_ID = '6789bfc10026465da71e';
export const USERS_COLLECTION_ID = '6789bfdb002c177d459a';

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
