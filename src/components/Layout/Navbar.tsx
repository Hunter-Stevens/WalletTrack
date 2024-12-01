import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LineChart, Bell, User } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Wallet className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">Wallet Tracker</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <LineChart className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/wallets" className={`nav-link ${isActive('/wallets')}`}>
              <Wallet className="h-5 w-5" />
              <span>Wallets</span>
            </Link>
            <Link to="/notifications" className={`nav-link ${isActive('/notifications')}`}>
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
            <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};