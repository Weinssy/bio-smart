import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'


export default function AnatomyPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main className="dashboard-main" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Header Banner */}
          <section className="welcome-banner" style={{ padding: '1.5rem 2rem', margin: '0' }}>
            <span className="material-symbols-outlined banner-bg-motif">view_in_ar</span>
            <div className="banner-content">
              <div>
                <h1 className="banner-title" style={{ fontSize: '1.75rem' }}>
                  Eksplorasi Anatomi 3D (Human Atlas)
                </h1>
                <p className="banner-sub">
                  Putar, perbesar, dan klik struktur anatomi pada model 3D di bawah ini. Anda dapat menggunakan fitur pencarian untuk menemukan organ tertentu.
                </p>
              </div>
            </div>
          </section>

          {/* 3D Viewport Module using iframe */}
          <section style={{ flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://human-atlas-seven.vercel.app"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#ffffff'
              }}
              title="Human Atlas 3D Anatomy Viewer"
              allow="fullscreen"
            />
          </section>
        </main>

        <Footer />
      </div>


    </div>
  )
}
