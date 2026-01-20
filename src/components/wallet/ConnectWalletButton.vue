<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore, type WalletConnectionState } from '@/stores/useWalletStore'
import Button from '@/components/ui/button.vue'

const walletStore = useWalletStore()

const buttonText = computed(() => {
  const state = walletStore.connectionState
  if (state === 'connecting') {
    return 'Connecting...'
  }
  if (state === 'connected') {
    return 'Connected'
  }
  return 'Connect Wallet'
})

const isDisabled = computed(() => {
  return walletStore.connectionState === 'connecting'
})

async function handleClick() {
  if (walletStore.isConnected) {
    walletStore.disconnect()
  } else {
    await walletStore.connect()
  }
}
</script>

<template>
  <Button :disabled="isDisabled" @click="handleClick">
    {{ buttonText }}
  </Button>
</template>
