import React, { useState } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { SummaryOverview } from '../components/Dashboard/SummaryOverview';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';
import { WalletPerformance } from '../components/Dashboard/WalletPerformance';
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

      <SummaryOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tracked Wallets */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Tracked Wallets</h2>
          <div className="space-y-4">
            {wallets
              .filter(wallet => wallet.isTracked)
              .map(wallet => (
                <WalletCard
                  key={wallet.address}
                  wallet={wallet}
                  onEdit={() => {}} // We can implement edit functionality later
                />
              ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <RecentTransactions />
          <WalletPerformance />
        </div>
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