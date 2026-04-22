import { Zap, Shield, Globe, ArrowRight, CheckCircle, Layers, Users, Code2, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: Zap,
    title: 'Launch in seconds',
    desc: 'Fill out a simple form and your SEP-41 token is live on Stellar Testnet. No CLI, no config files, no waiting.',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: Shield,
    title: 'Fully on-chain',
    desc: 'Every token is deployed via Soroban smart contracts. Initialization, minting, and admin transfer happen atomically in a single transaction.',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    icon: Globe,
    title: 'Open registry',
    desc: 'Every launched token is indexed in the launchpad contract. Browse the full registry, filter by creator, and verify on Stellar Expert.',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: Layers,
    title: 'SEP-41 compliant',
    desc: 'Tokens follow the Stellar Ecosystem Proposal 41 standard — compatible with wallets, DEXes, and any Soroban-aware application.',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: Users,
    title: 'Creator dashboard',
    desc: 'Track every token you\'ve launched from a single dashboard. See supply, decimals, contract address, and launch date at a glance.',
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: Code2,
    title: 'Open source',
    desc: 'The launchpad and token contracts are fully open source. Fork them, audit them, or build your own launchpad on top.',
    color: '#dc2626',
    bg: '#fef2f2',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect your Freighter wallet',
    desc: 'Install the Freighter browser extension and connect to Stellar Testnet. Fund your account with free XLM from Friendbot — one click inside the app.',
  },
  {
    step: '02',
    title: 'Fill in your token details',
    desc: 'Give your token a name, symbol, decimal precision, and initial supply. A live preview shows exactly what will be deployed before you confirm.',
  },
  {
    step: '03',
    title: 'Sign and deploy',
    desc: 'Approve the transaction in Freighter. The launchpad contract deploys a fresh token contract, mints your supply, and transfers admin rights to you — all in one atomic call.',
  },
  {
    step: '04',
    title: 'Your token is live',
    desc: 'The token contract address is recorded in the registry. Share it, list it, or integrate it. You own the admin key and can mint more or transfer ownership anytime.',
  },
]

const STATS = [
  { value: 'SEP-41', label: 'Token Standard' },
  { value: 'Soroban', label: 'Smart Contract Platform' },
  { value: '1-click', label: 'Deployment' },
  { value: 'Testnet', label: 'Network' },
]

export default function HomePage() {
  return (
    <div style={{ position: 'relative' }}>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          borderBottom: '1px solid #e2e8f0',
          padding: '120px 24px 80px',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              borderRadius: 20,
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              marginBottom: 28,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb' }} />
            <span style={{ fontSize: 12, color: '#2563eb', fontWeight: 600, letterSpacing: '0.05em' }}>
              STELLAR TESTNET · SOROBAN SMART CONTRACTS
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(38px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: 22,
            }}
          >
            Launch your token
            <br />
            <span style={{ color: '#2563eb' }}>on Stellar</span> — no code needed
          </h1>

          <p
            style={{
              fontSize: 18,
              color: '#475569',
              lineHeight: 1.7,
              maxWidth: 540,
              margin: '0 auto 40px',
            }}
          >
            TokenLaunch deploys SEP-41 compliant tokens to the Stellar blockchain using Soroban smart contracts.
            Connect your wallet, fill a form, and you're done.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/launch" className="btn-primary" style={{ padding: '13px 28px', fontSize: 15 }}>
              Launch a Token
              <ArrowRight size={16} />
            </Link>
            <Link to="/explore" className="btn-secondary" style={{ padding: '13px 28px', fontSize: 15 }}>
              Explore Tokens
            </Link>
          </div>

          {/* Trust line */}
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            {['No coding required', 'Free on Testnet', 'Open source contracts'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={14} color="#16a34a" />
                <span style={{ fontSize: 13, color: '#64748b' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#0f172a', padding: '28px 24px' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 24,
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                {value}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Why TokenLaunch
            </div>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(26px, 4vw, 40px)',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: 14,
              }}
            >
              Everything you need to ship a token
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
              Built on Soroban, Stellar's smart contract platform. Designed for developers and non-developers alike.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="glass-card"
                style={{ padding: '28px 24px' }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 8 }}>
                  {title}
                </div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: 'white', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              How it works
            </div>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(26px, 4vw, 40px)',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: 14,
              }}
            >
              From zero to token in four steps
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 440, margin: '0 auto' }}>
              The whole process takes under two minutes. Here's exactly what happens.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div
                key={step}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: 24,
                  padding: '32px 0',
                  borderBottom: i < HOW_IT_WORKS.length - 1 ? '1px solid #f1f5f9' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 36,
                    fontWeight: 700,
                    color: '#e2e8f0',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    paddingTop: 4,
                  }}
                >
                  {step}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: '#0f172a', marginBottom: 8 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract architecture */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Under the hood
            </div>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: 14,
              }}
            >
              Inter-contract architecture
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
              The launchpad orchestrates three inter-contract calls in a single transaction — no partial states, no manual steps.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {[
              { num: '1', label: 'initialize()', desc: 'Sets admin, decimals, name, and symbol on the freshly deployed token contract.' },
              { num: '2', label: 'mint()', desc: 'Mints the full initial supply directly to the creator\'s wallet address.' },
              { num: '3', label: 'set_admin()', desc: 'Transfers admin rights from the launchpad to the creator — you own your token.' },
            ].map(({ num, label, desc }) => (
              <div
                key={num}
                className="glass-card"
                style={{ padding: '24px 20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#2563eb',
                    }}
                  >
                    {num}
                  </div>
                  <code style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: '#2563eb', fontWeight: 500 }}>
                    {label}
                  </code>
                </div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 24px',
          background: '#0f172a',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Ready to launch your token?
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', marginBottom: 36, lineHeight: 1.6 }}>
            It's free on Testnet. Connect your Freighter wallet and deploy your first token in under two minutes.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/launch" className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }}>
              Get started
              <ChevronRight size={16} />
            </Link>
            <Link to="/explore" className="btn-secondary" style={{ padding: '14px 28px', fontSize: 15, background: 'transparent', color: '#94a3b8', borderColor: '#334155' }}>
              Browse tokens
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid #1e293b', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#475569' }}>
          Built on Stellar · Powered by Soroban · Open source
        </p>
      </footer>
    </div>
  )
}
