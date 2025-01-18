'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';

function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

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

        <Button>Reset Password</Button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
