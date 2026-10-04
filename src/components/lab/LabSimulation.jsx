import { useState, useMemo } from 'react'

export default function LabSimulation() {
  // Konsentrasi garam NaCl dalam % (fisiologis isotonik = 0.9%)
  const [concentration, setConcentration] = useState(0.9)
  const [cellType, setCellType] = useState('animal') // 'animal' (eritrosit) atau 'plant' (sel tumbuhan)
  const [isSimulating] = useState(true)

  // Status osmosis berdasarkan rentang konsentrasi
  const tonicity = useMemo(() => {
    if (concentration < 0.8) return 'hypotonic'
    if (concentration > 1.2) return 'hypertonic'
    return 'isotonic'
  }, [concentration])

  // Parameter visual dinamis
  const simulationMetrics = useMemo(() => {
    // Skala sel: Hipotonik membesar (hingga 1.4x), Isotonik normal (1.0x), Hipertonik mengerut (hingga 0.6x)
    let cellScale = 1.0
    let cellStatus = 'Normal (Bikonkaf Sehat)'
    let waterDirection = 'Kesetimbangan Dinamis (Masuk = Keluar)'
    let arrowColor = '#0284c7'
    let isLysed = false

    if (tonicity === 'hypotonic') {
      const severity = (0.9 - concentration) / 0.9 // 0 s.d. 1
      cellScale = 1.0 + severity * 0.45
      if (cellType === 'animal') {
        if (concentration <= 0.2) {
          isLysed = true
          cellStatus = 'Hemolisis (Sel Pecah/Lisis)'
        } else {
          cellStatus = 'Pembengkakan Sel (Turgid Tinggi)'
        }
      } else {
        cellStatus = 'Turgid Maksimal (Dinding Sel Menahan Tekanan)'
      }
      waterDirection = 'Netto Air Masuk ke Dalam Sel (Endosmosis)'
      arrowColor = '#059669'
    } else if (tonicity === 'hypertonic') {
      const severity = Math.min(1, (concentration - 0.9) / 4.0)
      cellScale = Math.max(0.55, 1.0 - severity * 0.45)
      if (cellType === 'animal') {
        cellStatus = 'Krenasi (Sel Mengkerut & Berlekuk)'
      } else {
        cellStatus = 'Plasmolisis (Protoplas Lepas dari Dinding Sel)'
      }
      waterDirection = 'Netto Air Keluar ke Larutan (Eksosmosis)'
      arrowColor = '#dc2626'
    }

    return {
      scale: cellScale,
      status: cellStatus,
      direction: waterDirection,
      arrowColor,
      isLysed,
      waterPotential: (0.9 - concentration).toFixed(2),
    }
  }, [concentration, tonicity, cellType])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* Simulation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Praktikum Virtual • Laboratorium Biologi Sel
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-on-surface)', marginTop: '0.2rem' }}>
            Simulasi Osmosis & Tekanan Turgor pada Membran Sel
          </h2>
        </div>

        {/* Specimen Switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'var(--color-surface-container-low)', padding: '0.3rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(191,201,194,0.4)' }}>
          <button
            type="button"
            onClick={() => setCellType('animal')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              backgroundColor: cellType === 'animal' ? 'var(--color-primary-container)' : 'transparent',
              color: cellType === 'animal' ? '#ffffff' : 'var(--color-on-surface)',
              transition: 'all 0.15s',
            }}
          >
            Sel Hewan (Eritrosit)
          </button>
          <button
            type="button"
            onClick={() => setCellType('plant')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              backgroundColor: cellType === 'plant' ? 'var(--color-primary-container)' : 'transparent',
              color: cellType === 'plant' ? '#ffffff' : 'var(--color-on-surface)',
              transition: 'all 0.15s',
            }}
          >
            Sel Tumbuhan (Berdinding)
          </button>
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 360px', gap: '1.5rem' }}>
        {/* Left Column: 2D Interactive SVG Chamber */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            border: '1px solid rgba(191,201,194,0.4)',
            boxShadow: 'var(--shadow-level-1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Beaker Chamber Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>science</span>
              Beaker Larutan Ekstraseluler
            </span>
            <span
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor:
                  tonicity === 'hypotonic' ? '#ecfdf5' : tonicity === 'hypertonic' ? '#fff1f2' : '#eff6ff',
                color:
                  tonicity === 'hypotonic' ? '#047857' : tonicity === 'hypertonic' ? '#b91c1c' : '#1d4ed8',
                border: `1px solid ${
                  tonicity === 'hypotonic' ? '#a7f3d0' : tonicity === 'hypertonic' ? '#fecdd3' : '#bfdbfe'
                }`,
              }}
            >
              Larutan: {tonicity.toUpperCase()} ({concentration}% NaCl)
            </span>
          </div>

          {/* SVG Canvas Stage */}
          <div style={{ position: 'relative', width: '100%', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              viewBox="0 0 500 360"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
              aria-label="Visualisasi Osmosis Sel"
            >
              {/* Beaker Glass Container */}
              <defs>
                <linearGradient id="fluidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity={0.4 + concentration * 0.08} />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity={0.6 + concentration * 0.08} />
                </linearGradient>

                <filter id="cellShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0d5c46" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Background Fluid */}
              <rect x="40" y="30" width="420" height="300" rx="16" fill="url(#fluidGradient)" stroke="#94a3b8" strokeWidth="2" />

              {/* Water Molecule Particles (Simulated floating H2O) */}
              {isSimulating && (
                <g opacity="0.6">
                  <circle cx="80" cy="80" r="3" fill="#0284c7" />
                  <circle cx="120" cy="190" r="3" fill="#0284c7" />
                  <circle cx="90" cy="270" r="3" fill="#0284c7" />
                  <circle cx="410" cy="90" r="3" fill="#0284c7" />
                  <circle cx="390" cy="220" r="3" fill="#0284c7" />
                  <circle cx="420" cy="280" r="3" fill="#0284c7" />
                  <circle cx="250" cy="50" r="3" fill="#0284c7" />
                  <circle cx="250" cy="310" r="3" fill="#0284c7" />
                </g>
              )}

              {/* CELL MORPHOLOGY REPRESENTATION */}
              {cellType === 'animal' ? (
                /* ERITROSIT / SEL HEWAN */
                <g
                  transform={`translate(250, 180) scale(${simulationMetrics.scale})`}
                  style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  filter="url(#cellShadow)"
                >
                  {!simulationMetrics.isLysed ? (
                    <>
                      {/* Outer Cell Membrane */}
                      <path
                        d={
                          tonicity === 'hypertonic'
                            ? 'M -70 0 C -70 -40 -35 -65 0 -60 C 35 -65 70 -40 70 0 C 65 35 40 70 0 65 C -40 70 -65 35 -70 0 Z'
                            : 'M -75 0 C -75 -45 -45 -75 0 -75 C 45 -75 75 -45 75 0 C 75 45 45 75 0 75 C -45 75 -75 45 -75 0 Z'
                        }
                        fill={tonicity === 'hypotonic' ? '#f43f5e' : '#e11d48'}
                        stroke="#9f1239"
                        strokeWidth="3.5"
                      />
                      {/* Biconcave Center Dimple */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="32"
                        ry="24"
                        fill="#be123c"
                        opacity={tonicity === 'hypotonic' ? 0.3 : 0.65}
                      />
                      <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">
                        Eritrosit
                      </text>
                    </>
                  ) : (
                    /* Lysed Fragments */
                    <g>
                      <circle cx="-30" cy="-20" r="22" fill="#e11d48" opacity="0.6" />
                      <circle cx="35" cy="15" r="18" fill="#e11d48" opacity="0.5" />
                      <circle cx="0" cy="30" r="14" fill="#e11d48" opacity="0.4" />
                      <circle cx="-10" cy="-35" r="12" fill="#be123c" opacity="0.7" />
                      <text x="0" y="5" textAnchor="middle" fill="#b91c1c" fontSize="14" fontWeight="800">
                        LISIS! (Pecah)
                      </text>
                    </g>
                  )}
                </g>
              ) : (
                /* SEL TUMBUHAN */
                <g transform="translate(250, 180)">
                  {/* Rigid Cell Wall (Tetap Kaku) */}
                  <rect
                    x="-95"
                    y="-95"
                    width="190"
                    height="190"
                    rx="14"
                    fill="none"
                    stroke="#15803d"
                    strokeWidth="6"
                  />
                  <rect
                    x="-88"
                    y="-88"
                    width="176"
                    height="176"
                    rx="10"
                    fill="#f0fdf4"
                    stroke="#86efac"
                    strokeWidth="2"
                  />

                  {/* Plasma Membrane & Protoplas (Menyusut saat plasmolisis) */}
                  <g
                    transform={`scale(${simulationMetrics.scale * 0.95})`}
                    style={{ transition: 'transform 0.4s ease' }}
                  >
                    <rect
                      x="-80"
                      y="-80"
                      width="160"
                      height="160"
                      rx="12"
                      fill="#bbf7d0"
                      stroke="#16a34a"
                      strokeWidth="3"
                    />

                    {/* Vakuola Sentral */}
                    <circle
                      cx="0"
                      cy="0"
                      r={36 * simulationMetrics.scale}
                      fill="#38bdf8"
                      opacity="0.6"
                      stroke="#0284c7"
                      strokeWidth="2"
                    />
                    <text x="0" y="4" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="700">
                      Vakuola
                    </text>
                  </g>

                  {/* Kloroplas & Inti */}
                  <circle cx="-50" cy="-50" r="8" fill="#15803d" />
                  <circle cx="50" cy="-45" r="8" fill="#15803d" />
                  <circle cx="-45" cy="50" r="8" fill="#15803d" />
                </g>
              )}

              {/* Water Flux Arrows */}
              {tonicity === 'hypotonic' && (
                <g stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrow)">
                  {/* Arrows pointing inward */}
                  <line x1="120" y1="180" x2="165" y2="180" />
                  <line x1="380" y1="180" x2="335" y2="180" />
                  <line x1="250" y1="80" x2="250" y2="115" />
                  <line x1="250" y1="280" x2="250" y2="245" />
                </g>
              )}

              {tonicity === 'hypertonic' && (
                <g stroke="#dc2626" strokeWidth="2.5">
                  {/* Arrows pointing outward */}
                  <line x1="180" y1="180" x2="135" y2="180" />
                  <line x1="320" y1="180" x2="365" y2="180" />
                  <line x1="250" y1="130" x2="250" y2="90" />
                  <line x1="250" y1="230" x2="250" y2="270" />
                </g>
              )}
            </svg>
          </div>

          {/* Real-time Visual Status Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface-container-low)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(191,201,194,0.4)', fontSize: '0.8rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>
              Kondisi Sel: <strong>{simulationMetrics.status}</strong>
            </span>
            <span style={{ color: simulationMetrics.arrowColor, fontWeight: 700 }}>
              {simulationMetrics.direction}
            </span>
          </div>
        </div>

        {/* Right Column: Controls & Scientific Measurement Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Slider Control Card */}
          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid rgba(191,201,194,0.4)', boxShadow: 'var(--shadow-level-1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label htmlFor="concentration-range" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                Konsentrasi Garam (NaCl)
              </label>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {concentration}%
              </span>
            </div>

            {/* Slider Input */}
            <input
              id="concentration-range"
              type="range"
              min="0.0"
              max="5.0"
              step="0.1"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary-container)', cursor: 'pointer' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', marginTop: '0.35rem' }}>
              <span>0% (Aquades Murni)</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>0.9% (Isotonik)</span>
              <span>5% (Pekat)</span>
            </div>

            {/* Presets Cluster */}
            <div style={{ marginTop: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '0.5rem' }}>
                Preset Larutan Standar:
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setConcentration(0.1)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #a7f3d0',
                    backgroundColor: concentration === 0.1 ? '#dcfce7' : 'transparent',
                    color: '#065f46',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Hipotonik (0.1%)
                </button>
                <button
                  type="button"
                  onClick={() => setConcentration(0.9)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #bfdbfe',
                    backgroundColor: concentration === 0.9 ? '#dbeafe' : 'transparent',
                    color: '#1e40af',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Isotonik (0.9%)
                </button>
                <button
                  type="button"
                  onClick={() => setConcentration(4.0)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #fecdd3',
                    backgroundColor: concentration === 4.0 ? '#fee2e2' : 'transparent',
                    color: '#991b1b',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Hipertonik (4.0%)
                </button>
              </div>
            </div>
          </div>

          {/* Scientific Physics Analysis Card */}
          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid rgba(191,201,194,0.4)', boxShadow: 'var(--shadow-level-1)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--color-on-surface)' }}>
              Parameter Biofisika Osmosis
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(191,201,194,0.3)' }}>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Potensial Air Relatif (Ψ):</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                  {simulationMetrics.waterPotential} MPa
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(191,201,194,0.3)' }}>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Tekanan Turgor Dinding:</span>
                <span style={{ fontWeight: 700 }}>
                  {cellType === 'plant' && tonicity === 'hypotonic' ? 'Maksimal (Tegak)' : 'Rendah/Nol'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(191,201,194,0.3)' }}>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Integritas Membran:</span>
                <span style={{ fontWeight: 700, color: simulationMetrics.isLysed ? '#dc2626' : '#059669' }}>
                  {simulationMetrics.isLysed ? 'Robek (Lisis)' : 'Utuh Terjaga'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container-low)', fontSize: '0.75rem', lineHeight: 1.5, color: '#334155' }}>
              <strong>Prinsip Osmosis:</strong> Molekul air (pelarut) berpindah menembus membran selektif permeabel dari larutan dengan konsentrasi zat terlarut rendah (potensial air tinggi) menuju larutan dengan konsentrasi zat terlarut lebih pekat (potensial air rendah).
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
