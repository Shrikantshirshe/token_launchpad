import { Link, useLocation } from 'react-router-dom'
import { Rocket, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { shortenAddress } from '../lib/stellar'
import WalletButton from './WalletButton'

const NAV_LINKS = [
  { to: '/', label: 'Launch' },
  { to: '/explore', label: 'Explore' },
  { to: '/my-tokens', label: 'My Tokens' },
]

export default function Navbar() {
  const location = useLocation()
  const { connected, publicKey } = useWallet()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.12)',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)',
            }}
          >
            <Rocket size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}
          >
            TokenLaunch
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: active ? '#f1f5f9' : '#94a3b8',
                  background: active ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {connected && publicKey && (
            <div
              className="hide-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                }}
              />
              <span style={{ fontSize: 12, color: '#34d399', fontFamily: 'monospace' }}>
                {shortenAddress(publicKey)}
              </span>
            </div>
          )}

          <WalletButton />

          {/* Mobile menu toggle */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 8,
              padding: 8,
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid rgba(99, 102, 241, 0.12)',
            padding: '12px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: active ? '#f1f5f9' : '#94a3b8',
                  background: active ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
