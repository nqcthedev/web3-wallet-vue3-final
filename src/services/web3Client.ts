/**
 * Web3 client abstraction layer
 * Provides a viem-oriented interface for Web3 operations
 * This is a shell implementation - concrete viem client creation will be implemented later
 */

import type { Chain as ViemChain, Transport } from 'viem';
import type { Chain } from '@/domain/chain';

/**
 * Configuration for creating a Web3 client
 * References viem concepts without fully instantiating a client yet
 */
export interface Web3ClientConfig {
  /** Transport layer for RPC communication */
  transport: Transport;
  /** Chain configuration */
  chain: ViemChain | Chain;
  /** Optional account to use for the client */
  account?: `0x${string}`;
}

/**
 * Web3 client interface
 * Abstract interface that will be implemented by a concrete viem-based client
 */
export interface Web3Client {
  /**
   * Get the current chain configuration
   */
  getChain(): Chain | ViemChain;

  /**
   * Get the balance of an address
   * @param address - Ethereum address to query
   * @returns Balance in wei (as bigint)
   */
  getBalance(address: `0x${string}`): Promise<bigint>;

  /**
   * Get the current block number
   * @returns Current block number
   */
  getBlockNumber(): Promise<bigint>;

  /**
   * Read data from a smart contract
   * @param contractAddress - Address of the contract
   * @param abi - Contract ABI
   * @param functionName - Name of the function to call
   * @param args - Arguments to pass to the function
   * @returns Result of the contract call
   */
  readContract<T = unknown>(params: {
    address: `0x${string}`;
    abi: readonly unknown[];
    functionName: string;
    args?: readonly unknown[];
  }): Promise<T>;

  /**
   * Write/interact with a smart contract (sends a transaction)
   * @param contractAddress - Address of the contract
   * @param abi - Contract ABI
   * @param functionName - Name of the function to call
   * @param args - Arguments to pass to the function
   * @returns Transaction hash
   */
  writeContract(params: {
    address: `0x${string}`;
    abi: readonly unknown[];
    functionName: string;
    args?: readonly unknown[];
    value?: bigint;
  }): Promise<`0x${string}`>;

  /**
   * Estimate gas for a transaction
   * @param params - Transaction parameters
   * @returns Estimated gas amount
   */
  estimateGas(params: {
    to?: `0x${string}`;
    value?: bigint;
    data?: `0x${string}`;
    account?: `0x${string}`;
  }): Promise<bigint>;

  /**
   * Send a raw transaction
   * @param params - Transaction parameters
   * @returns Transaction hash
   */
  sendTransaction(params: {
    to: `0x${string}`;
    value?: bigint;
    data?: `0x${string}`;
    gas?: bigint;
    gasPrice?: bigint;
    account: `0x${string}`;
  }): Promise<`0x${string}`>;
}

/**
 * Create a Web3 client instance
 * Factory function that will create a viem-based client
 * 
 * @param config - Configuration for the Web3 client
 * @returns A Web3Client instance
 * @throws DomainError if client creation fails
 * 
 * @todo Implement concrete viem client creation
 */
export function createWeb3Client(_config: Web3ClientConfig): Web3Client {
  // TODO: Implement concrete viem client creation
  throw new Error(
    'createWeb3Client: Not implemented in Step 1. This will be implemented with a concrete viem client in a later step.'
  );
}
