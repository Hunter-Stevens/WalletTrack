export type NotificationChannel = 'EMAIL' | 'SMS' | 'PUSH';
export type NotificationFrequency = 'REAL_TIME' | 'DAILY' | 'WEEKLY';
export type NotificationType = 'TRANSFER' | 'SWAP' | 'LARGE_TRANSACTION' | 'SYSTEM';

export interface NotificationPreference {
  walletAddress: string;
  channels: NotificationChannel[];
  frequency: NotificationFrequency;
  minimumAmount?: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  walletAddress: string;
  timestamp: Date;
  read: boolean;
  data?: Record<string, any>;
}