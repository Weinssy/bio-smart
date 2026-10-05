import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import quizDataset from '../data/quizData.json'

import QuizEngine from '../components/quiz/QuizEngine'

export default function QuizPage() {
  const [searchParams] = useSearchParams()
  const initialQuizId = searchParams.get('quizId')
  const [selectedQuizId, setSelectedQuizId] = useState(initialQuizId)

  useEffect(() => {
    if (initialQuizId) {
      setSelectedQuizId(initialQuizId)
    }
  }, [initialQuizId])

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
                  Uji pemahamanmu secara berkala berdasarkan materi yang telah kamu pelajari.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz Selection or Quiz Engine */}
          <section style={{ margin: '1rem 0 2rem' }}>
            {selectedQuizId ? (
              <div>
                <button 
                  onClick={() => setSelectedQuizId(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    marginBottom: '1.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-outline)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    color: 'var(--color-on-surface-variant)',
                    fontWeight: 600
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                  Kembali ke Daftar Kuis
                </button>
                <QuizEngine quizId={selectedQuizId} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>Pilih Kuis Berdasarkan Materi</h3>
                <div className="quiz-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                  {quizDataset.quizzes.map((quiz) => (
                    <div 
                      key={quiz.id}
                      style={{
                        backgroundColor: 'var(--color-surface-container-lowest)',
                        border: '1px solid rgba(191,201,194,0.4)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        boxShadow: 'var(--shadow-level-1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          {quiz.topic}
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.5rem' }}>
                          {quiz.title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
                          {quiz.description}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedQuizId(quiz.id)}
                        className="btn-practical"
                        style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>play_circle</span>
                        Mulai Kuis
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
