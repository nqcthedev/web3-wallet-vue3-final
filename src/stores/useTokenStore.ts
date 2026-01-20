/**
 * Token store - manages token balances
 * Uses Pinia for state management
 */

import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { TokenBalance, Token } from '@/domain/token';
import type { ChainId } from '@/domain/chain';

/**
 * Token balance key: `${address}-${chainId}`
 */
type BalanceKey = string;

/**
 * Token store state interface
 */
interface TokenState {
  /** Map of balances by address and chain (key: `${address}-${chainId}`) */
  balances: Map<BalanceKey, TokenBalance[]>;
  /** Whether balances are currently being loaded */
  isLoadingBalances: boolean;
  /** Last time balances were updated */
  lastUpdated: Date | null;
  /** Error message if balance fetch failed */
  error: string | null;
}

/**
 * Token store
 */
export const useTokenStore = defineStore('token', () => {
  // State
  const balances: Ref<Map<BalanceKey, TokenBalance[]>> = ref(new Map());
  const isLoadingBalances: Ref<boolean> = ref(false);
  const lastUpdated: Ref<Date | null> = ref(null);
  const error: Ref<string | null> = ref(null);

  // Actions
  /**
   * Refresh token balances for an address on a specific chain
   * @param address - Wallet address to fetch balances for
   * @param chainId - Chain ID to fetch balances on
   * @param tokens - Optional list of specific tokens to fetch (if not provided, fetches all known tokens)
   */
  async function refreshBalances(
    address: string,
    chainId: ChainId,
    tokens?: Token[]
  ): Promise<void> {
    // TODO: Implement balance fetching logic using RPC calls in later steps
    throw new Error('Not implemented in Step 1');
  }

  /**
   * Clear all balances from the store
   */
  function clearBalances(): void {
    // TODO: Implement balance clearing logic in later steps
    balances.value.clear();
    lastUpdated.value = null;
    error.value = null;
  }

  /**
   * Clear balances for a specific address and chain
   * @param address - Wallet address
   * @param chainId - Chain ID
   */
  function clearBalancesForAddress(
    address: string,
    chainId: ChainId
  ): void {
    const key: BalanceKey = `${address}-${chainId}`;
    balances.value.delete(key);
  }

  /**
   * Get balances for a specific address and chain
   * @param address - Wallet address
   * @param chainId - Chain ID
   * @returns Array of token balances or empty array if not found
   */
  function getBalances(
    address: string,
    chainId: ChainId
  ): TokenBalance[] {
    const key: BalanceKey = `${address}-${chainId}`;
    return balances.value.get(key) ?? [];
  }

  return {
    // State
    balances,
    isLoadingBalances,
    lastUpdated,
    error,
    // Actions
    refreshBalances,
    clearBalances,
    clearBalancesForAddress,
    getBalances,
  };
});
