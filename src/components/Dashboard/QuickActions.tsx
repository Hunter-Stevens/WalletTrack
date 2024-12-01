import React from 'react';
import { PlusCircle, Bell, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  onAddWallet: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAddWallet }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={onAddWallet}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add Wallet</span>
      </button>

      <Link
        to="/notifications"
        className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
      >
        <Bell className="h-5 w-5" />
        <span>Manage Notifications</span>
      </Link>

      <Link
        to="/analytics"
        className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
      >
        <LineChart className="h-5 w-5" />
        <span>View Analytics</span>
      </Link>
    </div>
  );
};