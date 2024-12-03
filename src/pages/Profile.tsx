import React from 'react';
import { UserInformation } from '../components/Profile/UserInformation';
import { SecuritySettings } from '../components/Profile/SecuritySettings';
import { ConnectedServices } from '../components/Profile/ConnectedServices';

export const Profile = () => (
  <div>
    <h1 className="text-2xl font-bold">Profile</h1>
    <p className="mt-4">Your profile settings will appear here.</p>
  </div>
);