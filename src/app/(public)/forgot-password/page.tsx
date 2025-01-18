'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { account } from '@/config/appwrite-config';

function ForgotPasswordPagePage() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSendResetLink = async () => {
    try {
      setLoading(true);
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
      toast.success('Reset link sent successfully');
      setEmail('');
    } catch (error) {
      toast.error('Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="bg-white p-5 rounded flex flex-col gap-5 w-[400px]">
        <h1 className="text-lg font-bold">Forgot Password</h1>
        <hr />

        <Input
          placeholder="Enter your email"
          labelName="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleSendResetLink} disabled={loading}>
          Send Reset Link
        </Button>

        <p className="text-center text-sm">
          Click here to{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPagePage;
