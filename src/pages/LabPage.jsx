import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import LabSimulation from '../components/lab/LabSimulation'

export default function LabPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* Welcome Banner */}
          <section className="welcome-banner" style={{ padding: '1.5rem 2rem' }}>
            <span className="material-symbols-outlined banner-bg-motif">science</span>
            <div className="banner-content">
              <div>
                <div className="curriculum-tag">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>experiment</span>
                  <span>Praktikum Virtual • Eksperimen Membran</span>
                </div>
                <h1 className="banner-title" style={{ fontSize: '1.75rem' }}>
                  Laboratorium Virtual: Transport Pasif (Osmosis)
                </h1>
                <p className="banner-sub">
                  Amati fenomena plasmolisis, turgiditas, dan hemolisis secara interaktif dengan memodifikasi konsentrasi larutan ekstraseluler secara langsung.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Simulation Module */}
          <section style={{ margin: '1rem 0 2rem' }}>
            <LabSimulation />
          </section>
        </main>

        <Footer />
      </div>


    </div>
  )
}
