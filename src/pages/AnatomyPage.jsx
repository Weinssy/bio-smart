import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Toast from '../components/common/Toast'
import AnatomyViewer from '../components/anatomy/AnatomyViewer'

export default function AnatomyPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* Header Banner */}
          <section className="welcome-banner" style={{ padding: '1.5rem 2rem' }}>
            <span className="material-symbols-outlined banner-bg-motif">view_in_ar</span>
            <div className="banner-content">
              <div>
                <div className="curriculum-tag">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>biotech</span>
                  <span>Laboratorium Anatomi 3D • Eksplorasi Organ & Sel</span>
                </div>
                <h1 className="banner-title" style={{ fontSize: '1.75rem' }}>
                  Viewer Anatomi 3D Interaktif (Human Atlas & Sel)
                </h1>
                <p className="banner-sub">
                  Putar, perbesar, dan klik struktur organ atau organel sel di bawah ini untuk mempelajari morfologi serta fungsi biologisnya secara mendalam.
                </p>
              </div>
            </div>
          </section>

          {/* 3D Viewport Module */}
          <section style={{ height: '620px', width: '100%', position: 'relative' }}>
            <AnatomyViewer initialSpecimen="mitochondria" />
          </section>

          {/* Pedagogical Guide & Specimen Information */}
          <section className="bento-grid" style={{ marginTop: '0.5rem' }}>
            <div className="bento-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="logo-icon-box" style={{ width: '2.25rem', height: '2.25rem' }}>
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Petunjuk Interaksi 3D</h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.7 }}>
                <li><strong>Rotasi (Orbit):</strong> Klik kiri dan geser mouse untuk memutar sudut pandang 360 derajat.</li>
                <li><strong>Perbesar (Zoom):</strong> Gulir roda mouse (*scroll*) atau cubit layar (*pinch*) untuk memperbesar detail mikroskopis.</li>
                <li><strong>Geser (Pan):</strong> Klik kanan dan geser untuk memindahkan posisi fokus kamera.</li>
                <li><strong>Identifikasi:</strong> Klik langsung pada bagian organ/organel untuk melihat nama anatominya.</li>
              </ul>
            </div>

            <div className="bento-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="logo-icon-box" style={{ width: '2.25rem', height: '2.25rem', backgroundColor: 'var(--color-secondary)' }}>
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Kurikulum & Relevansi Materi</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                Modul ini terhubung dengan <strong>Bab 1 (Biologi Sel)</strong> dan <strong>Bab 3 (Sistem Peredaran Darah & Sistem Saraf)</strong> pada silabus Biologi SMA Fase F (Kurikulum Merdeka).
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <Toast />
    </div>
  )
}
