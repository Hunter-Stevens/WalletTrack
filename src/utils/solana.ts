import { Connection, PublicKey, Commitment } from '@solana/web3.js';

// Constants
const ALCHEMY_URL = 'https://solana-mainnet.g.alchemy.com/v2/7lC3l5bjOpt-JA-LhAE92vG_QhI-0JtN';
const JUPITER_PRICE_API = 'https://price.jup.ag/v4/price';
const HELIUS_API_KEY = 'e8ac9ebb-551d-437c-8d4b-f5fd0e56f561';
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const BIRDEYE_API = 'https://public-api.birdeye.so';
const BIRDEYE_API_KEY = 'e8ac9ebb-551d-437c-8d4b-f5fd0e56f561';
const RAYDIUM_API = 'https://api.raydium.io/v2';
const RAYDIUM_PRICE_API = `${RAYDIUM_API}/main/price`;
const SOL_MINT = 'So11111111111111111111111111111111111111112';

const connection = new Connection(ALCHEMY_URL, 'confirmed');

// Types
interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string | null;
}

interface TokenBalance extends TokenMetadata {
  mint: string;
  balance: number;
  usdValue: number;
}

interface WalletBalances {
  solana: number;
  solanaUsdValue: number;
  tokens: TokenBalance[];
}

interface TokenData {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: null;  // Explicitly null since we're not using Helius metadata
  balance: number;
  usdValue: number;
}

// Simplify price fetching to only use Jupiter
async function getTokenPrice(address: string): Promise<number> {
  try {
    const response = await fetch(`${JUPITER_PRICE_API}?ids=${address}`);
    const data = await response.json();
    const price = data.data?.[address]?.price || 0;
    console.log(`Jupiter price for ${address}:`, price);
    return price;
  } catch (error) {
    console.error('Error fetching price:', error);
    return 0;
  }
}

// Add batch processing for token metadata
async function getTokensMetadata(mints: string[], parsedInfos: any[]): Promise<TokenMetadata[]> {
  try {
    const response = await fetch(HELIUS_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetBatch',
        params: {
          ids: mints,
          options: {
            showFungible: true,
          },
        },
      }),
    });

    const { result } = await response.json();
    console.log('Raw Helius Response:', result);

    return mints.map((mint, index) => {
      const asset = result?.[index];
      const parsedInfo = parsedInfos[index];

      console.group(`Processing Token: ${mint}`);
      console.log('Helius Asset Data:', asset);
      console.log('Parsed Account Info:', parsedInfo);

      if (asset?.content?.metadata) {
        const metadata = {
          symbol: asset.content.metadata.symbol || mint.slice(0, 8),
          name: asset.content.metadata.name || 
                asset.content.metadata.symbol || 
                `Token ${mint.slice(0, 8)}`,
          decimals: parsedInfo.tokenAmount.decimals,
          logoURI: asset.content.links?.image || asset.content.json_uri || null
        };
        console.log('Final Metadata:', metadata);
        console.groupEnd();
        return metadata;
      }

      const fallbackMetadata = {
        symbol: parsedInfo.tokenAmount?.symbol || mint.slice(0, 8),
        name: parsedInfo.tokenAmount?.symbol || `Token ${mint.slice(0, 8)}`,
        decimals: parsedInfo.tokenAmount.decimals,
        logoURI: null
      };
      console.log('Fallback Metadata:', fallbackMetadata);
      console.groupEnd();
      return fallbackMetadata;
    });
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return mints.map((mint, i) => ({
      symbol: mint.slice(0, 8),
      name: `Token ${mint.slice(0, 8)}`,
      decimals: parsedInfos[i].tokenAmount.decimals,
      logoURI: null
    }));
  }
}

// Add retry utility function
async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay);
  }
}

// Update getWalletBalances to use retry and better error handling
export async function getWalletBalances(address: string): Promise<WalletBalances> {
  try {
    // Get SOL balance using RPC call
    const solResponse = await fetch(ALCHEMY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [address]
      })
    });

    const solData = await solResponse.json();
    const solBalance = solData.result?.value || 0;
    const solDecimals = 9;
    const solPrice = await getTokenPrice(SOL_MINT);
    const solUiAmount = solBalance / Math.pow(10, solDecimals);

    console.log('SOL Price:', solPrice);
    console.log('SOL Balance:', solUiAmount);
    console.log('SOL USD Value:', solUiAmount * solPrice);

    // Get token accounts with retry
    const tokenAccounts = await retry(async () => {
      const response = await fetch(ALCHEMY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            address,
            {
              programId: TOKEN_PROGRAM_ID.toString()
            },
            {
              encoding: 'jsonParsed'
            }
          ]
        })
      });
      
      const data = await response.json();
      if (!data.result?.value) {
        throw new Error('Failed to fetch token accounts');
      }
      return data.result.value;
    });

    const filteredAccounts = tokenAccounts.filter((item: any) => {
      const parsedInfo = item.account.data.parsed.info;
      return Number(parsedInfo.tokenAmount.amount) > 0;
    });

    const mints = filteredAccounts.map((item: any) => item.account.data.parsed.info.mint);
    const parsedInfos = filteredAccounts.map((item: any) => item.account.data.parsed.info);

    const metadataResults = await getTokensMetadata(mints, parsedInfos);
    const prices = await Promise.all(mints.map((mint: string) => getTokenPrice(mint)));

    const tokens = filteredAccounts.map((item: any, index: number) => {
      const parsedInfo = item.account.data.parsed.info;
      const metadata = metadataResults[index];
      const price = prices[index];

      const tokenAmount = Number(parsedInfo.tokenAmount.amount) / Math.pow(10, parsedInfo.tokenAmount.decimals);

      return {
        mint: parsedInfo.mint,
        symbol: metadata.symbol,
        name: metadata.name,
        decimals: metadata.decimals,
        logoURI: metadata.logoURI,
        balance: tokenAmount,
        usdValue: price * tokenAmount
      } as TokenBalance;
    });

    return {
      solana: solUiAmount,
      solanaUsdValue: solUiAmount * solPrice,
      tokens: tokens.sort((a: TokenBalance, b: TokenBalance) => b.usdValue - a.usdValue)
    };
  } catch (error) {
    console.error('Error fetching balances:', error);
    return {
      solana: 0,
      solanaUsdValue: 0,
      tokens: []
    };
  }
}

export const validateSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};