import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { changeUserPassword } from '@/services/users';

interface ChangePasswordModalProps {
  showChangePasswordModal: boolean;
  setShowChangePasswordModal: (show: boolean) => void;
}

function ChangePasswordModal({
  showChangePasswordModal,
  setShowChangePasswordModal,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      await changeUserPassword({ password, oldPassword });
      toast.success('Password changed successfully');
      setShowChangePasswordModal(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={showChangePasswordModal}
      onOpenChange={() => setShowChangePasswordModal(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Change your password to keep your account secure.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <Input
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            labelName="Old Password"
          />

          <Input
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelName="New Password"
          />

          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            labelName="Confirm Password"
          />
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-5">
            <Button onClick={() => setShowChangePasswordModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                loading || !password || !confirmPassword || !oldPassword
              }
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordModal;
