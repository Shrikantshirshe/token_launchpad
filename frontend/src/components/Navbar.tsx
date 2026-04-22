import { Link, useLocation } from 'react-router-dom'
import { Rocket, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { shortenAddress } from '../lib/stellar'
import WalletButton from './WalletButton'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/launch', label: 'Launch Token' },
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
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Rocket size={17} color="white" />
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            TokenLaunch
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: 2 }}
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
                  color: active ? '#2563eb' : '#475569',
                  background: active ? '#eff6ff' : 'transparent',
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
                padding: '5px 12px',
                borderRadius: 8,
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#16a34a',
                }}
              />
              <span style={{ fontSize: 12, color: '#15803d', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
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
              border: '1.5px solid #e2e8f0',
              borderRadius: 8,
              padding: 8,
              color: '#475569',
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
            borderTop: '1px solid #e2e8f0',
            padding: '12px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            background: 'white',
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
                  color: active ? '#2563eb' : '#475569',
                  background: active ? '#eff6ff' : 'transparent',
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
