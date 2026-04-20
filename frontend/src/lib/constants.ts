export const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015'
export const RPC_URL = 'https://soroban-testnet.stellar.org'
export const HORIZON_URL = 'https://horizon-testnet.stellar.org'

// Replace with your deployed contract addresses after running deploy scripts
export const LAUNCHPAD_CONTRACT_ID =
  import.meta.env.VITE_LAUNCHPAD_CONTRACT_ID ?? ''

export const STROOPS_PER_XLM = 10_000_000n

export const DECIMAL_OPTIONS = [0, 2, 6, 7, 8, 18] as const

export const MAX_TOKEN_NAME_LENGTH = 32
export const MAX_TOKEN_SYMBOL_LENGTH = 12
