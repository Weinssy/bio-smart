import { Link } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'

export default function TopicCharts() {
  const { progress } = useProgress()
  const modules = progress?.modules || []

  // Fallback default modules jika data kosong
  const displayModules =
    modules.length > 0
      ? modules.slice(0, 4)
      : [
          { name: 'Biologi Sel', hours: 16, masteryPercent: 88 },
          { name: 'Genetika & Hereditas', hours: 12.5, masteryPercent: 76 },
          { name: 'Sistem Pencernaan', hours: 17.8, masteryPercent: 94 },
          { name: 'Ekologi & Biodiversitas', hours: 9.5, masteryPercent: 85 },
        ]

  // Hitung tingkat pemahaman
  const highMasteryCount = displayModules.filter((m) => (m.masteryPercent || 0) >= 85).length
  const medMasteryCount = displayModules.filter((m) => (m.masteryPercent || 0) >= 75 && (m.masteryPercent || 0) < 85).length
  const _lowMasteryCount = displayModules.filter((m) => (m.masteryPercent || 0) < 75).length
  const total = displayModules.length || 1

  const highPct = Math.round((highMasteryCount / total) * 100)
  const medPct = Math.round((medMasteryCount / total) * 100)
  const lowPct = Math.max(0, 100 - highPct - medPct)

  return (
    <section className="charts-grid" aria-label="Grafik Analitik Pembelajaran">
      {/* Chart 1: SVG Bar Chart */}
      <div className="chart-card">
        <div>
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Distribusi Waktu Belajar & Penguasaan Materi</h3>
              <p className="chart-desc">Perbandingan jam belajar mandiri dan skor evaluasi modul semester ini</p>
            </div>
            <div className="chart-legends">
              <span className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--color-primary-container)' }} />
                <span>Jam Belajar</span>
              </span>
              <span className="legend-item">
                <span className="legend-color" style={{ backgroundColor: 'var(--color-secondary-fixed-dim)' }} />
                <span>Penguasaan (%)</span>
              </span>
            </div>
          </div>

          {/* Responsive SVG Bar Chart */}
          <div style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem', overflowX: 'auto' }}>
            <svg
              className="chart-svg"
              viewBox="0 0 700 240"
              style={{ width: '100%', height: '16rem', overflow: 'visible' }}
              aria-label="Grafik Distribusi Jam Belajar dan Penguasaan"
            >
              {/* Grid Lines */}
              <line stroke="#E2E8F0" strokeDasharray="4 4" x1="40" x2="680" y1="20" y2="20" />
              <line stroke="#E2E8F0" strokeDasharray="4 4" x1="40" x2="680" y1="70" y2="70" />
              <line stroke="#E2E8F0" strokeDasharray="4 4" x1="40" x2="680" y1="120" y2="120" />
              <line stroke="#E2E8F0" strokeDasharray="4 4" x1="40" x2="680" y1="170" y2="170" />
              <line stroke="#CBD5E1" strokeWidth="1.5" x1="40" x2="680" y1="210" y2="210" />

              {/* Y Axis Labels */}
              <text fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="end" x="30" y="24">20 Jam</text>
              <text fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="end" x="30" y="74">15 Jam</text>
              <text fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="end" x="30" y="124">10 Jam</text>
              <text fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="end" x="30" y="174">5 Jam</text>
              <text fill="#94A3B8" fontSize="10" fontFamily="sans-serif" textAnchor="end" x="30" y="214">0</text>

              {/* Dynamic Module Bars */}
              {displayModules.map((mod, index) => {
                const groupX = 85 + index * 150
                const hours = Number(mod.hours) || 10
                const score = Number(mod.masteryPercent) || 75

                // Skala tinggi: 20 jam = height 190, y = 210 - (hours / 20) * 190
                const bar1Height = Math.min(190, Math.max(10, (hours / 20) * 190))
                const bar1Y = 210 - bar1Height

                // Skor 100% = height 150
                const bar2Height = Math.min(180, Math.max(10, (score / 100) * 150))
                const bar2Y = 210 - bar2Height

                return (
                  <g key={mod.id || index} style={{ cursor: 'pointer' }}>
                    {/* Bar 1: Jam Belajar */}
                    <rect
                      x={groupX}
                      y={bar1Y}
                      width="34"
                      height={bar1Height}
                      rx="4"
                      fill="var(--color-primary-container)"
                    >
                      <title>{`${mod.name}: ${hours} Jam Belajar`}</title>
                    </rect>

                    {/* Bar 2: Skor Penguasaan */}
                    <rect
                      x={groupX + 40}
                      y={bar2Y}
                      width="34"
                      height={bar2Height}
                      rx="4"
                      fill="var(--color-secondary-fixed-dim)"
                    >
                      <title>{`${mod.name}: ${score}% Penguasaan`}</title>
                    </rect>

                    {/* Label Bab */}
                    <text
                      x={groupX + 37}
                      y="230"
                      fill="#334155"
                      fontWeight="600"
                      fontSize="11"
                      textAnchor="middle"
                    >
                      {mod.name.length > 16 ? mod.name.slice(0, 14) + '...' : mod.name}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(191,201,194,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-tertiary-container)' }}>
              tips_and_updates
            </span>
            <span>
              Fokus Rekomendasi: Pendalaman materi <strong>Hukum Mendel II & Polimeri</strong> pada bab Genetika.
            </span>
          </span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Lihat Analisis Detail
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
          </span>
        </div>
      </div>

      {/* Chart 2: SVG Radial/Donut Chart */}
      <div className="chart-card">
        <div>
          <div className="chart-header">
            <h3 className="chart-title">Tingkat Pemahaman</h3>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-outline)' }} title="Kalkulasi dari kuis dan praktikum">
              help_outline
            </span>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0' }}>
            <svg style={{ width: '12rem', height: '12rem', transform: 'rotate(-90deg)' }} viewBox="0 0 200 200">
              {/* Circumference = 2 * PI * 75 = 471.24 */}
              <circle cx="100" cy="100" r="75" fill="none" stroke="#eff4ff" strokeWidth="22" />

              {/* Segment 1: Sangat Paham */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="var(--color-primary-container)"
                strokeWidth="22"
                strokeDasharray={`${(highPct / 100) * 471.24} 471.24`}
                strokeDashoffset="0"
              />

              {/* Segment 2: Cukup Paham */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="var(--color-tertiary-fixed-dim)"
                strokeWidth="22"
                strokeDasharray={`${(medPct / 100) * 471.24} 471.24`}
                strokeDashoffset={`-${(highPct / 100) * 471.24}`}
              />

              {/* Segment 3: Perlu Remedial */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="22"
                strokeDasharray={`${(lowPct / 100) * 471.24} 471.24`}
                strokeDashoffset={`-${((highPct + medPct) / 100) * 471.24}`}
              />
            </svg>

            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                85%
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                Tuntas SKM
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--color-primary-container)' }} />
                <span>Sangat Menguasai (&gt;85)</span>
              </div>
              <span style={{ fontWeight: 700 }}>{highPct}%</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--color-tertiary-fixed-dim)' }} />
                <span>Cukup Menguasai (75-84)</span>
              </div>
              <span style={{ fontWeight: 700 }}>{medPct}%</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
                <span>Perlu Pengulangan (&lt;75)</span>
              </div>
              <span style={{ fontWeight: 700, color: '#e11d48' }}>{lowPct}%</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(191,201,194,0.3)' }}>
          <Link
            to="/kuis"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(191,201,194,0.5)',
              background: 'transparent',
              color: 'var(--color-primary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>replay</span>
            <span>Jadwalkan Remedial Kuis</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
