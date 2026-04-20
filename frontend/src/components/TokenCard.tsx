import { ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { type TokenInfo, formatAmount, shortenAddress } from '../lib/stellar'
import toast from 'react-hot-toast'

interface TokenCardProps {
  token: TokenInfo
  index?: number
}

export default function TokenCard({ token, index = 0 }: TokenCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Address copied')
    setTimeout(() => setCopied(false), 2000)
  }

  const formattedSupply = formatAmount(token.initial_supply, token.decimals)
  const createdDate = new Date(Number(token.created_at) * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        padding: 24,
        animationDelay: `${index * 60}ms`,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Token avatar */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg, hsl(${(token.symbol.charCodeAt(0) * 37) % 360}, 70%, 45%), hsl(${(token.symbol.charCodeAt(0) * 37 + 60) % 360}, 70%, 35%))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {token.symbol.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#f1f5f9' }}>{token.name}</div>
            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, marginTop: 2 }}>
              ${token.symbol}
            </div>
          </div>
        </div>

        <span className="badge badge-accent">{token.decimals}dp</span>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        <div
          style={{
            padding: '10px 12px',
            background: 'rgba(5, 8, 16, 0.5)',
            borderRadius: 8,
            border: '1px solid rgba(99, 102, 241, 0.08)',
          }}
        >
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Total Supply
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', fontFamily: 'monospace' }}>
            {Number(formattedSupply).toLocaleString()}
          </div>
        </div>
        <div
          style={{
            padding: '10px 12px',
            background: 'rgba(5, 8, 16, 0.5)',
            borderRadius: 8,
            border: '1px solid rgba(99, 102, 241, 0.08)',
          }}
        >
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Launched
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{createdDate}</div>
        </div>
      </div>

      {/* Contract address */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(5, 8, 16, 0.5)',
          borderRadius: 8,
          border: '1px solid rgba(99, 102, 241, 0.08)',
        }}
      >
        <div>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
            Contract
          </div>
          <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
            {shortenAddress(token.address, 8)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => handleCopy(token.address)}
            title="Copy address"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#475569',
              padding: 4,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569' }}
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          </button>
          <a
            href={`https://stellar.expert/explorer/testnet/contract/${token.address}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View on Stellar Expert"
            style={{
              color: '#475569',
              padding: 4,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569' }}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Creator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: `linear-gradient(135deg, hsl(${(token.creator.charCodeAt(2) * 53) % 360}, 60%, 40%), hsl(${(token.creator.charCodeAt(3) * 53 + 90) % 360}, 60%, 30%))`,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 11, color: '#475569' }}>by</span>
        <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>
          {shortenAddress(token.creator, 6)}
        </span>
      </div>
    </div>
  )
}
