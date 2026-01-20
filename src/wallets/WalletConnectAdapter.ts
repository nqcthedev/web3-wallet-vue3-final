/**
 * WalletConnect (Reown) adapter
 * Stub implementation for Step 1 - all methods throw NotImplementedError
 */

import type { WalletAdapter, AccountsChangedHandler, ChainChangedHandler, DisconnectHandler } from './WalletAdapter';
import type { WalletAccount } from '@/domain/wallet';
import type { ChainId, Chain } from '@/domain/chain';
import { WalletType } from '@/domain/wallet';

/**
 * Configuration for WalletConnect adapter
 * Will later use Reown's Universal/AppKit connector
 */
export interface WalletConnectAdapterConfig {
  /** Reown project ID (from https://cloud.reown.com) */
  projectId: string;
  /** Supported chains */
  chains: Chain[];
  /** Whether to support mobile wallets */
  supportsMobile: boolean;
  /** Optional metadata for the dApp */
  metadata?: {
    name?: string;
    description?: string;
    url?: string;
    icons?: string[];
  };
}

/**
 * WalletConnect adapter implementation using Reown
 * Handles WalletConnect protocol connections (mobile wallets, desktop wallets, etc.)
 */
export class WalletConnectAdapter implements WalletAdapter {
  readonly id = 'walletconnect';
  readonly name = 'WalletConnect';
  readonly type = WalletType.WALLET_CONNECT;
  readonly metadata;

  private config: WalletConnectAdapterConfig;
  private accountsChangedHandlers: AccountsChangedHandler[] = [];
  private chainChangedHandlers: ChainChangedHandler[] = [];
  private disconnectHandlers: DisconnectHandler[] = [];

  constructor(config: WalletConnectAdapterConfig) {
    this.config = config;
    this.metadata = {
      id: this.id,
      name: this.name,
      type: this.type,
      supportsMobile: config.supportsMobile,
      supportsWalletConnect: true,
    };
  }

  isAvailable(): boolean {
    // TODO: Check if WalletConnect/Reown SDK is available
    return true; // WalletConnect is always available (web-based)
  }

  async connect(): Promise<WalletAccount[]> {
    // TODO: Initialize Reown Universal/AppKit connector
    // TODO: Create pairing URI or open modal
    // TODO: Wait for user approval
    // TODO: Return connected accounts
    throw new Error('Not implemented in Step 1');
  }

  async disconnect(): Promise<void> {
    // TODO: Disconnect from active session
    // TODO: Clear session storage
    throw new Error('Not implemented in Step 1');
  }

  async getAccounts(): Promise<WalletAccount[]> {
    // TODO: Get accounts from active session
    throw new Error('Not implemented in Step 1');
  }

  async switchChain(chainId: ChainId): Promise<void> {
    // TODO: Request chain switch via WalletConnect protocol
    throw new Error('Not implemented in Step 1');
  }

  onAccountsChanged(handler: AccountsChangedHandler): void {
    this.accountsChangedHandlers.push(handler);
    // TODO: Subscribe to WalletConnect session events
  }

  onChainChanged(handler: ChainChangedHandler): void {
    this.chainChangedHandlers.push(handler);
    // TODO: Subscribe to WalletConnect chain change events
  }

  onDisconnect(handler: DisconnectHandler): void {
    this.disconnectHandlers.push(handler);
    // TODO: Subscribe to WalletConnect disconnect events
  }

  removeAllListeners(): void {
    this.accountsChangedHandlers = [];
    this.chainChangedHandlers = [];
    this.disconnectHandlers = [];
    // TODO: Unsubscribe from WalletConnect events
  }
}
