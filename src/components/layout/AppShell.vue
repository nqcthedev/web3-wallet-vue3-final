<script setup lang="ts">
import { RouterView } from 'vue-router'
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import { useNetworkStore } from '@/stores/useNetworkStore'

const networkStore = useNetworkStore()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold">Multi-Wallet Vue3</h1>
          <StatusBadge />
        </div>
        <div class="flex items-center gap-4">
          <ConnectWalletButton />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>

    <!-- Footer/Status Area -->
    <footer class="border-t bg-muted/50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <div class="flex items-center gap-4">
            <span>Network: {{ networkStore.chainLabel }}</span>
          </div>
          <div>
            <span>Step 1 - UI Shell (Placeholder)</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
