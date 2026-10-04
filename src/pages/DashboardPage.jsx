import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import DataSyncBar from '../components/dashboard/DataSyncBar'
import KpiCards from '../components/dashboard/KpiCards'
import TopicCharts from '../components/dashboard/TopicCharts'
import BentoCards from '../components/dashboard/BentoCards'
import Footer from '../components/common/Footer'
import Toast from '../components/common/Toast'

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* SECTION 1: Welcome Header Banner */}
          <WelcomeBanner />

          {/* SECTION 2: Data Management Toolbar (Import & Export JSON) */}
          <DataSyncBar />

          {/* SECTION 3: Metric KPI Cards */}
          <KpiCards />

          {/* SECTION 4: Visual Analytics & Charts */}
          <TopicCharts />

          {/* SECTION 5: Bento Bottom Grid (Recent Lesson & Upcoming Tasks) */}
          <BentoCards />
        </main>

        <Footer />
      </div>

      {/* Toast Notification Container */}
      <Toast />
    </div>
  )
}
