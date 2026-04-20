import { useState, useCallback, useEffect } from 'react'
import { connectWallet, checkFreighterInstalled, type WalletState } from '../lib/freighter'
import { getPublicKey } from '@stellar/freighter-api'

interface UseWalletReturn extends WalletState {
  freighterInstalled: boolean
  connecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    networkPassphrase: null,
  })
  const [freighterInstalled, setFreighterInstalled] = useState(false)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    checkFreighterInstalled().then(setFreighterInstalled)

    // Restore session if previously connected
    const saved = sessionStorage.getItem('wallet_pk')
    if (saved) {
      getPublicKey().then((result) => {
        // v2 returns string directly
        const pk = typeof result === 'string' ? result : null
        if (pk && pk === saved) {
          setState({
            connected: true,
            publicKey: pk,
            networkPassphrase: import.meta.env.VITE_NETWORK_PASSPHRASE ?? null,
          })
        }
      }).catch(() => {
        // Ignore errors during session restore
      })
    }
  }, [])

  const connect = useCallback(async () => {
    setConnecting(true)
    try {
      const walletState = await connectWallet()
      setState(walletState)
      if (walletState.publicKey) {
        sessionStorage.setItem('wallet_pk', walletState.publicKey)
      }
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({ connected: false, publicKey: null, networkPassphrase: null })
    sessionStorage.removeItem('wallet_pk')
  }, [])

  return { ...state, freighterInstalled, connecting, connect, disconnect }
}
