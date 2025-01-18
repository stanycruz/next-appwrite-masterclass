'use client';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces';
import { getLoggedInUser, logoutUser } from '@/services/users';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

function DashboardPage() {
  const [loggedInUser, setLoggedInUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [performingLogout, setPerformingLogout] =
    React.useState<boolean>(false);
  const router = useRouter();

  const fetchLoggedInUser = async () => {
    try {
      setLoading(true);
      const response = await getLoggedInUser();
      setLoggedInUser(response.data as any);
    } catch (error) {
      toast.error('Failed to fetch logged in user');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setPerformingLogout(true);
      await logoutUser();
      toast.success('Logged out successfully');
      Cookies.remove('token');
      router.push('/login');
    } catch (error) {
      toast.error(error);
    } finally {
      setPerformingLogout(false);
    }
  };

  React.useEffect(() => {
    fetchLoggedInUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1>Dashboard Page</h1>

      <h1>Name: {loggedInUser?.name}</h1>
      <h1>UserId: {loggedInUser?.userId}</h1>
      <h1>Email: {loggedInUser?.email}</h1>
      <h1>Profile Picture: {loggedInUser?.profilePictureUrl || 'N/A'}</h1>

      <Button onClick={logout} disabled={performingLogout}>
        Logout
      </Button>
    </div>
  );
}

export default DashboardPage;
