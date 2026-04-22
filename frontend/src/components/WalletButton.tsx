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
      <button
        onClick={disconnect}
        title="Disconnect wallet"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: 10,
          color: '#2563eb',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.background = '#fef2f2'
          el.style.borderColor = '#fecaca'
          el.style.color = '#dc2626'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.background = '#eff6ff'
          el.style.borderColor = '#bfdbfe'
          el.style.color = '#2563eb'
        }}
      >
        <Wallet size={14} />
        <span className="hide-mobile">{shortenAddress(publicKey, 4)}</span>
        <LogOut size={13} />
      </button>
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
