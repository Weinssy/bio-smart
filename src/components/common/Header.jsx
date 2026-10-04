import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import CommandPalette from './CommandPalette'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
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
          {/* Search Trigger Button & Filter Badges */}
          <div className="search-section">
            <button 
              className="search-bar" 
              onClick={() => setIsPaletteOpen(true)}
              style={{ 
                cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', width: '100%', maxWidth: '400px',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid rgba(191, 201, 194, 0.6)',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 1rem 0.55rem 2.6rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface-variant)' }}>
                <span className="material-symbols-outlined search-icon">search</span>
                <span style={{ fontSize: '0.9rem' }}>Cari materi...</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-outline)', border: '1px solid var(--color-outline)', borderRadius: '4px', padding: '2px 6px' }}>Ctrl K</span>
            </button>
            <div className="header-badges">
              <button className="header-badge active" type="button">Biologi Sel</button>
              <button className="header-badge" type="button">Sistem Organ</button>
              <button className="header-badge" type="button">Ekologi</button>
            </div>
          </div>

          {/* Trailing Actions & Profile */}
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button 
              className="icon-btn" 
              title={`Ganti ke mode ${theme === 'light' ? 'gelap' : 'terang'}`} 
              aria-label="Toggle Theme" 
              type="button"
              onClick={toggleTheme}
            >
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <button className="icon-btn" title="Notifikasi" aria-label="Notifikasi" type="button">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="icon-btn" title="Materi Tersimpan" aria-label="Materi Tersimpan" type="button">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </header>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  )
}
