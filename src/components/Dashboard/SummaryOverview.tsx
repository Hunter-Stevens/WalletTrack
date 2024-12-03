import React, { useState, useEffect } from 'react';
import { useWalletStore } from '../../store/useWalletStore';
import { getWalletBalances } from '../../utils/solana';

export const SummaryOverview = () => {
  const wallets = useWalletStore((state) => state.wallets);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        setIsLoading(true);
        let total = 0;

        // Get balances for all tracked wallets
        const balancePromises = wallets
          .filter(wallet => wallet.isTracked)
          .map(wallet => getWalletBalances(wallet.address));
        
        const walletsData = await Promise.all(balancePromises);

        // Calculate total USD value across all wallets
        walletsData.forEach(walletData => {
          // Add SOL value
          total += walletData.solanaUsdValue;
          
          // Add token values
          walletData.tokens.forEach(token => {
            total += token.usdValue;
          });
        });

        setTotalBalance(total);
      } catch (error) {
        console.error('Error calculating total balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalBalance();
    // Refresh every 30 seconds
    const interval = setInterval(fetchTotalBalance, 30000);
    return () => clearInterval(interval);
  }, [wallets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
        {isLoading ? (
          <p className="mt-2 text-3xl font-bold text-gray-900">Loading...</p>
        ) : (
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">24h Change</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-3xl font-bold text-gray-900">Coming Soon</p>
          {/* We can add 24h change calculation later */}
        </div>
      </div>
    </div>
  );
};