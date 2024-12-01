import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { validateSolanaAddress, getWalletBalance } from '../../utils/solana';
import { useWalletStore } from '../../store/useWalletStore';

interface AddWalletFormProps {
  onClose: () => void;
}

export const AddWalletForm: React.FC<AddWalletFormProps> = ({ onClose }) => {
  const [address, setAddress] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addWallet = useWalletStore((state) => state.addWallet);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateSolanaAddress(address)) {
      setError('Invalid Solana address format');
      return;
    }

    setIsLoading(true);
    try {
      const balance = await getWalletBalance(address);
      
      addWallet({
        address,
        alias: alias.trim() || undefined,
        balance,
        isTracked: true,
      });
      
      onClose();
    } catch (err) {
      setError('Failed to add wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center space-x-2"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>Add Wallet</span>
        </button>
      </div>
    </form>
  );
};