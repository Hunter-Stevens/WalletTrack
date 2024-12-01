import React, { useState } from 'react';
import { useWalletStore } from '../../store/useWalletStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { NotificationChannel, NotificationFrequency } from '../../types/notification';

export const NotificationPreferences: React.FC = () => {
  const wallets = useWalletStore((state) => state.wallets);
  const { preferences, updatePreferences } = useNotificationStore();
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]?.address || '');

  const currentPreferences = preferences.find(
    (p) => p.walletAddress === selectedWallet
  ) || {
    walletAddress: selectedWallet,
    channels: ['EMAIL'],
    frequency: 'REAL_TIME' as NotificationFrequency,
  };

  const handleChannelToggle = (channel: NotificationChannel) => {
    const updatedChannels = currentPreferences.channels.includes(channel)
      ? currentPreferences.channels.filter((c) => c !== channel)
      : [...currentPreferences.channels, channel];

    updatePreferences({
      ...currentPreferences,
      channels: updatedChannels,
    });
  };

  const handleFrequencyChange = (frequency: NotificationFrequency) => {
    updatePreferences({
      ...currentPreferences,
      frequency,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Wallet
          </label>
          <select
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            className="input"
          >
            {wallets.map((wallet) => (
              <option key={wallet.address} value={wallet.address}>
                {wallet.alias || wallet.address}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Channels
          </label>
          <div className="space-y-2">
            {(['EMAIL', 'SMS', 'PUSH'] as NotificationChannel[]).map((channel) => (
              <label key={channel} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentPreferences.channels.includes(channel)}
                  onChange={() => handleChannelToggle(channel)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>{channel}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Frequency
          </label>
          <select
            value={currentPreferences.frequency}
            onChange={(e) => handleFrequencyChange(e.target.value as NotificationFrequency)}
            className="input"
          >
            <option value="REAL_TIME">Real-time</option>
            <option value="DAILY">Daily Digest</option>
            <option value="WEEKLY">Weekly Summary</option>
          </select>
        </div>
      </div>
    </div>
  );
};