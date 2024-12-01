import React from 'react';
import { Wallet as WalletIcon, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { Wallet } from '../../types/wallet';
import { useWalletStore } from '../../store/useWalletStore';

interface WalletCardProps {
  wallet: Wallet;
  onEdit: (wallet: Wallet) => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ wallet, onEdit }) => {
  const { removeWallet, updateWallet } = useWalletStore();

  const toggleTracking = () => {
    updateWallet(wallet.address, { isTracked: !wallet.isTracked });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <WalletIcon className="h-6 w-6 text-indigo-600" />
          <div>
            <h3 className="font-semibold">{wallet.alias || 'Unnamed Wallet'}</h3>
            <p className="text-sm text-gray-500">{wallet.address}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(wallet)}
            className="p-1 text-gray-500 hover:text-indigo-600"
            title="Edit wallet"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={toggleTracking}
            className={`p-1 ${wallet.isTracked ? 'text-green-500' : 'text-gray-500'}`}
            title={wallet.isTracked ? 'Stop tracking' : 'Start tracking'}
          >
            {wallet.isTracked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button
            onClick={() => removeWallet(wallet.address)}
            className="p-1 text-gray-500 hover:text-red-600"
            title="Remove wallet"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {wallet.balance !== undefined && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Balance: <span className="font-medium">{wallet.balance} SOL</span>
          </p>
        </div>
      )}
    </div>
  );
};