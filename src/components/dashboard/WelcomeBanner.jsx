import { useProgress } from '../../context/ProgressContext'

export default function WelcomeBanner() {
  const { progress } = useProgress()
  const student = progress?.student || { name: 'Raditya Putra', streakDays: 12 }
  const stats = progress?.stats || { semesterTargetPercent: 78 }

  return (
    <section className="welcome-banner">
      {/* Decorative Botanical Motif */}
      <span className="material-symbols-outlined banner-bg-motif">eco</span>

      <div className="banner-content">
        <div style={{ maxWidth: '40rem' }}>
          <div className="curriculum-tag">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
            <span>{student.curriculum || 'Kurikulum Merdeka 2024/2025 • Fase F'}</span>
          </div>
          <h1 className="banner-title">Statistik & Progres Belajar Biologi</h1>
          <p className="banner-sub">
            Pertahankan ketekunan belajarmu, {student.name}! Kamu telah menyelesaikan modul transport
            membran dan siap untuk praktikum osmosis mandiri.
          </p>
        </div>

        {/* Highlights */}
        <div className="banner-highlights">
          <div className="highlight-item bordered">
            <div className="highlight-icon fire">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div>
              <div className="highlight-val">{student.streakDays ?? 12} Hari</div>
              <div className="highlight-lbl">Streak Belajar Aktif</div>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon donut">
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>donut_large</span>
            </div>
            <div>
              <div className="highlight-val">{stats.semesterTargetPercent ?? 78}%</div>
              <div className="highlight-lbl">Target Semester Selesai</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
