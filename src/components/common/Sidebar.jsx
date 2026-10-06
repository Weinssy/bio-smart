import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Beranda', path: '/', icon: 'home' },
    { label: 'Materi', path: '/materi', icon: 'menu_book' },
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
      {/* Mobile Hamburger Toggle (only shown when sidebar is closed so it doesn't overlap logo) */}
      {!mobileOpen && (
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobile}
          aria-label="Buka menu navigasi"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      )}

      {/* Backdrop Overlay */}
      {mobileOpen && (
        <div
          className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* Brand Row: Logo linked to home + Close Button for mobile */}
          <div className="sidebar-brand-row">
            <Link 
              to="/" 
              onClick={closeMobile} 
              className="sidebar-logo-link"
              title="Bio Smart - Menuju Beranda"
            >
              <div className="sidebar-logo">
                <div className="logo-icon-box">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}
                  >
                    biotech
                  </span>
                </div>
                <div className="sidebar-logo-text">
                  <div className="logo-brand">Bio Smart</div>
                  <div className="logo-sub">Belajar Biologi Interaktif</div>
                </div>
              </div>
            </Link>

            {/* Close Button on Mobile Drawer */}
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={closeMobile}
              aria-label="Tutup menu"
              title="Tutup menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="sidebar-nav" aria-label="Menu Utama">
            {navItems.map((item) => {
              const isActive =
                (item.path === '/' && location.pathname === '/') ||
                (item.path === '/materi' && (location.pathname === '/materi' || location.pathname === '/katalog' || location.pathname.startsWith('/materi/') || location.pathname.startsWith('/katalog/'))) ||
                (item.path === '/laboratorium' && (location.pathname === '/laboratorium' || location.pathname === '/lab' || location.pathname === '/praktikum')) ||
                (item.path === '/anatomi' && (location.pathname === '/anatomi' || location.pathname === '/anatomi-3d')) ||
                (item.path === '/kuis' && location.pathname === '/kuis')
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMobile}
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
            <Link to="/laboratorium" onClick={closeMobile} style={{ textDecoration: 'none' }}>
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
