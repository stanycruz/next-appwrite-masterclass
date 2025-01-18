import React from 'react';
import Header from './header';
import { IUser } from '@/interfaces';
import { getLoggedInUser } from '@/services/users';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import VerifyEmail from '@/components/functional/verify-email';
import { IUsersStore, usersStore } from '@/store/users-store';

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setLoggedInUser, loggedInUser } = usersStore() as IUsersStore;

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
        <Spinner />
      </div>
    );
  }

  if (loggedInUser && !loggedInUser.emailVerification) {
    return (
      <div>
        <Header loggedInUser={loggedInUser as IUser} />
        <VerifyEmail />
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
