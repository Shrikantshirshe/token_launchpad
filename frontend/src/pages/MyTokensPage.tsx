import { useEffect, useState } from 'react'
import { Wallet, RefreshCw } from 'lucide-react'
import { useLaunchpad } from '../hooks/useLaunchpad'
import { useWallet } from '../hooks/useWallet'
import TokenCard from '../components/TokenCard'
import { type TokenInfo } from '../lib/stellar'
import { LAUNCHPAD_CONTRACT_ID } from '../lib/constants'
import WalletButton from '../components/WalletButton'
import toast from 'react-hot-toast'

export default function MyTokensPage() {
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [loading, setLoading] = useState(false)
  const { connected, publicKey } = useWallet()
  const { fetchCreatorTokens } = useLaunchpad()

  const load = async () => {
    if (!connected || !publicKey || !LAUNCHPAD_CONTRACT_ID) return
    setLoading(true)
    try {
      const data = await fetchCreatorTokens(publicKey)
      setTokens(data)
    } catch {
      toast.error('Failed to load your tokens')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [connected, publicKey])

  if (!connected) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 64 }}>
        <div style={{ maxWidth: 480, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: 48 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Wallet size={26} color="#2563eb" />
            </div>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: 10,
              }}
            >
              Connect your wallet
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 24 }}>
              Connect your Freighter wallet to view the tokens you've launched.
            </p>
            <WalletButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '40px 24px 32px' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              My Tokens
            </h1>
            <p style={{ fontSize: 14, color: '#64748b' }}>
              {tokens.length > 0
                ? `You've launched ${tokens.length} token${tokens.length !== 1 ? 's' : ''}`
                : "Tokens you've launched will appear here"}
            </p>
          </div>
          <button onClick={load} disabled={loading} className="btn-secondary" style={{ padding: '8px 16px' }}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 220, borderRadius: 16 }} />
            ))}
          </div>
        ) : tokens.length === 0 ? (
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌟</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
              No tokens yet
            </h3>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
              Launch your first token to see it here.
            </p>
            <a href="/launch" className="btn-primary" style={{ display: 'inline-flex' }}>
              Launch a Token
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {tokens.map((token, i) => (
              <TokenCard key={token.address} token={token} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
