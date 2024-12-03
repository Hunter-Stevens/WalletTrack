import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { AddWalletModal } from '../components/WalletManagement/AddWalletModal';
import { WalletCard } from '../components/WalletManagement/WalletCard';
import { Wallet } from '../types/wallet';

export const WalletManagement = () => {
  console.log('WalletManagement rendering');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const wallets = useWalletStore((state) => state.wallets);

  const handleEditWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Wallet Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your Solana wallets</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Wallet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.address}
            wallet={wallet}
            onEdit={handleEditWallet}
          />
        ))}
      </div>

      {wallets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No wallets added yet. Add your first wallet to get started!</p>
        </div>
      )}

      <AddWalletModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedWallet(null);
        }}
        selectedWallet={selectedWallet}
      />
    </div>
  );
};