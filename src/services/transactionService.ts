/**
 * Transaction service layer
 * Provides transaction-related operations such as gas estimation and transaction sending
 * This is a shell implementation - concrete transaction operations will be implemented later
 */

import type { Web3Client } from './web3Client';

/**
 * Transaction request parameters
 */
export interface TransactionRequest {
  /** Recipient address */
  to: `0x${string}`;
  /** Amount to send (in wei) */
  value?: bigint;
  /** Transaction data (for contract calls) */
  data?: `0x${string}`;
  /** Gas limit (if specified) */
  gas?: bigint;
  /** Gas price (if specified) */
  gasPrice?: bigint;
  /** Max fee per gas (EIP-1559) */
  maxFeePerGas?: bigint;
  /** Max priority fee per gas (EIP-1559) */
  maxPriorityFeePerGas?: bigint;
  /** Nonce (if specified) */
  nonce?: number;
}

/**
 * Gas estimation result
 */
export interface GasEstimate {
  /** Estimated gas amount */
  gasLimit: bigint;
  /** Estimated gas price (if applicable) */
  gasPrice?: bigint;
  /** Estimated max fee per gas (EIP-1559) */
  maxFeePerGas?: bigint;
  /** Estimated max priority fee per gas (EIP-1559) */
  maxPriorityFeePerGas?: bigint;
  /** Estimated total cost (gas * gasPrice) */
  estimatedCost: bigint;
}

/**
 * Transaction simulation result
 */
export interface TransactionSimulation {
  /** Whether the transaction would succeed */
  success: boolean;
  /** Error message if the transaction would fail */
  error?: string;
  /** Return value from the transaction (if applicable) */
  returnValue?: unknown;
  /** Estimated gas used */
  gasUsed?: bigint;
}

/**
 * Sent transaction information
 */
export interface SentTransaction {
  /** Transaction hash */
  hash: `0x${string}`;
  /** Block number the transaction was included in (null if pending) */
  blockNumber: bigint | null;
  /** Transaction status */
  status: 'pending' | 'success' | 'failed' | 'reverted';
  /** Gas used (if mined) */
  gasUsed?: bigint;
}

/**
 * Transaction service interface
 * Defines methods for transaction operations
 */
export interface TransactionService {
  /**
   * Estimate gas for a transaction
   * @param request - Transaction request parameters
   * @param from - Sender address
   * @returns Gas estimation result
   * @throws DomainError if estimation fails
   */
  estimateGas(
    request: TransactionRequest,
    from: `0x${string}`
  ): Promise<GasEstimate>;

  /**
   * Simulate a transaction without sending it
   * Useful for checking if a transaction would succeed and what it would return
   * @param request - Transaction request parameters
   * @param from - Sender address
   * @returns Simulation result
   * @throws DomainError if simulation fails
   */
  simulateTransaction(
    request: TransactionRequest,
    from: `0x${string}`
  ): Promise<TransactionSimulation>;

  /**
   * Send a transaction
   * @param request - Transaction request parameters
   * @param from - Sender address
   * @returns Sent transaction information
   * @throws DomainError (specifically TransactionError) if sending fails
   */
  sendTransaction(
    request: TransactionRequest,
    from: `0x${string}`
  ): Promise<SentTransaction>;

  /**
   * Wait for a transaction to be mined
   * @param txHash - Transaction hash to wait for
   * @param confirmations - Number of confirmations to wait for (default: 1)
   * @param timeout - Timeout in milliseconds (default: 120000)
   * @returns Final transaction information
   * @throws DomainError if waiting fails or times out
   */
  waitForTransaction(
    txHash: `0x${string}`,
    confirmations?: number,
    timeout?: number
  ): Promise<SentTransaction>;

  /**
   * Get transaction receipt
   * @param txHash - Transaction hash
   * @returns Transaction receipt or null if not found
   * @throws DomainError if the query fails
   */
  getTransactionReceipt(
    txHash: `0x${string}`
  ): Promise<SentTransaction | null>;
}

/**
 * Create a transaction service instance
 * Factory function that creates a TransactionService implementation
 * 
 * @param web3Client - Web3 client to use for blockchain operations
 * @returns A TransactionService instance
 * 
 * @todo Implement concrete transaction service with viem-based operations
 */
export function createTransactionService(
  _web3Client: Web3Client
): TransactionService {
  // Stub implementation - all methods throw NotImplementedError
  const stubService: TransactionService = {
    async estimateGas(): Promise<GasEstimate> {
      throw new Error(
        'TransactionService.estimateGas: Not implemented in Step 1'
      );
    },

    async simulateTransaction(): Promise<TransactionSimulation> {
      throw new Error(
        'TransactionService.simulateTransaction: Not implemented in Step 1'
      );
    },

    async sendTransaction(): Promise<SentTransaction> {
      throw new Error(
        'TransactionService.sendTransaction: Not implemented in Step 1'
      );
    },

    async waitForTransaction(): Promise<SentTransaction> {
      throw new Error(
        'TransactionService.waitForTransaction: Not implemented in Step 1'
      );
    },

    async getTransactionReceipt(): Promise<SentTransaction | null> {
      throw new Error(
        'TransactionService.getTransactionReceipt: Not implemented in Step 1'
      );
    },
  };

  return stubService;
}
