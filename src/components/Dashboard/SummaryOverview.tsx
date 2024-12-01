import React from 'react';
import { Wallet, ArrowUpRight, Bell } from 'lucide-react';
import { useWalletStore } from '../../store/useWalletStore';
import { useNotificationStore } from '../../store/useNotificationStore';

export const SummaryOverview = () => {
  const wallets = useWalletStore((state) => state.wallets);
  const transactions = useWalletStore((state) => state.transactions);
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Wallets</p>
            <p className="text-2xl font-semibold mt-1">{wallets.length}</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <Wallet className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
            <p className="text-2xl font-semibold mt-1">{transactions.length}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <ArrowUpRight className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Unread Alerts</p>
            <p className="text-2xl font-semibold mt-1">{unreadCount}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Bell className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
};