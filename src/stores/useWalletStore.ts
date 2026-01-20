import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type WalletConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error'

export const useWalletStore = defineStore('wallet', () => {
  // State
  const currentWalletAdapterKey = ref<string | null>(null)
  const connectionState = ref<WalletConnectionState>('disconnected')
  const selectedAccount = ref<string | null>(null)
  const availableAccounts = ref<string[]>([])

  // Getters
  const isConnected = computed(() => connectionState.value === 'connected')
  const currentAddress = computed(() => selectedAccount.value)
  const currentWalletType = computed(() => currentWalletAdapterKey.value)

  // Actions
  async function connect() {
    // TODO: Implement in later steps
    console.log('Connect wallet - TODO: implement')
    connectionState.value = 'connecting'
    // Simulate connection for UI testing
    setTimeout(() => {
      connectionState.value = 'connected'
      selectedAccount.value = '0x0000000000000000000000000000000000000000'
      availableAccounts.value = [selectedAccount.value]
    }, 1000)
  }

  function disconnect() {
    // TODO: Implement in later steps
    console.log('Disconnect wallet - TODO: implement')
    connectionState.value = 'disconnected'
    selectedAccount.value = null
    availableAccounts.value = []
    currentWalletAdapterKey.value = null
  }

  function switchAccount(account: string) {
    // TODO: Implement in later steps
    throw new Error('Not implemented in Step 1')
  }

  function restoreSession() {
    // TODO: Implement in later steps
    throw new Error('Not implemented in Step 1')
  }

  return {
    // State
    currentWalletAdapterKey,
    connectionState,
    selectedAccount,
    availableAccounts,
    // Getters
    isConnected,
    currentAddress,
    currentWalletType,
    // Actions
    connect,
    disconnect,
    switchAccount,
    restoreSession,
  }
})
