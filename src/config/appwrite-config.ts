import { Client } from 'appwrite';
const client = new Client();
client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');
