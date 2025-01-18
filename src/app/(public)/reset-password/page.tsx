'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { account } from '@/config/appwrite-config';

function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');
  const router = useRouter();

  const handleSendResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      setLoading(true);
      await account.updateRecovery(userId!, secret!, password);
      toast.success('Password has been reset successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="bg-white p-5 rounded flex flex-col gap-5 w-[400px]">
        <h1 className="text-lg font-bold">Reset Password</h1>
        <hr />

        <Input
          placeholder="Enter your password"
          labelName="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          placeholder="Confirm your password"
          labelName="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          onClick={handleSendResetPassword}
          disabled={loading || !password || !confirmPassword}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
