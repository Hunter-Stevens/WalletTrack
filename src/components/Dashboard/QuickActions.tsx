import React from 'react';
import { PlusCircle, Bell, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  onAddWallet: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAddWallet }) => {
  return (
    <div>
      <button
        onClick={onAddWallet}
        className="btn-primary"
      >
        Add Wallet
      </button>
    </div>
  );
};