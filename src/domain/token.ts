/**
 * Token domain types
 * Pure domain models - no framework imports
 */

/**
 * Token standard type
 */
export type TokenStandard = 'ERC20' | 'ERC721' | 'ERC1155';

/**
 * Token information
 */
export interface Token {
  /** Token contract address */
  address: string;
  /** Token symbol (e.g., 'USDC', 'DAI') */
  symbol: string;
  /** Token name (e.g., 'USD Coin') */
  name: string;
  /** Number of decimals */
  decimals: number;
  /** Token standard */
  standard: TokenStandard;
  /** Chain ID this token exists on */
  chainId: number;
  /** Optional logo/icon URL */
  logoURI?: string;
}

/**
 * Token balance information
 */
export interface TokenBalance {
  /** The token this balance is for */
  token: Token;
  /** Raw balance as BigInt (in smallest unit, e.g., wei for ETH) */
  rawBalance: bigint;
  /** Formatted balance as string (human-readable, e.g., '1000.50') */
  formattedBalance: string;
  /** USD value (if available from price feed) */
  usdValue?: number;
  /** Last time this balance was updated */
  lastUpdated?: Date;
}

/**
 * Common ERC-20 token symbols
 */
export const COMMON_TOKEN_SYMBOLS = {
  ETH: 'ETH',
  USDC: 'USDC',
  USDT: 'USDT',
  DAI: 'DAI',
  WBTC: 'WBTC',
  WETH: 'WETH',
} as const;

/**
 * Type for common token symbols
 */
export type CommonTokenSymbol = (typeof COMMON_TOKEN_SYMBOLS)[keyof typeof COMMON_TOKEN_SYMBOLS];
