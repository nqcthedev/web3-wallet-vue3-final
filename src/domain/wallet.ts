/**
 * Wallet domain types and enums
 * Pure domain models - no framework imports
 */

/**
 * Supported wallet types
 */
export enum WalletType {
  INJECTED = 'INJECTED',
  WALLET_CONNECT = 'WALLET_CONNECT',
  LEDGER = 'LEDGER',
  COINBASE = 'COINBASE',
  RAINBOW = 'RAINBOW',
}

/**
 * Wallet connection state
 */
export enum WalletConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}

/**
 * Wallet account information
 */
export interface WalletAccount {
  /** Ethereum address (hex string, e.g., '0x...') */
  address: string;
  /** Optional label/name for the account */
  label?: string;
  /** Type of wallet this account belongs to */
  type: WalletType;
  /** Chain ID this account is currently on */
  chainId?: number;
}

/**
 * Wallet metadata/adapter information
 */
export interface WalletMetadata {
  /** Unique identifier for the wallet adapter */
  id: string;
  /** Human-readable name */
  name: string;
  /** Wallet type */
  type: WalletType;
  /** Whether this wallet supports mobile devices */
  supportsMobile: boolean;
  /** Whether this wallet supports WalletConnect protocol */
  supportsWalletConnect: boolean;
  /** Icon URL or identifier for the wallet */
  icon?: string;
}
