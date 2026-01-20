/**
 * Domain-level error types
 * Pure domain models - no framework imports
 * Uses discriminated unions for type-safe error handling
 */

/**
 * Base error interface
 */
interface BaseError {
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Optional cause/original error */
  cause?: unknown;
}

/**
 * Wallet-related errors
 */
export interface WalletError extends BaseError {
  type: 'WALLET_ERROR';
  code:
    | 'WALLET_NOT_FOUND'
    | 'WALLET_NOT_INSTALLED'
    | 'WALLET_CONNECTION_FAILED'
    | 'WALLET_DISCONNECTION_FAILED'
    | 'WALLET_ALREADY_CONNECTED'
    | 'WALLET_NOT_CONNECTED'
    | 'WALLET_SWITCH_CHAIN_FAILED'
    | 'WALLET_ACCOUNTS_NOT_AVAILABLE'
    | 'WALLET_UNKNOWN_ERROR';
}

/**
 * Network/chain-related errors
 */
export interface NetworkError extends BaseError {
  type: 'NETWORK_ERROR';
  code:
    | 'UNSUPPORTED_CHAIN'
    | 'CHAIN_SWITCH_FAILED'
    | 'CHAIN_NOT_AVAILABLE'
    | 'NETWORK_RPC_ERROR'
    | 'NETWORK_TIMEOUT'
    | 'NETWORK_UNKNOWN_ERROR';
  /** Chain ID related to this error (if applicable) */
  chainId?: number;
}

/**
 * User rejection errors (user cancelled operation)
 */
export interface UserRejectedError extends BaseError {
  type: 'USER_REJECTED';
  code: 'USER_REJECTED_REQUEST' | 'USER_REJECTED_TRANSACTION' | 'USER_REJECTED_MESSAGE';
  /** Context of what was rejected */
  context?: string;
}

/**
 * RPC-related errors
 */
export interface RpcError extends BaseError {
  type: 'RPC_ERROR';
  code:
    | 'RPC_REQUEST_FAILED'
    | 'RPC_INVALID_RESPONSE'
    | 'RPC_TIMEOUT'
    | 'RPC_RATE_LIMITED'
    | 'RPC_NETWORK_ERROR'
    | 'RPC_UNKNOWN_ERROR';
  /** HTTP status code (if applicable) */
  statusCode?: number;
  /** RPC method that failed */
  method?: string;
}

/**
 * Transaction-related errors
 */
export interface TransactionError extends BaseError {
  type: 'TRANSACTION_ERROR';
  code:
    | 'TRANSACTION_FAILED'
    | 'TRANSACTION_REVERTED'
    | 'TRANSACTION_INSUFFICIENT_GAS'
    | 'TRANSACTION_INVALID_NONCE'
    | 'TRANSACTION_UNKNOWN_ERROR';
  /** Transaction hash (if available) */
  txHash?: string;
}

/**
 * Discriminated union of all domain errors
 */
export type DomainError =
  | WalletError
  | NetworkError
  | UserRejectedError
  | RpcError
  | TransactionError;

/**
 * Type guard to check if an error is a WalletError
 */
export function isWalletError(error: unknown): error is WalletError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'WALLET_ERROR'
  );
}

/**
 * Type guard to check if an error is a NetworkError
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'NETWORK_ERROR'
  );
}

/**
 * Type guard to check if an error is a UserRejectedError
 */
export function isUserRejectedError(error: unknown): error is UserRejectedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'USER_REJECTED'
  );
}

/**
 * Type guard to check if an error is an RpcError
 */
export function isRpcError(error: unknown): error is RpcError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'RPC_ERROR'
  );
}

/**
 * Type guard to check if an error is a TransactionError
 */
export function isTransactionError(error: unknown): error is TransactionError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'TRANSACTION_ERROR'
  );
}

/**
 * Helper to create a WalletError
 */
export function createWalletError(
  code: WalletError['code'],
  message: string,
  cause?: unknown
): WalletError {
  return {
    type: 'WALLET_ERROR',
    code,
    message,
    cause,
  };
}

/**
 * Helper to create a NetworkError
 */
export function createNetworkError(
  code: NetworkError['code'],
  message: string,
  chainId?: number,
  cause?: unknown
): NetworkError {
  return {
    type: 'NETWORK_ERROR',
    code,
    message,
    chainId,
    cause,
  };
}

/**
 * Helper to create a UserRejectedError
 */
export function createUserRejectedError(
  code: UserRejectedError['code'],
  message: string,
  context?: string,
  cause?: unknown
): UserRejectedError {
  return {
    type: 'USER_REJECTED',
    code,
    message,
    context,
    cause,
  };
}

/**
 * Helper to create an RpcError
 */
export function createRpcError(
  code: RpcError['code'],
  message: string,
  method?: string,
  statusCode?: number,
  cause?: unknown
): RpcError {
  return {
    type: 'RPC_ERROR',
    code,
    message,
    method,
    statusCode,
    cause,
  };
}

/**
 * Helper to create a TransactionError
 */
export function createTransactionError(
  code: TransactionError['code'],
  message: string,
  txHash?: string,
  cause?: unknown
): TransactionError {
  return {
    type: 'TRANSACTION_ERROR',
    code,
    message,
    txHash,
    cause,
  };
}
