import { useState, useEffect } from 'react'
import CommandPalette from './CommandPalette'

export default function Header() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsPaletteOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="top-header">
        <div className="header-inner">
          <div className="search-section">
            <button 
              className="search-bar" 
              onClick={() => setIsPaletteOpen(true)}
              style={{ 
                cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', width: '100%', maxWidth: '480px',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid rgba(191, 201, 194, 0.6)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1rem 0.6rem 2.6rem'
              }}
              aria-label="Cari materi biologi"
            >
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span className="material-symbols-outlined search-icon">search</span>
                <span style={{ fontSize: '0.9rem' }}>Cari materi biologi...</span>
              </div>
              <span className="search-shortcut-badge" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-outline)', border: '1px solid var(--color-outline)', borderRadius: '4px', padding: '2px 6px' }}>Ctrl K</span>
            </button>
          </div>
        </div>
      </header>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  )
}
