  import { useState, useEffect, useCallback } from 'react';
  import { Wallet as WalletIcon, Trash2, Edit, Eye, EyeOff, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
  import { Wallet } from '../../types/wallet';
  import { useWalletStore } from '../../store/useWalletStore';
  import { getWalletBalances } from '../../utils/solana';

  interface WalletCardProps {
    wallet: Wallet;
    onEdit: (wallet: Wallet) => void;
  }

  export const WalletCard: React.FC<WalletCardProps> = ({ wallet, onEdit }) => {
    const { removeWallet, updateWallet } = useWalletStore();
    const [balances, setBalances] = useState<{ solana: number; solanaUsdValue: number; tokens: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBalances = useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const walletBalances = await getWalletBalances(wallet.address);
        if (!walletBalances) throw new Error('Failed to fetch balances');
        setBalances(walletBalances);
      } catch (err) {
        console.error('Balance fetch error:', err);
        setError('Failed to fetch balances. Please try again.');
        setBalances(null);
      } finally {
        setIsLoading(false);
      }
    }, [wallet.address]);

    useEffect(() => {
      fetchBalances();
    }, [fetchBalances]);

    const toggleTracking = () => {
      updateWallet(wallet.address, { isTracked: !wallet.isTracked });
    };

    const getSolanaExplorerUrl = (address: string) => 
      `https://explorer.solana.com/address/${address}`;

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <WalletIcon className="h-6 w-6 text-indigo-600 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{wallet.alias || 'Unnamed Wallet'}</h3>
                  <a
                    href={getSolanaExplorerUrl(wallet.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <button
                  onClick={fetchBalances}
                  disabled={isLoading}
                  className={`p-1 text-gray-400 hover:text-indigo-600 transition-colors ${
                    isLoading ? 'animate-spin' : ''
                  }`}
                  title="Refresh balances"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 break-all">{wallet.address}</p>
              
              {isLoading ? (
                <div className="mt-4 flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading balances...</span>
                </div>
              ) : error ? (
                <p className="mt-4 text-red-500">{error}</p>
              ) : balances && (
                <div className="mt-4 space-y-4">
                  {/* SOL Balance */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src="/solana-logo.png" alt="SOL" className="h-5 w-5" />
                        <span className="font-medium">SOL</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {balances.solana.toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 9
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${balances.solanaUsdValue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Token Balances */}
                  {balances.tokens.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-600">
                        Tokens ({balances.tokens.length})
                      </h4>
                      <div className="grid gap-2">
                        {balances.tokens.map((token) => (
                          <div
                            key={token.mint}
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {token.logoURI && (
                                  <img 
                                    src={token.logoURI} 
                                    alt={token.tokenName} 
                                    className="h-5 w-5 rounded-full"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                )}
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-base">
                                    {token.name || token.mint.slice(0, 8)}
                                  </span>
                                  <a
                                    href={getSolanaExplorerUrl(token.mint)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-indigo-600"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                              <p className="text-xs font-mono text-gray-400">
                                {`${token.mint.slice(0, 8)}...${token.mint.slice(-8)}`}
                              </p>
                              <div className="text-right">
                                <p className="font-medium">
                                  {(token.uiAmount || 0).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: token.decimals || 9
                                  })}
                                </p>
                                <p className="text-sm text-gray-600">
                                  ${(token.usdValue || 0).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(wallet)}
              className="p-1 text-gray-500 hover:text-indigo-600"
              title="Edit wallet"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTracking}
              className={`p-1 ${wallet.isTracked ? 'text-green-500' : 'text-gray-500'}`}
              title={wallet.isTracked ? 'Stop tracking' : 'Start tracking'}
            >
              {wallet.isTracked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              onClick={() => removeWallet(wallet.address)}
              className="p-1 text-gray-500 hover:text-red-600"
              title="Remove wallet"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };