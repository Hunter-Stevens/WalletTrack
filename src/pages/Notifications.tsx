import React from 'react';
import { useNotificationStore } from '../store/useNotificationStore';
import { NotificationItem } from '../components/Notifications/NotificationItem';
import { NotificationPreferences } from '../components/Notifications/NotificationPreferences';

export const Notifications = () => {
  const { notifications, markAllAsRead } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <NotificationPreferences />
        </div>
      </div>
    </div>
  );
};