import { create } from 'zustand';
import { Wallet, Transaction } from '../types/wallet';

interface WalletStore {
  wallets: Wallet[];
  transactions: Transaction[];
  addWallet: (wallet: Wallet) => void;
  removeWallet: (address: string) => void;
  updateWallet: (address: string, updates: Partial<Wallet>) => void;
  addTransaction: (transaction: Transaction) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: [],
  transactions: [],
  
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
    
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
}));