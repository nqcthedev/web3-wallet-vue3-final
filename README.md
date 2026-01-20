# Multi-Wallet Vue 3 Application

A Vue 3 + TypeScript application for managing multiple wallet connections (MetaMask, WalletConnect, etc.) with support for token balances and transfers.

## Architecture Overview

This application follows a **domain-driven, layered architecture** that separates concerns and prepares for Web3 integration:

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer                              │
│  (Views, Components, Layout)                            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 State Layer                              │
│  (Pinia Stores: Wallet, Network, Token)                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Service Layer                               │
│  (Web3Client, TokenService, TransactionService)         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Wallet Adapter Layer                          │
│  (InjectedAdapter, WalletConnectAdapter)                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              External Dependencies                      │
│  (viem, Reown/WalletConnect SDK, RPC Nodes)             │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure

```
src/
├── domain/          # Pure domain models (no framework imports)
│   ├── wallet.ts    # Wallet types, enums, interfaces
│   ├── chain.ts     # Chain/network types and constants
│   ├── token.ts     # Token and balance types
│   └── errors.ts    # Domain-level error types
│
├── stores/          # Pinia stores (state management)
│   ├── useWalletStore.ts    # Wallet connection state
│   ├── useNetworkStore.ts   # Network/chain state
│   └── useTokenStore.ts     # Token balance state
│
├── services/        # Stateless service modules
│   ├── web3Client.ts        # Web3 client abstraction (viem-based)
│   ├── tokenService.ts      # Token balance fetching logic
│   └── transactionService.ts # Transaction handling
│
├── wallets/         # Wallet adapter implementations
│   ├── WalletAdapter.ts     # Core adapter interface
│   ├── InjectedAdapter.ts   # MetaMask/injected wallet adapter
│   └── WalletConnectAdapter.ts # WalletConnect/Reown adapter
│
├── components/      # Reusable UI components
│   ├── layout/      # AppShell and layout components
│   ├── wallet/      # Wallet-specific UI (ConnectButton, etc.)
│   ├── common/      # Shared UI components (StatusBadge, etc.)
│   └── ui/          # shadcn/ui primitives (Button, Card, etc.)
│
├── views/           # Route-level views
│   └── DashboardView.vue    # Main dashboard
│
├── router/          # Vue Router configuration
│   └── index.ts
│
└── lib/             # Shared utilities and helpers
    └── utils.ts
```

## Technology Stack

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Async State**: TanStack Vue Query
- **Web3 Client**: viem
- **Styling**: Tailwind CSS v4 + shadcn/ui (Vue)
- **Code Quality**: ESLint + Prettier

## Step 1 Status: Architecture Skeleton

**Step 1** establishes the foundation and architecture but **does not include any real Web3 functionality**. All wallet connections, RPC calls, and blockchain interactions are stubbed out.

### ✅ What's Implemented

1. **Project Scaffolding**
   - Vite + Vue 3 + TypeScript setup
   - Tailwind CSS v4 configuration
   - ESLint + Prettier configuration
   - Path aliases (`@/` → `src/`)

2. **Domain Models** (`src/domain/`)
   - Wallet types: `WalletType`, `WalletConnectionState`, `WalletAccount`
   - Chain types: `Chain`, `ChainId`, `SUPPORTED_CHAINS` constants
   - Token types: `Token`, `TokenBalance`
   - Error types: Domain-level error interfaces

3. **Pinia Stores** (`src/stores/`)
   - `useWalletStore`: Wallet connection state, accounts, getters (`isConnected`, `currentAddress`)
   - `useNetworkStore`: Current chain, supported chains, chain switching stubs
   - `useTokenStore`: Balance map structure, loading states

4. **Service Layer Shells** (`src/services/`)
   - `web3Client.ts`: `Web3Client` interface and `createWeb3Client` factory (stub)
   - `tokenService.ts`: `TokenService` interface (stub)
   - `transactionService.ts`: `TransactionService` interface (stub)

5. **Wallet Adapter Interfaces** (`src/wallets/`)
   - `WalletAdapter` interface: Core adapter contract
   - `InjectedAdapter`: Stub implementation for injected wallets
   - `WalletConnectAdapter`: Stub for WalletConnect/Reown integration

6. **UI Components**
   - Basic routing setup with `DashboardView`
   - App shell structure (ready for layout components)
   - Component directories organized by domain

7. **App Bootstrap**
   - `main.ts`: Pinia, Vue Router, Vue Query registration
   - Router configuration with dashboard route

### ❌ What's NOT Implemented (Future Steps)

1. **Real Wallet Connections**
   - No actual MetaMask/injected wallet detection
   - No WalletConnect/Reown SDK integration
   - All `connect()`, `disconnect()`, `switchAccount()` actions throw errors

2. **Web3 RPC Calls**
   - No viem client instantiation
   - No balance fetching
   - No transaction sending
   - No contract interactions

3. **UI Components**
   - `AppShell` layout component not yet created
   - `ConnectWalletButton` component not yet created
   - `StatusBadge` component not yet created
   - Dashboard sections are placeholders

4. **State Persistence**
   - No localStorage/session restoration
   - No wallet session persistence

5. **Error Handling**
   - Error types defined but not used in real error flows

## Known Issues (Step 1)

The following TypeScript errors are **expected** in Step 1 as the code contains skeleton implementations with unused parameters and type-only imports used as values:

- Unused imports/variables in stub functions (e.g., `config`, `address`, `chainId` parameters)
- Enum usage with `import type` (should use regular imports for enums)
- Unused interface definitions in stores (kept for documentation)

These will be resolved as implementations are added in subsequent steps.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build

```bash
npm run build
```

### Linting & Formatting

```bash
npm run lint    # Run ESLint
npm run format  # Format code with Prettier
```

## Next Steps

- **Step 2**: Implement real wallet adapter connections (MetaMask, WalletConnect)
- **Step 3**: Integrate viem client and RPC calls
- **Step 4**: Build UI components (AppShell, ConnectButton, StatusBadge)
- **Step 5**: Implement token balance fetching
- **Step 6**: Add transaction sending capabilities

## License

MIT
