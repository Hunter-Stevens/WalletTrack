export const validateSolanaAddress = (address: string): boolean => {
  // Basic Solana address validation
  const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return SOLANA_ADDRESS_REGEX.test(address);
};