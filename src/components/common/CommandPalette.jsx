import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import materiDataRaw from '../../data/materiData.json'

const allModules = materiDataRaw.modules

export default function CommandPalette({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Reset and focus when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('')
      setSearchResults([])
      setSelectedIndex(0)
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus()
      }, 50)
    }
  }, [isOpen])

  // Handle Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setSelectedIndex(0)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = []

    allModules.forEach((mod) => {
      if (mod.title.toLowerCase().includes(query) || mod.description.toLowerCase().includes(query)) {
        results.push({ type: 'module', id: mod.id, title: mod.title, parentTitle: null, icon: mod.icon, color: mod.color })
      }
      mod.subtopics.forEach((sub) => {
        if (sub.title.toLowerCase().includes(query)) {
          results.push({ type: 'subtopic', id: mod.id, title: sub.title, parentTitle: mod.title, icon: sub.icon, color: mod.color })
        }
      })
    })

    setSearchResults(results)
    setSelectedIndex(0)
  }, [searchQuery])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (searchResults.length > 0) {
          const selected = searchResults[selectedIndex]
          navigate(`/materi/${selected.id}`)
          onClose()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, searchResults, selectedIndex, navigate, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="command-palette-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh'
      }}
    >
      <div 
        className="command-palette-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(191,201,194,0.4)'
        }}
      >
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(191,201,194,0.4)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-outline)' }}>search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari materi sel, genetika, organ tubuh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.1rem',
              color: 'var(--color-on-surface)'
            }}
          />
          <span style={{ fontSize: '0.7rem', color: 'var(--color-outline)', border: '1px solid var(--color-outline)', borderRadius: '4px', padding: '2px 6px' }}>ESC</span>
        </div>

        {searchQuery.trim() !== '' && (
          <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0.5rem' }}>
            {searchResults.length > 0 ? (
              searchResults.map((res, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <Link
                    key={idx}
                    to={`/materi/${res.id}`}
                    onClick={onClose}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem 1rem',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--color-surface-container-low)' : 'transparent',
                      color: 'var(--color-on-surface)'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ color: res.color, fontSize: '24px' }}>{res.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{res.title}</span>
                      {res.parentTitle && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Modul: {res.parentTitle}</span>
                      )}
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined" style={{ marginLeft: 'auto', color: 'var(--color-outline)' }}>keyboard_return</span>
                    )}
                  </Link>
                )
              })
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>search_off</span>
                <p>Tidak ada hasil ditemukan untuk "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
