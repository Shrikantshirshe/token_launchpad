import { useEffect, useState, useCallback } from 'react'
import { Search, RefreshCw, LayoutGrid, List } from 'lucide-react'
import { useLaunchpad } from '../hooks/useLaunchpad'
import TokenCard from '../components/TokenCard'
import { type TokenInfo } from '../lib/stellar'
import { LAUNCHPAD_CONTRACT_ID } from '../lib/constants'
import toast from 'react-hot-toast'

const PAGE_SIZE = 12

export default function ExplorePage() {
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { fetchTokens, fetchTokenCount } = useLaunchpad()

  const load = useCallback(
    async (pageNum: number, showRefresh = false) => {
      if (!LAUNCHPAD_CONTRACT_ID) { setLoading(false); return }
      if (showRefresh) setRefreshing(true)
      else setLoading(true)
      try {
        const [count, data] = await Promise.all([
          fetchTokenCount(),
          fetchTokens(pageNum * PAGE_SIZE, PAGE_SIZE),
        ])
        setTotalCount(count)
        setTokens(data)
      } catch {
        toast.error('Failed to load tokens')
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [fetchTokenCount, fetchTokens],
  )

  useEffect(() => { load(page) }, [page, load])

  const filtered = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  if (!LAUNCHPAD_CONTRACT_ID) {
    return (
      <div style={{ maxWidth: 600, margin: '120px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚙️</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
            Contract Not Configured
          </h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
            Set <code style={{ color: '#2563eb', background: '#eff6ff', padding: '2px 6px', borderRadius: 4 }}>VITE_LAUNCHPAD_CONTRACT_ID</code> in your{' '}
            <code style={{ color: '#2563eb', background: '#eff6ff', padding: '2px 6px', borderRadius: 4 }}>.env</code> file.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            Explore Tokens
          </h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>
            {totalCount > 0
              ? `${totalCount} token${totalCount !== 1 ? 's' : ''} launched on Stellar Testnet`
              : 'Discover tokens launched on the Stellar Testnet'}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 0 }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: 13,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
                pointerEvents: 'none',
              }}
            />
            <input
              className="input-field"
              placeholder="Search by name, symbol, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 38 }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              background: 'white',
              border: '1.5px solid #e2e8f0',
              borderRadius: 10,
              padding: 3,
              gap: 2,
            }}
          >
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 7,
                  border: 'none',
                  cursor: 'pointer',
                  background: viewMode === mode ? '#eff6ff' : 'transparent',
                  color: viewMode === mode ? '#2563eb' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {mode === 'grid' ? <LayoutGrid size={15} /> : <List size={15} />}
              </button>
            ))}
          </div>

          <button
            onClick={() => load(page, true)}
            disabled={refreshing}
            className="btn-secondary"
            style={{ padding: '8px 14px' }}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span className="hide-mobile">Refresh</span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 220, borderRadius: 16 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
              {search ? 'No tokens match your search' : 'No tokens launched yet'}
            </h3>
            <p style={{ fontSize: 14, color: '#64748b' }}>
              {search ? 'Try a different search term' : 'Be the first to launch a token!'}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: viewMode === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : undefined,
              flexDirection: viewMode === 'list' ? 'column' : undefined,
              gap: 20,
            }}
          >
            {filtered.map((token, i) => (
              <TokenCard key={token.address} token={token} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 40 }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
              className="btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              Previous
            </button>
            <span style={{ fontSize: 13, color: '#64748b', padding: '0 8px' }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1 || loading}
              className="btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
