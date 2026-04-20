import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import MyTokensPage from './pages/MyTokensPage'

// Nebula background blobs
function NebulaBackground() {
  return (
    <>
      <div className="star-field" aria-hidden="true" />
      <div
        className="nebula-glow"
        aria-hidden="true"
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: -200,
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
        }}
      />
      <div
        className="nebula-glow"
        aria-hidden="true"
        style={{
          width: 500,
          height: 500,
          top: '40%',
          right: -150,
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
        }}
      />
      <div
        className="nebula-glow"
        aria-hidden="true"
        style={{
          width: 400,
          height: 400,
          bottom: 0,
          left: '30%',
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
        }}
      />
    </>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <NebulaBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/my-tokens" element={<MyTokensPage />} />
        </Routes>
      </main>
    </div>
  )
}
