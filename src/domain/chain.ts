/**
 * Chain/Network domain types
 * Pure domain models - no framework imports
 */

import type { Chain as ViemChain } from 'viem';

/**
 * Chain ID type - numeric identifier for EVM chains
 */
export type ChainId = number;

/**
 * Native currency information for a chain
 */
export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

/**
 * Chain configuration
 * Extends viem's Chain type for compatibility
 */
export interface Chain {
  /** Chain ID (e.g., 1 for Ethereum mainnet) */
  id: ChainId;
  /** Human-readable chain name */
  name: string;
  /** Network identifier (e.g., 'homestead', 'sepolia') */
  network: string;
  /** RPC endpoint URLs (array for redundancy) */
  rpcUrls: {
    default: {
      http: string[];
    };
    public?: {
      http: string[];
    };
  };
  /** Native currency (ETH, BNB, etc.) */
  nativeCurrency: NativeCurrency;
  /** Block explorer URLs */
  blockExplorers?: {
    default: {
      name: string;
      url: string;
    };
  };
  /** Whether this is a testnet */
  testnet?: boolean;
}

/**
 * Supported EVM chains
 * Minimal set of chains for initial implementation
 */
export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 1,
    name: 'Ethereum',
    network: 'homestead',
    rpcUrls: {
      default: {
        http: ['https://eth.llamarpc.com'],
      },
      public: {
        http: ['https://eth.llamarpc.com'],
      },
    },
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorers: {
      default: {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    },
    testnet: false,
  },
  {
    id: 11155111,
    name: 'Sepolia',
    network: 'sepolia',
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia.org'],
      },
      public: {
        http: ['https://rpc.sepolia.org'],
      },
    },
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorers: {
      default: {
        name: 'Etherscan',
        url: 'https://sepolia.etherscan.io',
      },
    },
    testnet: true,
  },
];

/**
 * Helper to get a chain by ID
 */
export function getChainById(chainId: ChainId): Chain | undefined {
  return SUPPORTED_CHAINS.find((chain) => chain.id === chainId);
}

/**
 * Helper to check if a chain ID is supported
 */
export function isSupportedChain(chainId: ChainId): boolean {
  return SUPPORTED_CHAINS.some((chain) => chain.id === chainId);
}
