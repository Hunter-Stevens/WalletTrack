import React from 'react';
import { UserInformation } from '../components/Profile/UserInformation';
import { SecuritySettings } from '../components/Profile/SecuritySettings';
import { ConnectedServices } from '../components/Profile/ConnectedServices';

export const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and security preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <UserInformation />
          <SecuritySettings />
        </div>
        <div>
          <ConnectedServices />
        </div>
      </div>
    </div>
  );
};