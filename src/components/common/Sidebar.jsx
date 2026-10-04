import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Materi', path: '/', icon: 'menu_book' },
    { label: 'Laboratorium', path: '/laboratorium', icon: 'science' },
    { label: 'Anatomi 3D', path: '/anatomi', icon: 'view_in_ar' },
    { label: 'Kuis', path: '/kuis', icon: 'quiz' },
  ]

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={toggleMobile}
        aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
      >
        <span className="material-symbols-outlined">
          {mobileOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* App Brand Logo */}
          <div className="sidebar-logo">
            <div className="logo-icon-box">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}
              >
                biotech
              </span>
            </div>
            <div>
              <div className="logo-brand">Bio Smart</div>
              <div className="logo-sub">Belajar Biologi Interaktif</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="sidebar-nav" aria-label="Menu Utama">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === '/' && location.pathname.startsWith('/materi/')) ||
                (item.path === '/anatomi' && location.pathname === '/anatomi-3d')
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="sidebar-cta">
            <Link to="/laboratorium" style={{ textDecoration: 'none' }}>
              <button className="btn-practical" type="button">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_circle</span>
                <span>Mulai Praktikum</span>
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
