import React, { useState } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { Modal } from '../components/shared/Modal';
import { AddWalletForm } from '../components/WalletManagement/AddWalletForm';
import { WalletCard } from '../components/WalletManagement/WalletCard';

export const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const wallets = useWalletStore((state) => state.wallets);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track and manage your Solana wallets
          </p>
        </div>
        <QuickActions onAddWallet={() => setIsAddModalOpen(true)} />
      </div>

      {/* Tracked Wallets */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Tracked Wallets</h2>
        <div className="relative">
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-4">
              {wallets
                .filter(wallet => wallet.isTracked)
                .map(wallet => (
                  <div key={wallet.address} className="w-[400px] flex-shrink-0">
                    <WalletCard
                      wallet={wallet}
                      onEdit={() => {}}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <RecentTransactions />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Wallet"
      >
        <AddWalletForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
};