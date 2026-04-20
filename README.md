# 🚀 Stellar Token Launchpad

> Deploy your own SEP-41 token on Stellar Testnet in seconds — no coding required.

Built with **Soroban smart contracts** (Rust) + **React/TypeScript** frontend. The launchpad orchestrates the full token lifecycle via inter-contract calls: deploy → initialize → mint → transfer admin. All on-chain, all atomic.

---

## 🌐 Live Contract

| | |
|---|---|
| **Launchpad Contract** | [`CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW`](https://stellar.expert/explorer/testnet/contract/CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW) |
| **Network** | Stellar Testnet |
| **Explorer** | [View on Stellar Expert ↗](https://stellar.expert/explorer/testnet/contract/CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW) |
| **RPC** | `https://soroban-testnet.stellar.org` |

---

## ✨ What It Does

- **One-click token deployment** — fill in name, symbol, decimals, supply and hit launch
- **Fully on-chain** — every token is a real deployed Soroban contract, not a mapping
- **SEP-41 compliant** — transfer, approve, transfer_from, burn, mint, total_supply
- **Creator registry** — the launchpad tracks every token you've ever launched
- **Paginated explorer** — browse all tokens launched on the platform
- **Freighter wallet** — connect, sign, and submit transactions in-browser

---

## 🏗️ Architecture

```
stellar-token-launchpad/
├── contracts/
│   ├── launchpad/          Orchestrator contract — deploys & tracks tokens
│   └── token/              SEP-41 token contract — one instance per launch
├── frontend/               React + TypeScript dApp (Vite + Freighter)
└── scripts/
    └── deploy.sh           One-command testnet deployment
```

### Inter-Contract Call Flow

```
User calls Launchpad.launch_token(name, symbol, decimals, supply)
    │
    ├── 1. e.deployer().deploy_v2(token_wasm_hash)   → fresh contract address
    ├── 2. Token.initialize(launchpad, decimals, name, symbol)
    ├── 3. Token.mint(creator, initial_supply)
    └── 4. Token.set_admin(creator)                  → creator owns the token
```

All four steps happen atomically in a single transaction. If any step fails, the whole thing rolls back.

---

## 🧪 Test Results

```
running 7 tests (launchpad)
✓ test_initialize
✓ test_launch_token_inter_contract
✓ test_get_token_info
✓ test_get_creator_tokens
✓ test_multiple_launches_and_pagination
✓ test_set_launch_fee
✓ test_double_initialize_panics

running 8 tests (token)
✓ test_initialize
✓ test_mint_and_balance
✓ test_transfer
✓ test_approve_and_transfer_from
✓ test_burn
✓ test_set_admin
✓ test_transfer_insufficient_balance
✓ test_double_initialize_panics

test result: ok. 15 passed; 0 failed
```

---

## ⚡ Quick Start

### Prerequisites

- Rust + `wasm32v1-none` target
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/cli/install-stellar-cli)
- Node.js 20+
- [Freighter wallet](https://freighter.app) (set to Testnet)

### 1. Clone & test contracts

```bash
git clone https://github.com/Shrikantshirshe/token_launchpad.git
cd token_launchpad

cargo test
```

### 2. Deploy to Testnet

```bash
./scripts/deploy.sh YOUR_STELLAR_SECRET_KEY
```

This automatically:
- Funds your account via Friendbot
- Builds and uploads the token WASM
- Deploys and initializes the launchpad contract
- Writes `frontend/.env` with the contract ID

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## 🔧 Frontend Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Wallet | Freighter (`@stellar/freighter-api`) |
| Stellar SDK | `@stellar/stellar-sdk` v13 |
| Styling | Inline styles + CSS variables (zero dependencies) |
| Toasts | `react-hot-toast` |
| Routing | `react-router-dom` v6 |

---

## 🔑 Environment Variables

Create `frontend/.env`:

```env
VITE_LAUNCHPAD_CONTRACT_ID=CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

---

## 📁 Contract Interface

### Launchpad

```rust
fn initialize(admin: Address, token_wasm_hash: BytesN<32>, launch_fee: i128)
fn launch_token(creator: Address, name: String, symbol: String, decimals: u32, initial_supply: i128) -> Address
fn get_tokens(start: u32, limit: u32) -> Vec<TokenInfo>
fn get_creator_tokens(creator: Address) -> Vec<TokenInfo>
fn token_count() -> u32
fn launch_fee() -> i128
fn set_launch_fee(new_fee: i128)   // admin only
```

### Token (SEP-41)

```rust
fn initialize(admin: Address, decimal: u32, name: String, symbol: String)
fn mint(to: Address, amount: i128)          // admin only
fn transfer(from: Address, to: Address, amount: i128)
fn approve(from: Address, spender: Address, amount: i128, expiration_ledger: u32)
fn transfer_from(spender: Address, from: Address, to: Address, amount: i128)
fn burn(from: Address, amount: i128)
fn balance(id: Address) -> i128
fn total_supply() -> i128
fn set_admin(new_admin: Address)
```

---

## 🐛 Known Fix: `bad union switch` Error

If you're integrating Soroban + Freighter and hitting `bad union switch 4`, the cause is **Freighter's extension bundling its own internal copy of `stellar-base`** which differs from your app's version. The fix is to never call `TransactionBuilder.fromXDR()` on the signed XDR that Freighter returns — instead submit it directly to the RPC via raw `fetch`:

```ts
// ❌ This causes bad union switch 4
const tx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
await server.sendTransaction(tx)

// ✅ This works — bypass stellar-base parsing entirely
await fetch(RPC_URL, {
  method: 'POST',
  body: JSON.stringify({ jsonrpc: '2.0', method: 'sendTransaction', params: { transaction: signedXdr } })
})
```

---

## 📜 License

MIT
