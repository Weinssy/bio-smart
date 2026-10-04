import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import MateriCatalog from '../components/materi/MateriCatalog'

export default function MateriPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* Welcome Banner */}
          <section className="welcome-banner" style={{ padding: '1.5rem 2rem' }}>
            <span className="material-symbols-outlined banner-bg-motif">menu_book</span>
            <div className="banner-content">
              <div>
                <div className="curriculum-tag">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>school</span>
                  <span>Bahan Ajar • Kurikulum Merdeka Fase F</span>
                </div>
                <h1 className="banner-title" style={{ fontSize: '1.75rem' }}>
                  Katalog Materi Biologi SMA
                </h1>
                <p className="banner-sub">
                  Eksplorasi seluruh modul bahan ajar Biologi interaktif.
                </p>
              </div>
            </div>
          </section>

          {/* Module Catalog Grid */}
          <MateriCatalog />
        </main>

        <Footer />
      </div>


    </div>
  )
}
