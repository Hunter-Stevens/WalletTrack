export interface Wallet {
  address: string;
  alias?: string;
  isTracked: boolean;
}

export interface Transaction {
  id: string;
  date: Date;
  walletAddress: string;
  type: 'TRANSFER' | 'SWAP' | 'OTHER';
  amount: number;
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
}