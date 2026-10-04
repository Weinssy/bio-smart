import { useProgress } from '../../context/ProgressContext'

export default function Header() {
  const { progress, handleExport } = useProgress()
  const student = progress?.student || { name: 'Raditya Putra' }

  return (
    <header className="top-header">
      <div className="header-inner">
        {/* Search & Filter Badges */}
        <div className="search-section">
          <div className="search-bar">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              placeholder="Cari materi sel, genetika, organ tubuh..."
              className="search-input"
              aria-label="Cari materi biologi"
            />
          </div>
          <div className="header-badges">
            <button className="header-badge active" type="button">Biologi Sel</button>
            <button className="header-badge" type="button">Sistem Organ</button>
            <button className="header-badge" type="button">Ekologi</button>
          </div>
        </div>

        {/* Trailing Actions & Profile */}
        <div className="header-actions">
          <button className="icon-btn" title="Notifikasi" aria-label="Notifikasi" type="button">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn" title="Materi Tersimpan" aria-label="Materi Tersimpan" type="button">
            <span className="material-symbols-outlined">bookmark</span>
          </button>

          {/* Quick Export report trigger */}
          <button
            onClick={handleExport}
            className="btn-export"
            title="Unduh file progress_biologi.json"
            type="button"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
            <span>Unduh Rapor (.json)</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.5rem', borderLeft: '1px solid rgba(191,201,194,0.4)' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  background: 'var(--color-primary-container)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {student.name ? student.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'RP'}
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '0.6rem',
                  height: '0.6rem',
                  background: '#10b981',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{student.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)' }}>Siswa Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
