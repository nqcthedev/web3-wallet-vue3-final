<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/useWalletStore'
import { useNetworkStore } from '@/stores/useNetworkStore'
import { cn } from '@/lib/utils'

const walletStore = useWalletStore()
const networkStore = useNetworkStore()

const statusText = computed(() => {
  if (walletStore.isConnected) {
    return `Connected - ${networkStore.chainLabel}`
  }
  return 'Disconnected'
})

const statusVariant = computed(() => {
  if (walletStore.isConnected) {
    return 'success'
  }
  return 'default'
})

const badgeClasses = computed(() => {
  return cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
    {
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
        statusVariant.value === 'success',
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200':
        statusVariant.value === 'default',
    }
  )
})
</script>

<template>
  <span :class="badgeClasses">
    {{ statusText }}
  </span>
</template>
