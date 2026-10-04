import { Link } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'

export default function BentoCards() {
  const { progress } = useProgress()
  const activities = progress?.upcomingActivities || [
    {
      id: 'act-1',
      title: 'Praktikum Difusi & Osmosis',
      deadline: 'Besok, 23:59 WIB • Lab Virtual',
      priority: 'Sedang',
      type: 'lab',
      actionText: 'Mulai',
    },
    {
      id: 'act-2',
      title: 'Kuis: Persilangan Dihibrid',
      deadline: 'Kamis, 14 Nov • 15 Butir Soal',
      priority: 'Tinggi',
      type: 'quiz',
      actionText: 'Siap',
    },
    {
      id: 'act-3',
      title: 'Review Laporan: Enzim Katalase',
      deadline: 'Jumat, 15 Nov • Koreksi Mandiri',
      priority: 'Mudah',
      type: 'assignment',
      actionText: 'Baca',
    },
  ]

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Tinggi':
        return { bg: '#ffe4e6', color: '#9f1239', border: '#fecdd3' }
      case 'Sedang':
        return { bg: '#fef3c7', color: '#92400e', border: '#fde68a' }
      case 'Mudah':
      default:
        return { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' }
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'lab':
        return 'science'
      case 'quiz':
        return 'quiz'
      case 'assignment':
      default:
        return 'assignment'
    }
  }

  return (
    <section className="bento-grid" aria-label="Aktivitas Belajar dan Agenda">
      {/* Card A: Lanjutkan Pembelajaran */}
      <div className="bento-card">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(191,201,194,0.3)' }}>
            <div>
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-secondary-container)',
                  color: 'var(--color-on-secondary-container)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                Sesi Belajar Terakhir
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.4rem', color: 'var(--color-on-surface)' }}>
                Struktur Sel Hewan & Tumbuhan
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-outline)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
              Kemarin, 19:30
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', margin: '1.25rem 0', flexWrap: 'wrap' }}>
            {/* Specimen 3D Canvas Preview */}
            <div
              style={{
                width: '10rem',
                height: '8.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-surface-container-low)',
                border: '1px solid rgba(191,201,194,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  background: 'rgba(170, 241, 212, 0.4)',
                  border: '1px solid rgba(13, 92, 70, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>view_in_ar</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.4rem' }}>
                Model 3D Aktif
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-outline)' }}>Organel: Mitokondria</span>
            </div>

            {/* Lesson Context */}
            <div style={{ flex: 1, minWidth: '15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
                Kamu sedang mempelajari perbedaan dinding sel, membran plasma, dan perbandingan kloroplas dengan vakuola sentral. Progres modul ini mencapai <strong>65%</strong>.
              </p>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', marginBottom: '0.35rem' }}>
                  <span>Modul Bab 2 • Bagian 3 dari 5</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>65% Rampung</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '65%', backgroundColor: 'var(--color-primary-container)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(191,201,194,0.3)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
            Modul Interaktif AR • Kurikulum Nasional
          </span>
          <Link
            to="/anatomi"
            className="btn-export"
            style={{ padding: '0.55rem 1.25rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>3d_rotation</span>
            <span>Buka Anatomi 3D</span>
          </Link>
        </div>
      </div>

      {/* Card B: Jadwal & Agenda Praktikum */}
      <div className="bento-card">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(191,201,194,0.3)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Jadwal & Agenda Praktikum
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              {activities.length} Tugas Aktif
            </span>
          </div>

          <div style={{ marginTop: '1rem' }}>
            {activities.map((act) => {
              const priorityStyle = getPriorityStyle(act.priority)
              const iconName = getIcon(act.type)
              return (
                <div key={act.id} className="activity-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      className="activity-icon-box"
                      style={{ backgroundColor: 'var(--color-surface-container-low)', color: 'var(--color-primary)' }}
                    >
                      <span className="material-symbols-outlined">{iconName}</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        {act.title}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
                        {act.deadline}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span
                      style={{
                        padding: '0.1rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        backgroundColor: priorityStyle.bg,
                        color: priorityStyle.color,
                        border: `1px solid ${priorityStyle.border}`,
                      }}
                    >
                      {act.priority}
                    </span>
                    <Link
                      to={act.type === 'lab' ? '/laboratorium' : act.type === 'quiz' ? '/kuis' : '/'}
                      style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {act.actionText || 'Buka'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(191,201,194,0.3)', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--color-on-surface-variant)' }}>Sinkron dengan Google Calendar</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            Buka Kalender
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
          </span>
        </div>
      </div>
    </section>
  )
}
