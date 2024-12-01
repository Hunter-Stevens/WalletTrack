import React, { useState } from 'react';
import { SummaryOverview } from '../components/Dashboard/SummaryOverview';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';
import { WalletPerformance } from '../components/Dashboard/WalletPerformance';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { Modal } from '../components/shared/Modal';
import { AddWalletForm } from '../components/WalletManagement/AddWalletForm';

export const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Portfolio Value</h2>
            <div className="text-3xl font-bold text-gray-900">
              {/* Mock total value */}
              1,234.56 SOL
            </div>
            <div className="flex items-center text-green-600 mt-2">
              <span className="text-sm">+5.2% (24h)</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Wallet Performance</h2>
        <WalletPerformance />
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