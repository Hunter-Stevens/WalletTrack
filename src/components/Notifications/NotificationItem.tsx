import React from 'react';
import { Bell, Wallet, ArrowRightLeft, DollarSign, X } from 'lucide-react';
import { Notification, NotificationType } from '../../types/notification';
import { useNotificationStore } from '../../store/useNotificationStore';

interface NotificationItemProps {
  notification: Notification;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'TRANSFER':
      return <ArrowRightLeft className="h-5 w-5" />;
    case 'SWAP':
      return <ArrowRightLeft className="h-5 w-5" />;
    case 'LARGE_TRANSACTION':
      return <DollarSign className="h-5 w-5" />;
    case 'SYSTEM':
      return <Bell className="h-5 w-5" />;
    default:
      return <Wallet className="h-5 w-5" />;
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead, removeNotification } = useNotificationStore();

  return (
    <div
      className={`p-4 rounded-lg border ${
        notification.read ? 'bg-white' : 'bg-indigo-50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="text-indigo-600">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};