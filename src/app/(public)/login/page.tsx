'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="auth-background">
      <div className="bg-white p-5 rounded flex flex-col gap-5 w-[400px]">
        <h1 className="text-lg font-bold">Login</h1>
        <hr />

        <Input
          placeholder="Enter your email"
          labelName="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Enter your password"
          labelName="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button>Login</Button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>

        <p className="text-center text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
