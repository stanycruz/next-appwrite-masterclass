import React from 'react';
import { Button } from '../ui/button';
import { account } from '@/config/appwrite-config';
import toast from 'react-hot-toast';

function VerifyEmail() {
  const [loading, setLoading] = React.useState(false);
  const handleSendEmailVerification = async () => {
    try {
      setLoading(true);
      await account.createVerification(
        `${window.location.origin}/verify-email`
      );
      toast.success('Email verification link sent successfully');
    } catch (error) {
      toast.error('Failed to send email verification link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <p className="text-sm">
        Your email is not verified. Please click on the below button to verify
        your email.
      </p>
      <Button
        onClick={handleSendEmailVerification}
        disabled={loading}
        className="w-max"
      >
        Send Email Verification Link
      </Button>
    </div>
  );
}

export default VerifyEmail;
