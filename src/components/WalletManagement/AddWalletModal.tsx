import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useWalletStore } from '../../store/useWalletStore';
import { validateSolanaAddress } from '../../utils/validation';

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWalletModal: React.FC<AddWalletModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');
  const addWallet = useWalletStore((state) => state.addWallet);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSolanaAddress(address)) {
      setError('Invalid Solana address format');
      return;
    }

    addWallet({
      address,
      alias: alias.trim() || undefined,
      isTracked: true,
    });
    
    onClose();
    setAddress('');
    setAlias('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Wallet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input"
              placeholder="Enter Solana wallet address"
              required
            />
          </div>

          <div>
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
              Alias (Optional)
            </label>
            <input
              id="alias"
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="input"
              placeholder="Enter a friendly name"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Wallet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};