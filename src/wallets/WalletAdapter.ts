/**
 * Core wallet adapter interface
 * Wallet-agnostic interface that all wallet implementations must follow
 * Uses domain types - no framework imports
 */

import type { WalletAccount, WalletType, WalletMetadata } from '@/domain/wallet';
import type { ChainId } from '@/domain/chain';

/**
 * Event handler types for wallet adapter lifecycle events
 */
export type AccountsChangedHandler = (accounts: WalletAccount[]) => void;
export type ChainChangedHandler = (chainId: ChainId) => void;
export type DisconnectHandler = (error?: Error) => void;

/**
 * Core wallet adapter interface
 * All wallet implementations (injected, WalletConnect, etc.) must implement this interface
 */
export interface WalletAdapter {
  /**
   * Unique identifier for this adapter
   */
  readonly id: string;

  /**
   * Human-readable name of the wallet
   */
  readonly name: string;

  /**
   * Type of wallet this adapter handles
   */
  readonly type: WalletType;

  /**
   * Wallet metadata (icon, support flags, etc.)
   */
  readonly metadata: WalletMetadata;

  /**
   * Whether this wallet is currently available (e.g., injected wallet detected)
   */
  isAvailable(): boolean;

  /**
   * Connect to the wallet and return the accounts
   * @throws {DomainError} If connection fails
   */
  connect(): Promise<WalletAccount[]>;

  /**
   * Disconnect from the wallet
   * @throws {DomainError} If disconnection fails
   */
  disconnect(): Promise<void>;

  /**
   * Get currently connected accounts
   * @returns Array of connected accounts, empty if not connected
   */
  getAccounts(): Promise<WalletAccount[]>;

  /**
   * Switch the wallet to a different chain
   * @param chainId - The target chain ID
   * @throws {DomainError} If chain switch fails
   */
  switchChain(chainId: ChainId): Promise<void>;

  /**
   * Register a handler for account change events
   * @param handler - Function to call when accounts change
   */
  onAccountsChanged(handler: AccountsChangedHandler): void;

  /**
   * Register a handler for chain change events
   * @param handler - Function to call when the chain changes
   */
  onChainChanged(handler: ChainChangedHandler): void;

  /**
   * Register a handler for disconnect events
   * @param handler - Function to call when the wallet disconnects
   */
  onDisconnect(handler: DisconnectHandler): void;

  /**
   * Remove all event handlers
   */
  removeAllListeners(): void;
}
