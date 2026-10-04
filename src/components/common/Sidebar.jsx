import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'

export default function Sidebar() {
  const location = useLocation()
  const { progress } = useProgress()
  const student = progress?.student || { name: 'Raditya Putra', class: 'XI MIPA 2' }

  const navItems = [
    { label: 'Materi', path: '/materi', icon: 'menu_book' },
    { label: 'Laboratorium', path: '/laboratorium', icon: 'science' },
    { label: 'Anatomi 3D', path: '/anatomi', icon: 'view_in_ar' },
    { label: 'Kuis', path: '/kuis', icon: 'quiz' },
    { label: 'Progress', path: '/', icon: 'analytics' },
  ]

  return (
    <aside className="app-sidebar">
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
            <div className="logo-brand">BioSMA</div>
            <div className="logo-sub">{student.class ? `Kurikulum Merdeka ${student.class}` : 'Kurikulum Merdeka Kelas XI'}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="sidebar-nav" aria-label="Menu Utama">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
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

      {/* Footer Profile */}
      <div className="sidebar-footer">
        <div className="student-card">
          <div className="student-avatar">
            {student.name ? student.name.charAt(0) : 'R'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="student-name" title={student.name}>{student.name}</div>
            <div className="student-meta">{student.class}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
