import React from 'react';
import { useWalletStore } from '../../store/useWalletStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const WalletPerformance = () => {
  const wallets = useWalletStore((state) => state.wallets);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wallets.map((wallet) => (
        <div key={wallet.address} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{wallet.alias || wallet.address}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {wallet.address.slice(0, 4)}...{wallet.address.slice(-4)}
              </p>
            </div>
            {/* Mock performance indicator */}
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+2.5%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-xl font-semibold mt-1">
              {wallet.balance?.toFixed(2) || '0.00'} SOL
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};