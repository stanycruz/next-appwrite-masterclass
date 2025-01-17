'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerNewUser } from '@/services/users';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await registerNewUser(name, email, password);
      toast.success(response.message);
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
        <h1 className="text-lg font-bold">Register</h1>
        <hr />

        <Input
          placeholder="Enter your name"
          labelName="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <Button
          disabled={loading || !name || !email || !password}
          onClick={handleRegister}
        >
          Register
        </Button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
