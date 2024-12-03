import React from 'react';
import { useNotificationStore } from '../store/useNotificationStore';
import { NotificationItem } from '../components/Notifications/NotificationItem';
import { NotificationPreferences } from '../components/Notifications/NotificationPreferences';

export const Notifications = () => (
  <div>
    <h1 className="text-2xl font-bold">Notifications</h1>
    <p className="mt-4">Your notifications will appear here.</p>
  </div>
);