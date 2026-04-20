import { Wallet, LogOut, Loader2 } from 'lucide-react'
import { useWallet } from '../hooks/useWallet'
import { shortenAddress } from '../lib/stellar'
import toast from 'react-hot-toast'

export default function WalletButton() {
  const { connected, publicKey, connecting, connect, disconnect } = useWallet()

  const handleConnect = async () => {
    try {
      await connect()
      toast.success('Wallet connected')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to connect wallet')
    }
  }

  if (connected && publicKey) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={disconnect}
          title="Disconnect wallet"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: 10,
            color: '#a5b4fc',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = 'rgba(239, 68, 68, 0.1)'
            el.style.borderColor = 'rgba(239, 68, 68, 0.3)'
            el.style.color = '#fca5a5'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'rgba(99, 102, 241, 0.1)'
            el.style.borderColor = 'rgba(99, 102, 241, 0.25)'
            el.style.color = '#a5b4fc'
          }}
        >
          <Wallet size={14} />
          <span className="hide-mobile">{shortenAddress(publicKey, 4)}</span>
          <LogOut size={13} />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className="btn-primary"
      style={{ padding: '8px 18px', fontSize: 13 }}
    >
      {connecting ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet size={14} />
          Connect Wallet
        </>
      )}
    </button>
  )
}
