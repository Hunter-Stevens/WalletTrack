import React from 'react';
import { Wallet, ArrowUpRight, Bell } from 'lucide-react';
import { useWalletStore } from '../../store/useWalletStore';
import { useNotificationStore } from '../../store/useNotificationStore';

export const SummaryOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">Loading...</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">24h Change</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">Loading...</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Active Wallets</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">Loading...</p>
      </div>
    </div>
  );
};