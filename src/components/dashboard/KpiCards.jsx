import { useProgress } from '../../context/ProgressContext'

export default function KpiCards() {
  const { progress } = useProgress()

  const modules = progress?.modules || []
  const quizzes = progress?.quizzes || []
  const stats = progress?.stats || {}

  // Hitung jumlah modul selesai secara dinamis dari progress.modules jika ada
  const completedModulesCount =
    modules.length > 0 ? modules.filter((m) => m.completed || m.status === 'Tuntas').length : stats.completedModules || 14
  const totalModulesCount = modules.length > 0 ? modules.length : stats.totalModules || 18
  const modulePercentage = Math.round((completedModulesCount / (totalModulesCount || 1)) * 100)

  // Hitung rata-rata kuis secara dinamis dari progress.quizzes jika ada
  const avgQuiz =
    quizzes.length > 0
      ? (quizzes.reduce((acc, q) => acc + (Number(q.score) || 0), 0) / quizzes.length).toFixed(1)
      : stats.averageQuizScore || '88.5'

  const labHours = stats.virtualLabHours || 18.4
  const anatomyModels = stats.masteredAnatomyModels || 24

  return (
    <section className="kpi-grid" aria-label="Ringkasan Metrik Belajar">
      {/* KPI 1: Modul Bab Selesai */}
      <div className="kpi-card">
        <div className="kpi-top-bar" style={{ backgroundColor: 'var(--color-primary-container)' }} />
        <div className="kpi-card-header">
          <div>
            <span className="kpi-title">Modul Bab Selesai</span>
            <div className="kpi-value">
              {completedModulesCount} / {totalModulesCount} Bab
            </div>
          </div>
          <div className="kpi-icon-box" style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)' }}>
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${modulePercentage}%`, backgroundColor: 'var(--color-primary-container)' }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {modulePercentage}%
          </span>
        </div>
        <div className="kpi-meta">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#059669' }}>
            arrow_upward
          </span>
          <span style={{ color: '#047857', fontWeight: 600 }}>+{completedModulesCount} Bab</span> tuntas
        </div>
      </div>

      {/* KPI 2: Rata-rata Kuis */}
      <div className="kpi-card">
        <div className="kpi-top-bar" style={{ backgroundColor: 'var(--color-tertiary-fixed-dim)' }} />
        <div className="kpi-card-header">
          <div>
            <span className="kpi-title">Rata-rata Kuis Formatif</span>
            <div className="kpi-value">
              {avgQuiz} <span style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', fontWeight: 400 }}>/ 100</span>
            </div>
          </div>
          <div className="kpi-icon-box" style={{ backgroundColor: 'rgba(76, 215, 246, 0.25)', color: 'var(--color-tertiary-container)' }}>
            <span className="material-symbols-outlined">school</span>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <span
            style={{
              display: 'inline-flex',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Kategori: {avgQuiz >= 85 ? 'A (Sangat Baik)' : avgQuiz >= 75 ? 'B (Baik)' : 'C (Perlu Remedial)'}
          </span>
        </div>
        <div className="kpi-meta">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#059669' }}>
            trending_up
          </span>
          <span style={{ color: '#047857', fontWeight: 600 }}>{quizzes.length} Kuis</span> telah diselesaikan
        </div>
      </div>

      {/* KPI 3: Jam Praktikum Lab Virtual */}
      <div className="kpi-card">
        <div className="kpi-top-bar" style={{ backgroundColor: '#f59e0b' }} />
        <div className="kpi-card-header">
          <div>
            <span className="kpi-title">Praktikum Lab Virtual</span>
            <div className="kpi-value">{labHours} Jam</div>
          </div>
          <div className="kpi-icon-box" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
            <span className="material-symbols-outlined">science</span>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '92%', backgroundColor: '#d97706' }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e' }}>92%</span>
        </div>
        <div className="kpi-meta">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>
            check_circle
          </span>
          <span>6 dari 7 Laporan Terverifikasi Guru</span>
        </div>
      </div>

      {/* KPI 4: Model Anatomi Dikuasai */}
      <div className="kpi-card">
        <div className="kpi-top-bar" style={{ backgroundColor: '#0891b2' }} />
        <div className="kpi-card-header">
          <div>
            <span className="kpi-title">Model Anatomi Dikuasai</span>
            <div className="kpi-value">{anatomyModels} Model</div>
          </div>
          <div className="kpi-icon-box" style={{ backgroundColor: '#cffafe', color: '#164e63' }}>
            <span className="material-symbols-outlined">view_in_ar</span>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <span
            style={{
              display: 'inline-flex',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#ecfeff',
              border: '1px solid #a5f3fc',
              color: '#0e7490',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Disseksi 3D: Interaktif
          </span>
        </div>
        <div className="kpi-meta">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#0e7490' }}>
            insights
          </span>
          <span>8 organ tumbuhan • 16 organ hewan</span>
        </div>
      </div>
    </section>
  )
}
