'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/services/users';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      toast.success(response.message);
      Cookies.set('token', JSON.stringify(response.data));
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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

        <Button disabled={loading || !email || !password} onClick={handleLogin}>
          Login
        </Button>

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
