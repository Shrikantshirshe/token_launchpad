import { useState } from 'react'
import { Droplets, Loader2, ExternalLink } from 'lucide-react'
import { useWallet } from '../hooks/useWallet'
import toast from 'react-hot-toast'

export default function FundAccountBanner() {
  const { publicKey } = useWallet()
  const [funding, setFunding] = useState(false)
  const [funded, setFunded] = useState(false)

  if (!publicKey || funded) return null

  const handleFund = async () => {
    setFunding(true)
    try {
      const res = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`,
      )
      const data = await res.json()
      if (data.hash || res.ok) {
        setFunded(true)
        toast.success('Account funded with 10,000 XLM on Testnet!')
      } else {
        if (JSON.stringify(data).includes('already')) {
          setFunded(true)
          toast.success('Account already funded')
        } else {
          throw new Error(data.detail ?? 'Friendbot failed')
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.toLowerCase().includes('exist') || msg.toLowerCase().includes('already')) {
        setFunded(true)
        toast.success('Account already funded')
      } else {
        toast.error(`Funding failed: ${msg}`)
      }
    } finally {
      setFunding(false)
    }
  }

  return (
    <div
      style={{
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: 12,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Droplets size={15} color="#d97706" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>
            Fund your Testnet account
          </div>
          <div style={{ fontSize: 12, color: '#78350f', marginTop: 2 }}>
            You need XLM to pay transaction fees. Get free Testnet XLM from Friendbot.
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <a
          href={`https://friendbot.stellar.org?addr=${publicKey}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'none',
          }}
        >
          Manual <ExternalLink size={11} />
        </a>
        <button
          onClick={handleFund}
          disabled={funding}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: 8,
            color: '#92400e',
            fontSize: 12,
            fontWeight: 600,
            cursor: funding ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            opacity: funding ? 0.7 : 1,
            transition: 'all 0.15s',
          }}
        >
          {funding ? (
            <><Loader2 size={12} className="animate-spin" /> Funding...</>
          ) : (
            <><Droplets size={12} /> Fund via Friendbot</>
          )}
        </button>
      </div>
    </div>
  )
}
