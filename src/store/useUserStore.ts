import { create } from 'zustand';
import { User, PasswordUpdate, ConnectedService } from '../types/user';

interface UserStore {
  user: User;
  connectedServices: ConnectedService[];
  updateUser: (updates: Partial<User>) => void;
  updatePassword: (passwords: PasswordUpdate) => Promise<void>;
  toggle2FA: () => void;
  unlinkService: (serviceId: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    twoFactorEnabled: false,
  },
  connectedServices: [
    {
      id: '1',
      type: 'WALLET',
      name: 'Main Wallet',
      identifier: '7xKXJg...3dKh9',
    },
    {
      id: '2',
      type: 'OAUTH',
      name: 'Google',
      identifier: 'john@gmail.com',
    },
  ],
  
  updateUser: (updates) =>
    set((state) => ({
      user: { ...state.user, ...updates },
    })),
    
  updatePassword: async (passwords) => {
    // Simulated API call
    if (passwords.newPassword !== passwords.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    // In a real app, make API call here
    return Promise.resolve();
  },
  
  toggle2FA: () =>
    set((state) => ({
      user: { ...state.user, twoFactorEnabled: !state.user.twoFactorEnabled },
    })),
    
  unlinkService: (serviceId) =>
    set((state) => ({
      connectedServices: state.connectedServices.filter((s) => s.id !== serviceId),
    })),
}));