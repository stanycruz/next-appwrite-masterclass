'use client';
import React from 'react';
import { account } from '@/config/appwrite-config';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';

function VerifyEmail() {
  const searchParams = useSearchParams();
  const [result, setResult] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const verifyEmailAddress = async () => {
    try {
      setLoading(true);
      await account.updateVerification(userId!, secret!);
      toast.success('Email address verified successfully');
      setResult('success');
    } catch (error) {
      toast.error('Failed to verify email address');
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    verifyEmailAddress();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Spinner />}
      {result === 'success' && (
        <p className="p-5 border border-green-500 bg-green-500 bg-opacity-15 text-black">
          Email address verified successfully
        </p>
      )}
      {result === 'error' && (
        <p className="p-5 border border-red-500 bg-red-500 bg-opacity-15 text-black">
          Fail to verify email address
        </p>
      )}
    </div>
  );
}

export default VerifyEmail;
