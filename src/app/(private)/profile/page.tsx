'use client';
import { Button } from '@/components/ui/button';
import { IUsersStore, usersStore } from '@/store/users-store';
import dayjs from 'dayjs';
import React from 'react';
import EditProfileModal from './_components/edit-profile-modal';
import { IUser } from '@/interfaces';
import ChangePasswordModal from './_components/change-password-modal';

function ProfilePage() {
  const { loggedInUser } = usersStore() as IUsersStore;
  const [showEditProfileModal, setShowEditProfileModal] = React.useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    React.useState(false);

  let profilePictureUrl = loggedInUser?.profilePictureUrl;

  if (!profilePictureUrl) {
    profilePictureUrl =
      'https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';
  }

  const renderUserProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-semibold mt-[1px]">{value}</span>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Profile</h1>

      <div className="grid lg:grid-cols-3 gap-7 mt-7">
        <div className="col-span-1 border border-x-gray-300 p-5 flex justify-center items-center flex-col gap-5">
          <img className="w-32 h-32 rounded-full" src={profilePictureUrl} />
          <h2 className="text-lg font-bold uppercase">{loggedInUser?.name}</h2>
        </div>
        <div className="col-span-2 grid lg:grid-cols-3 p-5 border border-gray-300">
          {renderUserProperty('Name', loggedInUser?.name || '')}
          {renderUserProperty('Email', loggedInUser?.email || '')}
          {renderUserProperty('User ID', loggedInUser?.userId || '')}
          {renderUserProperty(
            'Created At',
            dayjs(loggedInUser?.$createdAt).format('MMM DD, YYYY hh:mm A') || ''
          )}
          {renderUserProperty(
            'Updated At',
            dayjs(loggedInUser?.$updatedAt).format('MMM DD, YYYY hh:mm A') || ''
          )}
        </div>
      </div>

      <div className="flex justify-end mt-7 gap-5">
        <Button
          onClick={() => {
            setShowChangePasswordModal(true);
          }}
        >
          Change Password
        </Button>
        <Button onClick={() => setShowEditProfileModal(true)}>
          Edit Profile
        </Button>
      </div>

      {showEditProfileModal && (
        <EditProfileModal
          showEditProfileModal={showEditProfileModal}
          setShowEditProfileModal={setShowEditProfileModal}
          loggedInUser={loggedInUser as IUser}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          showChangePasswordModal={showChangePasswordModal}
          setShowChangePasswordModal={setShowChangePasswordModal}
        />
      )}
    </div>
  );
}

export default ProfilePage;
