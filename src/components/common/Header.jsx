import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import materiDataRaw from '../../data/materiData.json'

const allModules = materiDataRaw.modules

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

  // Handle search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = []

    allModules.forEach((mod) => {
      // Check module title/desc
      if (mod.title.toLowerCase().includes(query) || mod.description.toLowerCase().includes(query)) {
        results.push({ type: 'module', id: mod.id, title: mod.title, parentTitle: null, icon: mod.icon, color: mod.color })
      }

      // Check subtopics
      mod.subtopics.forEach((sub) => {
        if (sub.title.toLowerCase().includes(query)) {
          results.push({ type: 'subtopic', id: mod.id, title: sub.title, parentTitle: mod.title, icon: sub.icon, color: mod.color })
        }
      })
    })

    setSearchResults(results)
  }, [searchQuery])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="top-header">
      <div className="header-inner">
        {/* Search & Filter Badges */}
        <div className="search-section">
          <div className="search-bar" ref={searchRef} style={{ position: 'relative' }}>
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              placeholder="Cari materi sel, genetika, organ tubuh..."
              className="search-input"
              aria-label="Cari materi biologi"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setIsSearchOpen(true)
              }}
              onFocus={() => setIsSearchOpen(true)}
            />
            
            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div 
                className="search-dropdown" 
                style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  marginTop: '0.5rem', 
                  background: 'var(--color-surface-container-lowest)', 
                  border: '1px solid rgba(191, 201, 194, 0.4)', 
                  borderRadius: 'var(--radius-md)', 
                  boxShadow: 'var(--shadow-level-2)', 
                  zIndex: 100,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0.5rem 0'
                }}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <Link
                      key={idx}
                      to={`/materi/${res.id}`}
                      style={{ 
                        textDecoration: 'none', 
                        padding: '0.75rem 1rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem', 
                        color: 'var(--color-on-surface)',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <span className="material-symbols-outlined" style={{ color: res.color, fontSize: '20px' }}>{res.icon}</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{res.title}</span>
                        {res.parentTitle && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}>
                            Modul: {res.parentTitle}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
                    Tidak ada hasil ditemukan untuk "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
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
  )
}
