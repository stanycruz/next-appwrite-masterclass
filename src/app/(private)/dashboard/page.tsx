'use client';
import { getLoggedInUser } from '@/services/users';
import React from 'react';
import toast from 'react-hot-toast';

function DashboardPage() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  const fetchLoggedInUser = async () => {
    try {
      const response = await getLoggedInUser();
      console.log(response);
    } catch (error) {
      toast.error('Failed to fetch logged in user');
    }
  };

  React.useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return <div>DashboardPage</div>;
}

export default DashboardPage;
