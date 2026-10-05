import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

import QuizEngine from '../components/quiz/QuizEngine'

export default function QuizPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Header />

        <main className="dashboard-main">
          {/* Welcome Banner */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-teal-700 text-white border-none mb-8">
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] opacity-10 text-white pointer-events-none">quiz</span>
            <CardContent className="p-8 relative z-10 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none flex w-fit items-center gap-1.5 px-3 py-1">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  Evaluasi Mandiri • Kurikulum Merdeka
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">
                  Modul Kuis Formatif Biologi
                </h1>
                
                <p className="text-emerald-50 text-base md:text-lg max-w-xl">
                  Uji pemahamanmu secara berkala. Cocokkan jawabanmu dengan kunci jawaban setelah kuis selesai untuk memperdalam materi.
                </p>
              </div>
            </CardContent>
          </Card>

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
