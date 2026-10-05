import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

import LabSimulation from '../components/lab/LabSimulation'

export default function LabPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* Welcome Banner */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-800 text-white border-none mb-8">
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] opacity-10 text-white pointer-events-none">science</span>
            <CardContent className="p-8 relative z-10 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none flex w-fit items-center gap-1.5 px-3 py-1">
                  <span className="material-symbols-outlined text-[16px]">experiment</span>
                  Praktikum Virtual • Eksperimen Membran
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">
                  Laboratorium Virtual: Transport Pasif (Osmosis)
                </h1>
                
                <p className="text-blue-50 text-base md:text-lg max-w-xl">
                  Amati fenomena plasmolisis, turgiditas, dan hemolisis secara interaktif dengan memodifikasi konsentrasi larutan ekstraseluler secara langsung.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Simulation Module */}
          <section className="mb-8">
            <LabSimulation />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
