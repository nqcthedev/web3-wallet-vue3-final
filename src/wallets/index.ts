/**
 * Wallet adapter registry
 * Central registry of available wallet adapters
 */

import type { WalletAdapter } from './WalletAdapter';
import type { WalletType } from '@/domain/wallet';
import { InjectedAdapter } from './InjectedAdapter';
import { WalletConnectAdapter } from './WalletConnectAdapter';
import type { WalletConnectAdapterConfig } from './WalletConnectAdapter';
import { SUPPORTED_CHAINS } from '@/domain/chain';

/**
 * Registry of wallet adapters
 * Keyed by wallet type for easy lookup
 */
export const walletAdapters = new Map<WalletType, WalletAdapter[]>();

/**
 * Registry keyed by adapter ID for direct lookup
 */
export const adaptersById = new Map<string, WalletAdapter>();

/**
 * Initialize the wallet adapter registry
 * Creates default adapters and registers them
 * 
 * @param walletConnectConfig - Optional configuration for WalletConnect adapter
 *                              If not provided, WalletConnect adapter won't be registered
 */
export function initializeWalletAdapters(
  walletConnectConfig?: WalletConnectAdapterConfig
): void {
  // Clear existing adapters
  walletAdapters.clear();
  adaptersById.clear();

  // Register injected wallet adapters
  const injectedAdapters: WalletAdapter[] = [
    new InjectedAdapter({
      providerName: 'metamask',
      walletName: 'MetaMask',
      icon: 'metamask',
    }),
    new InjectedAdapter({
      providerName: 'brave',
      walletName: 'Brave Wallet',
      icon: 'brave',
    }),
    new InjectedAdapter({
      providerName: 'coinbase',
      walletName: 'Coinbase Wallet',
      icon: 'coinbase',
    }),
  ];

  // Register WalletConnect adapter if config provided
  if (walletConnectConfig) {
    const walletConnectAdapter = new WalletConnectAdapter(walletConnectConfig);
    walletAdapters.set(walletConnectAdapter.type, [walletConnectAdapter]);
    adaptersById.set(walletConnectAdapter.id, walletConnectAdapter);
  }

  // Register all injected adapters
  for (const adapter of injectedAdapters) {
    const existing = walletAdapters.get(adapter.type) || [];
    existing.push(adapter);
    walletAdapters.set(adapter.type, existing);
    adaptersById.set(adapter.id, adapter);
  }
}

/**
 * Get all adapters of a specific type
 */
export function getAdaptersByType(type: WalletType): WalletAdapter[] {
  return walletAdapters.get(type) || [];
}

/**
 * Get an adapter by its ID
 */
export function getAdapterById(id: string): WalletAdapter | undefined {
  return adaptersById.get(id);
}

/**
 * Get all available adapters (that are currently available)
 */
export function getAvailableAdapters(): WalletAdapter[] {
  const all: WalletAdapter[] = [];
  for (const adapters of walletAdapters.values()) {
    all.push(...adapters);
  }
  return all.filter((adapter) => adapter.isAvailable());
}

/**
 * Get all registered adapters (regardless of availability)
 */
export function getAllAdapters(): WalletAdapter[] {
  const all: WalletAdapter[] = [];
  for (const adapters of walletAdapters.values()) {
    all.push(...adapters);
  }
  return all;
}

// Export adapter types and classes
export type { WalletAdapter } from './WalletAdapter';
export { InjectedAdapter } from './InjectedAdapter';
export { WalletConnectAdapter } from './WalletConnectAdapter';
export type { InjectedAdapterConfig } from './InjectedAdapter';
export type { WalletConnectAdapterConfig } from './WalletConnectAdapter';
