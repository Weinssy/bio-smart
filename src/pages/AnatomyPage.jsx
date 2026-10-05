import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'

export default function AnatomyPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main className="dashboard-main" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column' }}>
          {/* 3D Viewport Module using iframe */}
          <section style={{ flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src={`${import.meta.env.BASE_URL}human-atlas/index.html`}
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
      </div>
    </div>
  )
}
