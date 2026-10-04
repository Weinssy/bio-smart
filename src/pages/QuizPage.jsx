import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import QuizEngine from '../components/quiz/QuizEngine'

export default function QuizPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* Welcome Banner */}
          <section className="welcome-banner" style={{ padding: '1.5rem 2rem' }}>
            <span className="material-symbols-outlined banner-bg-motif">quiz</span>
            <div className="banner-content">
              <div>
                <div className="curriculum-tag">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>school</span>
                  <span>Evaluasi Mandiri • Kurikulum Merdeka</span>
                </div>
                <h1 className="banner-title" style={{ fontSize: '1.75rem' }}>
                  Modul Kuis Formatif Biologi
                </h1>
                <p className="banner-sub">
                  Uji pemahamanmu secara berkala. Cocokkan jawabanmu dengan kunci jawaban setelah kuis selesai.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz Engine Component */}
          <section style={{ margin: '1rem 0 2rem' }}>
            <QuizEngine quizId="quiz-sel" />
          </section>
        </main>

        <Footer />
      </div>


    </div>
  )
}
