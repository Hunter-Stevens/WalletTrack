import React from 'react';
import { useWalletStore } from '../../store/useWalletStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const WalletPerformance = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Wallet Performance</h2>
      <p className="text-gray-500">No performance data available</p>
    </div>
  );
};