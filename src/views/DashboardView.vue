<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/useWalletStore'
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton.vue'
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/card-header.vue'
import CardTitle from '@/components/ui/card-title.vue'
import CardDescription from '@/components/ui/card-description.vue'
import CardContent from '@/components/ui/card-content.vue'

const walletStore = useWalletStore()

const addressDisplay = computed(() => {
  if (walletStore.currentAddress) {
    const addr = walletStore.currentAddress
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }
  return 'Not connected'
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p class="text-muted-foreground mt-2">
        Manage your wallet connection, view balances, and send transfers
      </p>
    </div>

    <!-- Connection Section -->
    <Card>
      <CardHeader>
        <CardTitle>Wallet Connection</CardTitle>
        <CardDescription>
          Connect your wallet to interact with the application
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">Status</p>
            <p class="text-sm text-muted-foreground">{{ addressDisplay }}</p>
          </div>
          <ConnectWalletButton />
        </div>
      </CardContent>
    </Card>

    <!-- Balances Section -->
    <Card>
      <CardHeader>
        <CardTitle>Token Balances</CardTitle>
        <CardDescription>
          Your token balances will appear here once connected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div
            v-if="!walletStore.isConnected"
            class="flex items-center justify-center py-8 text-muted-foreground"
          >
            Connect your wallet to view balances
          </div>
          <div
            v-else
            class="space-y-2"
          >
            <div class="flex items-center justify-between py-2 border-b">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div>
                  <div class="h-4 w-20 bg-muted animate-pulse rounded mb-1" />
                  <div class="h-3 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div class="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div class="flex items-center justify-between py-2 border-b">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div>
                  <div class="h-4 w-20 bg-muted animate-pulse rounded mb-1" />
                  <div class="h-3 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div class="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Transfers Section -->
    <Card>
      <CardHeader>
        <CardTitle>Send Transfer</CardTitle>
        <CardDescription>
          Transfer tokens to another address (coming soon)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4 py-4">
          <div class="h-10 w-full bg-muted animate-pulse rounded" />
          <div class="h-10 w-full bg-muted animate-pulse rounded" />
          <div class="h-10 w-full bg-muted animate-pulse rounded" />
          <div class="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
