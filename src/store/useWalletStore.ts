import { create } from 'zustand';
import { Wallet } from '../types/wallet';

interface WalletStore {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  removeWallet: (address: string) => void;
  updateWallet: (address: string, updates: Partial<Wallet>) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: [],
  addWallet: (wallet) =>
    set((state) => ({
      wallets: [...state.wallets, wallet],
    })),
  removeWallet: (address) =>
    set((state) => ({
      wallets: state.wallets.filter((w) => w.address !== address),
    })),
  updateWallet: (address, updates) =>
    set((state) => ({
      wallets: state.wallets.map((w) =>
        w.address === address ? { ...w, ...updates } : w
      ),
    })),
}));