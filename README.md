# Stellar Token Launchpad

Deploy a real SEP-41 token on Stellar Testnet in under two minutes. No CLI, no config files, no prior blockchain experience needed. Just connect your wallet, fill out a form, and your token is live.

**Live app → [stellar-token-launchpad.vercel.app](https://stellar-token-launchpad.vercel.app)**

![CI](https://github.com/Shrikantshirshe/token_launchpad/actions/workflows/ci.yml/badge.svg)

---

## What this actually is

Most "token launchers" are wrappers around a single contract that stores a mapping of balances. This isn't that.

Every token you launch here gets its own freshly deployed Soroban contract — a full SEP-41 implementation with transfer, approve, burn, mint, and total_supply. The launchpad contract handles the deployment and wires everything up via inter-contract calls, then hands admin rights to you. After that, the launchpad has zero control over your token.

The whole thing — deploy, initialize, mint, transfer admin — happens atomically in one transaction. Either all of it succeeds or none of it does.

---

## Live deployment

| | |
|---|---|
| **Launchpad contract** | [`CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW`](https://stellar.expert/explorer/testnet/contract/CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW) |
| **Deploy transaction** | [`10791934e9bdc235ed902cf80f2558dd336e110fe467a66a430d3640404d9dc8`](https://stellar.expert/explorer/testnet/tx/10791934e9bdc235ed902cf80f2558dd336e110fe467a66a430d3640404d9dc8) |
| **Initialize transaction** | [`4c2da5b9b50f77a476fa20a5b6ad75986b86010f87aab9a78b0e3e0ee0b4a79b`](https://stellar.expert/explorer/testnet/tx/4c2da5b9b50f77a476fa20a5b6ad75986b86010f87aab9a78b0e3e0ee0b4a79b) |
| **Example token launched** | [`e8d6d707e2916adfa16e46c1d2cc6bc8789fb3624c3117a7f974371362575beb`](https://stellar.expert/explorer/testnet/tx/e8d6d707e2916adfa16e46c1d2cc6bc8789fb3624c3117a7f974371362575beb) |
| **Network** | Stellar Testnet |
| **RPC** | `https://soroban-testnet.stellar.org` |

---

## Stack

- **Contracts** — Rust / Soroban (two contracts: launchpad + token)
- **Frontend** — React 18, TypeScript, Vite, Freighter wallet
- **CI/CD** — GitHub Actions (contract tests + frontend build on every push)
- **Hosting** — Vercel

---

## How the launch flow works

When you hit "Launch Token", this is what happens on-chain:

```
Launchpad.launch_token(name, symbol, decimals, supply)
  │
  ├── 1. Deploy a fresh token contract with a deterministic salt
  ├── 2. Token.initialize(launchpad_addr, decimals, name, symbol)
  ├── 3. Token.mint(creator_wallet, initial_supply)
  └── 4. Token.set_admin(creator_wallet)   ← you own it now
```

The launchpad also records the token in its registry so it shows up in the explorer and your dashboard.

---

## Tests

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

15 passed, 0 failed
```

---

## CI/CD

Every push to `main` runs two jobs via GitHub Actions:

- **Contract Tests** — spins up Ubuntu, installs Rust + `wasm32v1-none`, runs `cargo test` across both contracts
- **Frontend Build** — installs Node 20, runs `tsc` type check, then `vite build`

Config lives at [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## Running it locally

You'll need Rust with the `wasm32v1-none` target, the [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/cli/install-stellar-cli), and Node 20+.

```bash
git clone https://github.com/Shrikantshirshe/token_launchpad.git
cd token_launchpad

# run all contract tests
cargo test

# deploy contracts to testnet (writes frontend/.env automatically)
./scripts/deploy.sh YOUR_STELLAR_SECRET_KEY

# start the frontend
cd frontend
npm install
npm run dev
```

The deploy script funds your account via Friendbot, builds and uploads the token WASM, deploys the launchpad, and drops the contract ID into `frontend/.env`. You don't have to touch anything manually.

---

## Project structure

```
stellar-token-launchpad/
├── .github/workflows/
│   └── ci.yml             GitHub Actions — tests + build on every push
├── contracts/
│   ├── launchpad/         orchestrates deployments, stores the token registry
│   └── token/             SEP-41 token — one fresh instance per launch
├── frontend/              React dApp
└── scripts/
    └── deploy.sh
```

---

## Contract interface

**Launchpad**

```rust
fn initialize(admin: Address, token_wasm_hash: BytesN<32>, launch_fee: i128)
fn launch_token(creator: Address, name: String, symbol: String, decimals: u32, initial_supply: i128) -> Address
fn get_tokens(start: u32, limit: u32) -> Vec<TokenInfo>
fn get_creator_tokens(creator: Address) -> Vec<TokenInfo>
fn token_count() -> u32
fn set_launch_fee(new_fee: i128)   // admin only
fn launch_fee() -> i128
```

**Token (SEP-41)**

```rust
fn initialize(admin: Address, decimal: u32, name: String, symbol: String)
fn mint(to: Address, amount: i128)
fn transfer(from: Address, to: Address, amount: i128)
fn approve(from: Address, spender: Address, amount: i128, expiration_ledger: u32)
fn transfer_from(spender: Address, from: Address, to: Address, amount: i128)
fn burn(from: Address, amount: i128)
fn balance(id: Address) -> i128
fn total_supply() -> i128
fn set_admin(new_admin: Address)
```

---

## Environment variables

```env
VITE_LAUNCHPAD_CONTRACT_ID=CD7EJEMPI3RVAA2XJ4WSP7265QWC5VXOAJW32UJWDYECZKYGZIWE7QBW
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

---

Screenshots
<img width="1278" height="867" alt="Screenshot 2026-04-23 at 10 27 17 PM" src="https://github.com/user-attachments/assets/365de6f7-9cb1-4227-9b00-c10d62d62eae" />
<img width="1461" height="878" alt="Screenshot 2026-04-23 at 10 27 39 PM" src="https://github.com/user-attachments/assets/e994969f-7665-482a-ac5e-f8e311d06442" />
<img width="1455" height="874" alt="Screenshot 2026-04-23 at 10 27 47 PM" src="https://github.com/user-attachments/assets/7c28fa52-73b5-4d14-a86f-da6c130f2d6c" />



mobile view

<img width="359" height="776" alt="Screenshot 2026-04-23 at 10 28 29 PM" src="https://github.com/user-attachments/assets/95473384-7e2c-49d2-a6f8-cf362dd222da" />
<img width="358" height="771" alt="Screenshot 2026-04-23 at 10 28 35 PM" src="https://github.com/user-attachments/assets/e459d6cd-efbe-4b2b-aae0-4ad14b3c7b6a" />
<img width="360" height="776" alt="Screenshot 2026-04-23 at 10 28 47 PM" src="https://github.com/user-attachments/assets/84b426b8-9bb0-48ce-9851-420eadc137fb" />




demo video- https://drive.google.com/file/d/1V1XYDFZe9HWyzWS7huI2jbBDLiEG2MHO/view?usp=sharing
## License

MIT
