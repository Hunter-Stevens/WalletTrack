import React from 'react';
import { useWalletStore } from '../../store/useWalletStore';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <p className="text-gray-500">No recent transactions</p>
    </div>
  );
};