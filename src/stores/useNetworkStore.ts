import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ChainId = string

export interface Chain {
  id: ChainId
  name: string
  rpcUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrl?: string
}

export const useNetworkStore = defineStore('network', () => {
  // State
  const currentChain = ref<Chain | null>({
    id: '1',
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.io',
  })
  const supportedChains = ref<Chain[]>([
    {
      id: '1',
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrl: 'https://etherscan.io',
    },
    {
      id: '5',
      name: 'Goerli Testnet',
      rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/demo',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrl: 'https://goerli.etherscan.io',
    },
  ])
  const isSyncing = ref(false)

  // Getters
  const isSupportedChain = computed(() => {
    if (!currentChain.value) return false
    return supportedChains.value.some((chain) => chain.id === currentChain.value?.id)
  })

  const chainLabel = computed(() => {
    return currentChain.value?.name || 'Unknown Network'
  })

  // Actions
  function setChain(chainId: ChainId) {
    // TODO: Implement in later steps
    const chain = supportedChains.value.find((c) => c.id === chainId)
    if (chain) {
      currentChain.value = chain
    }
  }

  function autoDetectChain() {
    // TODO: Implement in later steps
    throw new Error('Not implemented in Step 1')
  }

  function handleChainChanged(chainId: ChainId) {
    // TODO: Implement in later steps
    throw new Error('Not implemented in Step 1')
  }

  return {
    // State
    currentChain,
    supportedChains,
    isSyncing,
    // Getters
    isSupportedChain,
    chainLabel,
    // Actions
    setChain,
    autoDetectChain,
    handleChainChanged,
  }
})
