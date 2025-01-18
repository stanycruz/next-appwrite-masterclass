import React from 'react';
import Header from './header';
import { IUser } from '@/interfaces';
import { getLoggedInUser } from '@/services/users';
import toast from 'react-hot-toast';

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

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
    <div>
      <Header loggedInUser={loggedInUser as IUser} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
