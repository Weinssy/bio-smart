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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Simulation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Praktikum Virtual • Laboratorium Biologi Sel
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-on-surface)', marginTop: '0.25rem', fontFamily: 'var(--font-display)' }}>
            Simulasi Osmosis & Tekanan Turgor
          </h2>
        </div>

        {/* Specimen Switcher */}
        <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-container-low)', padding: '0.25rem', borderRadius: 'var(--radius-md)', gap: '0.25rem' }}>
          <button 
            onClick={() => setCellType('animal')}
            style={{ 
              padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              backgroundColor: cellType === 'animal' ? 'var(--color-surface)' : 'transparent',
              color: cellType === 'animal' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              boxShadow: cellType === 'animal' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Sel Hewan (Eritrosit)
          </button>
          <button 
            onClick={() => setCellType('plant')}
            style={{ 
              padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              backgroundColor: cellType === 'plant' ? 'var(--color-surface)' : 'transparent',
              color: cellType === 'plant' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              boxShadow: cellType === 'plant' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Sel Tumbuhan
          </button>
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: 2D Interactive SVG Chamber */}
        <div style={{ 
          gridColumn: '1 / span 2', 
          backgroundColor: 'var(--color-surface-container-lowest)', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid rgba(191, 201, 194, 0.4)', 
          boxShadow: 'var(--shadow-level-1)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: 'var(--color-surface-container-low)', borderBottom: '1px solid rgba(191, 201, 194, 0.3)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-on-surface)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '18px' }}>science</span>
              Beaker Larutan Ekstraseluler
            </div>
            <div style={{
              padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700,
              border: `1px solid ${tonicity === 'hypotonic' ? '#a7f3d0' : tonicity === 'hypertonic' ? '#fecdd3' : '#bfdbfe'}`,
              backgroundColor: tonicity === 'hypotonic' ? '#ecfdf5' : tonicity === 'hypertonic' ? '#fff1f2' : '#eff6ff',
              color: tonicity === 'hypotonic' ? '#047857' : tonicity === 'hypertonic' ? '#b91c1c' : '#1d4ed8'
            }}>
              Larutan: {tonicity.toUpperCase()} ({concentration}% NaCl)
            </div>
          </div>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', minHeight: '360px', padding: '1rem' }}>
            {/* SVG Canvas Stage */}
            <div style={{ width: '100%', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                {/* Water Molecule Particles */}
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
                  <g
                    transform={`translate(250, 180) scale(${simulationMetrics.scale})`}
                    style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    filter="url(#cellShadow)"
                  >
                    {!simulationMetrics.isLysed ? (
                      <>
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
                  <g transform="translate(250, 180)">
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
                    <circle cx="-50" cy="-50" r="8" fill="#15803d" />
                    <circle cx="50" cy="-45" r="8" fill="#15803d" />
                    <circle cx="-45" cy="50" r="8" fill="#15803d" />
                  </g>
                )}

                {/* Water Flux Arrows */}
                {tonicity === 'hypotonic' && (
                  <g stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrow)">
                    <line x1="120" y1="180" x2="165" y2="180" />
                    <line x1="380" y1="180" x2="335" y2="180" />
                    <line x1="250" y1="80" x2="250" y2="115" />
                    <line x1="250" y1="280" x2="250" y2="245" />
                  </g>
                )}

                {tonicity === 'hypertonic' && (
                  <g stroke="#dc2626" strokeWidth="2.5">
                    <line x1="180" y1="180" x2="135" y2="180" />
                    <line x1="320" y1="180" x2="365" y2="180" />
                    <line x1="250" y1="130" x2="250" y2="90" />
                    <line x1="250" y1="230" x2="250" y2="270" />
                  </g>
                )}
              </svg>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', backgroundColor: 'var(--color-surface-container-low)', borderTop: '1px solid rgba(191, 201, 194, 0.3)', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>
              Kondisi Sel: <strong style={{ marginLeft: '0.25rem' }}>{simulationMetrics.status}</strong>
            </span>
            <span style={{ fontWeight: 700, color: simulationMetrics.arrowColor }}>
              {simulationMetrics.direction}
            </span>
          </div>
        </div>

        {/* Right Column: Controls & Scientific Measurement Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Slider Control Card */}
          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(191, 201, 194, 0.4)', boxShadow: 'var(--shadow-level-1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                Konsentrasi Garam (NaCl)
              </label>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {concentration}%
              </span>
            </div>

            <input
              type="range"
              min="0.0"
              max="5.0"
              step="0.1"
              value={concentration}
              onChange={(e) => setConcentration(parseFloat(e.target.value))}
              style={{ width: '100%', margin: '1rem 0', accentColor: 'var(--color-primary)' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', marginTop: '0.5rem', textTransform: 'uppercase', fontWeight: 700 }}>
              <span>0% (Aquades)</span>
              <span style={{ color: 'var(--color-primary)' }}>0.9% (Iso)</span>
              <span>5% (Pekat)</span>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '0.75rem' }}>
                Preset Larutan Standar:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button
                  onClick={() => setConcentration(0.1)}
                  style={{
                    padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid #a7f3d0',
                    backgroundColor: concentration === 0.1 ? '#059669' : 'transparent',
                    color: concentration === 0.1 ? '#ffffff' : '#047857'
                  }}
                >
                  Hipotonik (0.1%)
                </button>
                <button
                  onClick={() => setConcentration(0.9)}
                  style={{
                    padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid #bfdbfe',
                    backgroundColor: concentration === 0.9 ? '#2563eb' : 'transparent',
                    color: concentration === 0.9 ? '#ffffff' : '#1d4ed8'
                  }}
                >
                  Isotonik (0.9%)
                </button>
                <button
                  onClick={() => setConcentration(4.0)}
                  style={{
                    padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid #fecdd3',
                    backgroundColor: concentration === 4.0 ? '#dc2626' : 'transparent',
                    color: concentration === 4.0 ? '#ffffff' : '#b91c1c'
                  }}
                >
                  Hipertonik (4.0%)
                </button>
              </div>
            </div>
          </div>

          {/* Scientific Physics Analysis Card */}
          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(191, 201, 194, 0.4)', boxShadow: 'var(--shadow-level-1)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(191, 201, 194, 0.3)' }}>
              Parameter Biofisika Osmosis
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(191,201,194,0.4)' }}>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Potensial Air Relatif (Ψ):</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                  {simulationMetrics.waterPotential} MPa
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(191,201,194,0.4)' }}>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Tekanan Turgor Dinding:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  {cellType === 'plant' && tonicity === 'hypotonic' ? 'Maksimal (Tegak)' : 'Rendah/Nol'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(191,201,194,0.4)' }}>
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Integritas Membran:</span>
                <span style={{ fontWeight: 700, color: simulationMetrics.isLysed ? '#dc2626' : '#059669' }}>
                  {simulationMetrics.isLysed ? 'Robek (Lisis)' : 'Utuh Terjaga'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#2563eb', position: 'absolute', left: '1rem', top: '1rem' }}>info</span>
              <div style={{ marginLeft: '1.75rem' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', margin: '0 0 0.25rem 0' }}>Prinsip Osmosis</h5>
                <p style={{ fontSize: '0.75rem', color: '#1e3a8a', margin: 0, lineHeight: 1.5 }}>
                  Molekul air (pelarut) berpindah menembus membran selektif permeabel dari larutan dengan konsentrasi zat terlarut rendah menuju larutan dengan konsentrasi zat terlarut tinggi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
