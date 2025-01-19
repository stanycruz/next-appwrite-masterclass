import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IUser } from '@/interfaces';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { uploadFileAndGetURL } from '@/helpers/file-uploads';
import { updateUserProfile } from '@/services/users';
import { IUsersStore, usersStore } from '@/store/users-store';

interface EditProfileModalProps {
  showEditProfileModal: boolean;
  setShowEditProfileModal: (show: boolean) => void;
  loggedInUser: IUser;
}

function EditProfileModal({
  showEditProfileModal,
  setShowEditProfileModal,
  loggedInUser,
}: EditProfileModalProps) {
  const { setLoggedInUser } = usersStore() as IUsersStore;
  const [name, setName] = React.useState(loggedInUser.name);
  const [newProfilePicture, setNewProfilePicture] = React.useState<File | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      let newProfilePictureUrl = loggedInUser.profilePictureUrl;

      if (newProfilePicture) {
        newProfilePictureUrl = await uploadFileAndGetURL(newProfilePicture);
      }

      await updateUserProfile({
        name,
        profilePictureUrl: newProfilePictureUrl,
        userDocId: loggedInUser.userDocId,
      });
      toast.success('Profile updated successfully');
      setLoggedInUser({
        ...loggedInUser,
        name,
        profilePictureUrl: newProfilePictureUrl,
      });
      setShowEditProfileModal(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  let imageSrc = loggedInUser.profilePictureUrl;

  if (!imageSrc) {
    imageSrc =
      'https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';
  }

  if (newProfilePicture) {
    imageSrc = URL.createObjectURL(newProfilePicture);
  }

  return (
    <Dialog open={showEditProfileModal} onOpenChange={setShowEditProfileModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Edit your profile information</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            labelName="Name"
          />

          <img className="w-20 h-20 rounded-full" src={imageSrc} />

          <Input
            type="file"
            labelName="Profile Picture"
            onChange={(e) => {
              setNewProfilePicture(e.target.files?.[0] || null);
            }}
          />
        </div>

        <DialogFooter>
          <div className="flex gap-5">
            <Button variant="outline">Cancel</Button>
            <Button disabled={loading} onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
