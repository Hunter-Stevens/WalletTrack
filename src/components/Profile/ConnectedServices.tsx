import React from 'react';
import { Wallet, Globe, X } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export const ConnectedServices = () => {
  const { connectedServices, unlinkService } = useUserStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Connected Services</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Linked Wallets</h3>
          <div className="space-y-3">
            {connectedServices
              .filter((service) => service.type === 'WALLET')
              .map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{wallet.name}</p>
                      <p className="text-sm text-gray-500">{wallet.identifier}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => unlinkService(wallet.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {connectedServices
              .filter((service) => service.type === 'OAUTH')
              .map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-gray-500">{account.identifier}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => unlinkService(account.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};