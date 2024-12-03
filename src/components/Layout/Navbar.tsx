import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, Bell, User } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/')}`}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/wallets"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/wallets')}`}
            >
              <Wallet className="h-5 w-5 mr-2" />
              Wallets
            </Link>
            <Link
              to="/notifications"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/notifications')}`}
            >
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </Link>
            <Link
              to="/profile"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/profile')}`}
            >
              <User className="h-5 w-5 mr-2" />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};