import {
  isConnected,
  signTransaction,
  requestAccess,
  getNetworkDetails,
} from '@stellar/freighter-api'
import { NETWORK_PASSPHRASE } from './constants'

export interface WalletState {
  connected: boolean
  publicKey: string | null
  networkPassphrase: string | null
}

export async function checkFreighterInstalled(): Promise<boolean> {
  try {
    const result = await isConnected()
    if (typeof result === 'boolean') return result
    if (result && typeof result === 'object' && 'isConnected' in result) {
      return Boolean((result as { isConnected: boolean }).isConnected)
    }
    return false
  } catch {
    return false
  }
}

export async function connectWallet(): Promise<WalletState> {
  const installed = await checkFreighterInstalled()
  if (!installed) {
    throw new Error('Freighter wallet is not installed. Please install it from freighter.app')
  }

  let publicKey: string
  try {
    publicKey = await requestAccess()
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.toLowerCase().includes('fetch') || msg.toLowerCase().includes('failed')) {
      throw new Error(
        'Freighter extension is not responding. Try clicking the Freighter icon in your browser toolbar to wake it up, then try again.',
      )
    }
    throw new Error(`Wallet access denied: ${msg}`)
  }

  if (!publicKey || typeof publicKey !== 'string' || publicKey.length < 10) {
    throw new Error('Wallet access denied. Please approve the connection in Freighter.')
  }

  let passphrase: string
  try {
    const networkDetails = await getNetworkDetails()
    passphrase =
      typeof networkDetails === 'string'
        ? networkDetails
        : (networkDetails as { networkPassphrase: string }).networkPassphrase
  } catch {
    throw new Error('Could not read network from Freighter. Please try reconnecting.')
  }

  if (passphrase !== NETWORK_PASSPHRASE) {
    throw new Error(
      `Wrong network. Please open Freighter → click the network name → select "Test SDF Network".\n\nDetected: ${passphrase}`,
    )
  }

  return { connected: true, publicKey, networkPassphrase: passphrase }
}

/**
 * Sign a base64-encoded transaction XDR with Freighter.
 * Returns the signed base64 XDR string.
 *
 * IMPORTANT: We return the raw string from Freighter without parsing it
 * through TransactionBuilder.fromXDR. Freighter's extension bundles its own
 * version of stellar-base internally. Parsing the signed XDR with our copy
 * of stellar-base causes "bad union switch" XDR errors when the versions differ.
 * We pass the raw string directly to our fetch-based submitTransaction instead.
 */
export async function signTx(xdrBase64: string, publicKey: string): Promise<string> {
  let result: string
  try {
    result = await signTransaction(xdrBase64, {
      networkPassphrase: NETWORK_PASSPHRASE,
      accountToSign: publicKey,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.toLowerCase().includes('fetch') || msg.toLowerCase().includes('failed')) {
      throw new Error(
        'Freighter is not responding. Click the Freighter icon in your toolbar to wake it up, then try again.',
      )
    }
    if (msg.toLowerCase().includes('reject') || msg.toLowerCase().includes('denied')) {
      throw new Error('Transaction rejected in Freighter.')
    }
    throw new Error(`Signing failed: ${msg}`)
  }

  if (typeof result === 'string' && result.length > 10) return result

  throw new Error('Freighter returned an empty response. Please try again.')
}
