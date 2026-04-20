import { useState } from 'react'
import { Zap, Shield, Globe, ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import LaunchForm from '../components/LaunchForm'

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Deployment',
    desc: 'Deploy SEP-41 compliant tokens to Stellar Testnet in seconds via Soroban smart contracts.',
  },
  {
    icon: Shield,
    title: 'Fully On-Chain',
    desc: 'Inter-contract calls handle initialization, minting, and admin transfer atomically.',
  },
  {
    icon: Globe,
    title: 'Production Ready',
    desc: 'Mobile-responsive UI, CI/CD pipeline, and comprehensive test coverage.',
  },
]

export default function HomePage() {
  const [lastTxHash, setLastTxHash] = useState<string | null>(null)

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          textAlign: 'center',
          maxWidth: 720,
          margin: '0 auto',
          padding: '120px 24px 80px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 20,
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#6366f1',
              boxShadow: '0 0 8px #6366f1',
            }}
          />
          <span style={{ fontSize: 12, color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.05em' }}>
            STELLAR TESTNET · SOROBAN
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#f1f5f9',
            marginBottom: 20,
          }}
        >
          Launch Your Token
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a78bfa, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            on Stellar
          </span>
        </h1>

        <p
          style={{
            fontSize: 17,
            color: '#64748b',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto 40px',
          }}
        >
          Create and deploy custom SEP-41 tokens using Soroban smart contracts.
          Full inter-contract architecture — no coding required.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/explore" className="btn-secondary" style={{ gap: 8 }}>
            Explore Tokens
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Main content */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 420px)',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* Left: features + info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-card"
                style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#6366f1" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0', marginBottom: 4 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture note */}
          <div
            className="glass-card"
            style={{ padding: '20px 24px' }}
          >
            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Contract Architecture
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Launchpad Contract', desc: 'Orchestrates deployments, stores registry' },
                { label: 'Token Contract (×N)', desc: 'SEP-41 token deployed per launch' },
                { label: 'Inter-Contract Calls', desc: 'initialize → mint → set_admin' },
              ].map(({ label, desc }) => (
                <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#6366f1',
                      marginTop: 6,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#c7d2fe' }}>{label}</span>
                    <span style={{ fontSize: 12, color: '#475569', marginLeft: 8 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: launch form */}
        <div>
          <div className="glass-card" style={{ padding: 28 }}>
            <div style={{ marginBottom: 24 }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#f1f5f9',
                  marginBottom: 6,
                }}
              >
                Launch a Token
              </h2>
              <p style={{ fontSize: 13, color: '#64748b' }}>
                Fill in the details below to deploy your custom token.
              </p>
            </div>

            <LaunchForm onSuccess={setLastTxHash} />

            {lastTxHash && (
              <div
                style={{
                  marginTop: 16,
                  padding: '12px 16px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600, marginBottom: 2 }}>
                    ✓ Transaction confirmed
                  </div>
                  <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>
                    {lastTxHash.slice(0, 20)}...
                  </div>
                </div>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${lastTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
