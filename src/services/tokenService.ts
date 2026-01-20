/**
 * Token service layer
 * Provides token-related operations such as fetching balances and formatting amounts
 * This is a shell implementation - concrete token operations will be implemented later
 */

import type { Web3Client } from './web3Client';
import type { Token, TokenBalance } from '@/domain/token';
import type { ChainId } from '@/domain/chain';

/**
 * Token service interface
 * Defines methods for token operations
 */
export interface TokenService {
  /**
   * Fetch token balances for an address on a specific chain
   * @param address - Ethereum address to query
   * @param chainId - Chain ID to query on
   * @param tokens - Optional list of specific tokens to query. If omitted, fetches all supported tokens.
   * @returns Array of token balances
   * @throws DomainError if the operation fails
   */
  fetchTokenBalances(
    address: `0x${string}`,
    chainId: ChainId,
    tokens?: Token[]
  ): Promise<TokenBalance[]>;

  /**
   * Fetch balance for a single token
   * @param address - Ethereum address to query
   * @param token - Token to query
   * @returns Token balance or null if token not found
   * @throws DomainError if the operation fails
   */
  fetchTokenBalance(
    address: `0x${string}`,
    token: Token
  ): Promise<TokenBalance | null>;

  /**
   * Fetch native token balance (ETH, BNB, etc.)
   * @param address - Ethereum address to query
   * @param chainId - Chain ID to query on
   * @returns Native token balance
   * @throws DomainError if the operation fails
   */
  fetchNativeBalance(
    address: `0x${string}`,
    chainId: ChainId
  ): Promise<TokenBalance>;

  /**
   * Format a token amount from raw BigInt to human-readable string
   * @param rawAmount - Raw amount in smallest unit (wei, etc.)
   * @param decimals - Number of decimals for the token
   * @returns Formatted amount as string (e.g., '1000.50')
   */
  formatTokenAmount(rawAmount: bigint, decimals: number): string;

  /**
   * Parse a human-readable token amount to raw BigInt
   * @param formattedAmount - Human-readable amount (e.g., '1000.50')
   * @param decimals - Number of decimals for the token
   * @returns Raw amount as BigInt
   */
  parseTokenAmount(formattedAmount: string, decimals: number): bigint;

  /**
   * Get token information by contract address
   * @param tokenAddress - Contract address of the token
   * @param chainId - Chain ID the token is on
   * @returns Token information or null if not found
   */
  getTokenInfo(
    tokenAddress: `0x${string}`,
    chainId: ChainId
  ): Promise<Token | null>;
}

/**
 * Create a token service instance
 * Factory function that creates a TokenService implementation
 * 
 * @param web3Client - Web3 client to use for blockchain operations
 * @returns A TokenService instance
 * 
 * @todo Implement concrete token service with viem-based operations
 */
export function createTokenService(_web3Client: Web3Client): TokenService {
  // Stub implementation - all methods throw NotImplementedError
  const stubService: TokenService = {
    async fetchTokenBalances(): Promise<TokenBalance[]> {
      throw new Error(
        'TokenService.fetchTokenBalances: Not implemented in Step 1'
      );
    },

    async fetchTokenBalance(): Promise<TokenBalance | null> {
      throw new Error(
        'TokenService.fetchTokenBalance: Not implemented in Step 1'
      );
    },

    async fetchNativeBalance(): Promise<TokenBalance> {
      throw new Error(
        'TokenService.fetchNativeBalance: Not implemented in Step 1'
      );
    },

    formatTokenAmount(rawAmount: bigint, decimals: number): string {
      // Simple implementation for formatting - can be used in Step 1 for display purposes
      const divisor = BigInt(10 ** decimals);
      const wholePart = rawAmount / divisor;
      const fractionalPart = rawAmount % divisor;

      if (fractionalPart === BigInt(0)) {
        return wholePart.toString();
      }

      const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
      const trimmedFractional = fractionalStr.replace(/0+$/, '');
      return trimmedFractional
        ? `${wholePart}.${trimmedFractional}`
        : wholePart.toString();
    },

    parseTokenAmount(formattedAmount: string, decimals: number): bigint {
      // Simple implementation for parsing - can be used in Step 1
      const parts = formattedAmount.split('.');
      const wholePart = parts[0] || '0';
      const fractionalPart = parts[1]?.padEnd(decimals, '0').slice(0, decimals) || '0';

      const wholeBigInt = BigInt(wholePart) * BigInt(10 ** decimals);
      const fractionalBigInt = BigInt(fractionalPart);

      return wholeBigInt + fractionalBigInt;
    },

    async getTokenInfo(): Promise<Token | null> {
      throw new Error(
        'TokenService.getTokenInfo: Not implemented in Step 1'
      );
    },
  };

  return stubService;
}
