import { create } from 'zustand';
import { Notification, NotificationPreference } from '../types/notification';

interface NotificationStore {
  notifications: Notification[];
  preferences: NotificationPreference[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  updatePreferences: (preferences: NotificationPreference) => void;
  removePreferences: (walletAddress: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  preferences: [],
  
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
    
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
    
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
    
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
    
  updatePreferences: (newPreferences) =>
    set((state) => ({
      preferences: [
        ...state.preferences.filter(
          (p) => p.walletAddress !== newPreferences.walletAddress
        ),
        newPreferences,
      ],
    })),
    
  removePreferences: (walletAddress) =>
    set((state) => ({
      preferences: state.preferences.filter(
        (p) => p.walletAddress !== walletAddress
      ),
    })),
}));