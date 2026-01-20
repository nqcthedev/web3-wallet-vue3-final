/**
 * Injected wallet adapter (MetaMask, Brave Wallet, etc.)
 * Stub implementation for Step 1 - all methods throw NotImplementedError
 */

import type { WalletAdapter, AccountsChangedHandler, ChainChangedHandler, DisconnectHandler } from './WalletAdapter';
import type { WalletAccount } from '@/domain/wallet';
import type { ChainId } from '@/domain/chain';
import { WalletType } from '@/domain/wallet';
import { createWalletError } from '@/domain/errors';

/**
 * Configuration for the injected wallet adapter
 */
export interface InjectedAdapterConfig {
  /** Provider name (e.g., 'metamask', 'brave') */
  providerName: string;
  /** Wallet name to display */
  walletName: string;
  /** Icon URL or identifier */
  icon?: string;
}

/**
 * Injected wallet adapter implementation
 * Handles wallets that inject themselves into window.ethereum
 */
export class InjectedAdapter implements WalletAdapter {
  readonly id: string;
  readonly name: string;
  readonly type = WalletType.INJECTED;
  readonly metadata;

  private config: InjectedAdapterConfig;
  private accountsChangedHandlers: AccountsChangedHandler[] = [];
  private chainChangedHandlers: ChainChangedHandler[] = [];
  private disconnectHandlers: DisconnectHandler[] = [];

  constructor(config: InjectedAdapterConfig) {
    this.config = config;
    this.id = `injected-${config.providerName.toLowerCase()}`;
    this.name = config.walletName;
    this.metadata = {
      id: this.id,
      name: this.name,
      type: this.type,
      supportsMobile: false,
      supportsWalletConnect: false,
      icon: config.icon,
    };
  }

  isAvailable(): boolean {
    // TODO: Check if window.ethereum is available and matches provider
    return false;
  }

  async connect(): Promise<WalletAccount[]> {
    throw new Error('Not implemented in Step 1');
  }

  async disconnect(): Promise<void> {
    throw new Error('Not implemented in Step 1');
  }

  async getAccounts(): Promise<WalletAccount[]> {
    throw new Error('Not implemented in Step 1');
  }

  async switchChain(chainId: ChainId): Promise<void> {
    throw new Error('Not implemented in Step 1');
  }

  onAccountsChanged(handler: AccountsChangedHandler): void {
    this.accountsChangedHandlers.push(handler);
  }

  onChainChanged(handler: ChainChangedHandler): void {
    this.chainChangedHandlers.push(handler);
  }

  onDisconnect(handler: DisconnectHandler): void {
    this.disconnectHandlers.push(handler);
  }

  removeAllListeners(): void {
    this.accountsChangedHandlers = [];
    this.chainChangedHandlers = [];
    this.disconnectHandlers = [];
  }
}
