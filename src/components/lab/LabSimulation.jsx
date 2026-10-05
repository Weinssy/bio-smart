import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Slider } from '../ui/slider'
import { Badge } from '../ui/badge'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

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
    <div className="flex flex-col gap-6 w-full mx-auto max-w-6xl">
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Praktikum Virtual • Laboratorium Biologi Sel
          </span>
          <h2 className="text-2xl font-extrabold text-foreground mt-1 font-display">
            Simulasi Osmosis & Tekanan Turgor
          </h2>
        </div>

        {/* Specimen Switcher (using Tabs) */}
        <Tabs defaultValue="animal" className="w-full md:w-auto" onValueChange={(val) => setCellType(val)}>
          <TabsList className="grid w-full grid-cols-2 md:w-[320px]">
            <TabsTrigger value="animal">Sel Hewan (Eritrosit)</TabsTrigger>
            <TabsTrigger value="plant">Sel Tumbuhan</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: 2D Interactive SVG Chamber */}
        <Card className="lg:col-span-2 overflow-hidden shadow-sm flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">science</span>
              Beaker Larutan Ekstraseluler
            </CardTitle>
            <Badge 
              variant="outline" 
              className={`
                px-3 py-1 text-xs font-bold border rounded-full
                ${tonicity === 'hypotonic' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                ${tonicity === 'hypertonic' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                ${tonicity === 'isotonic' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
              `}
            >
              Larutan: {tonicity.toUpperCase()} ({concentration}% NaCl)
            </Badge>
          </CardHeader>
          
          <CardContent className="p-0 relative flex items-center justify-center bg-white dark:bg-black/20 min-h-[360px]">
            {/* SVG Canvas Stage */}
            <div className="relative w-full h-[360px] flex items-center justify-center overflow-visible">
              <svg
                viewBox="0 0 500 360"
                className="w-full h-full overflow-visible"
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
          </CardContent>

          {/* Real-time Visual Status Indicator */}
          <div className="flex justify-between items-center bg-muted px-6 py-3 border-t text-sm">
            <span className="font-semibold text-foreground">
              Kondisi Sel: <strong className="ml-1">{simulationMetrics.status}</strong>
            </span>
            <span className="font-bold" style={{ color: simulationMetrics.arrowColor }}>
              {simulationMetrics.direction}
            </span>
          </div>
        </Card>

        {/* Right Column: Controls & Scientific Measurement Panel */}
        <div className="flex flex-col gap-6">
          {/* Slider Control Card */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-end mb-6">
                <label className="text-sm font-bold text-foreground">
                  Konsentrasi Garam (NaCl)
                </label>
                <span className="font-display text-2xl font-extrabold text-primary">
                  {concentration}%
                </span>
              </div>

              {/* Slider Input via Shadcn */}
              <Slider
                value={[concentration]}
                max={5.0}
                min={0.0}
                step={0.1}
                onValueChange={(val) => setConcentration(val[0])}
                className="my-4"
              />

              <div className="flex justify-between text-[11px] text-muted-foreground mt-2 uppercase font-semibold">
                <span>0% (Aquades)</span>
                <span className="text-primary font-bold">0.9% (Iso)</span>
                <span>5% (Pekat)</span>
              </div>

              {/* Presets Cluster */}
              <div className="mt-8">
                <span className="text-xs font-semibold text-muted-foreground block mb-3">
                  Preset Larutan Standar:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={concentration === 0.1 ? 'default' : 'outline'}
                    className={`cursor-pointer px-3 py-1.5 ${concentration === 0.1 ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-emerald-700 hover:bg-emerald-50 border-emerald-200'}`}
                    onClick={() => setConcentration(0.1)}
                  >
                    Hipotonik (0.1%)
                  </Badge>
                  <Badge
                    variant={concentration === 0.9 ? 'default' : 'outline'}
                    className={`cursor-pointer px-3 py-1.5 ${concentration === 0.9 ? 'bg-blue-600 hover:bg-blue-700' : 'text-blue-700 hover:bg-blue-50 border-blue-200'}`}
                    onClick={() => setConcentration(0.9)}
                  >
                    Isotonik (0.9%)
                  </Badge>
                  <Badge
                    variant={concentration === 4.0 ? 'default' : 'outline'}
                    className={`cursor-pointer px-3 py-1.5 ${concentration === 4.0 ? 'bg-red-600 hover:bg-red-700' : 'text-red-700 hover:bg-red-50 border-red-200'}`}
                    onClick={() => setConcentration(4.0)}
                  >
                    Hipertonik (4.0%)
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scientific Physics Analysis Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Parameter Biofisika Osmosis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Potensial Air Relatif (Ψ):</span>
                  <span className="font-bold text-primary">
                    {simulationMetrics.waterPotential} MPa
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Tekanan Turgor Dinding:</span>
                  <span className="font-bold">
                    {cellType === 'plant' && tonicity === 'hypotonic' ? 'Maksimal (Tegak)' : 'Rendah/Nol'}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Integritas Membran:</span>
                  <span className={`font-bold ${simulationMetrics.isLysed ? 'text-destructive' : 'text-emerald-600'}`}>
                    {simulationMetrics.isLysed ? 'Robek (Lisis)' : 'Utuh Terjaga'}
                  </span>
                </div>
              </div>

              <Alert className="mt-6 bg-blue-50/50 border-blue-100 text-blue-900">
                <span className="material-symbols-outlined h-4 w-4 text-blue-600 absolute left-4 top-4">info</span>
                <AlertTitle className="text-sm font-bold text-blue-800">Prinsip Osmosis</AlertTitle>
                <AlertDescription className="text-xs mt-1 leading-relaxed">
                  Molekul air (pelarut) berpindah menembus membran selektif permeabel dari larutan dengan konsentrasi zat terlarut rendah menuju larutan dengan konsentrasi zat terlarut tinggi.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
