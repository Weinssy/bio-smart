import { useState, useMemo } from 'react'
import { useProgress } from '../../context/ProgressContext'
import quizDataset from '../../data/quizData.json'

export default function QuizEngine({ quizId = 'quiz-sel' }) {
  const { progress, submitQuizResult } = useProgress()

  const currentQuizData = useMemo(() => {
    return quizDataset.quizzes.find((q) => q.id === quizId) || quizDataset.quizzes[0]
  }, [quizId])

  const questions = currentQuizData.questions || []
  const passingGrade = currentQuizData.passingGrade || 75

  // State kuis
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // { [questionId]: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  // Ambil histori pengerjaan dari ProgressContext jika ada
  const existingQuizRecord = useMemo(() => {
    return progress?.quizzes?.find((q) => q.id === currentQuizData.id)
  }, [progress, currentQuizData.id])

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const answeredCount = Object.keys(userAnswers).length
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100)

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)

    // Panggil logika penilaian ke ProgressContext (memperbarui localStorage & React state)
    const result = submitQuizResult({
      quizId: currentQuizData.id,
      score,
      moduleId: currentQuizData.moduleId,
      passingGrade,
    })

    setSubmissionResult({
      score,
      correctCount,
      totalQuestions: questions.length,
      isPassed: result.isPassed,
    })
    setIsSubmitted(true)
  }

  const handleRetake = () => {
    setUserAnswers({})
    setCurrentIndex(0)
    setIsSubmitted(false)
    setSubmissionResult(null)
  }

  return (
    <div className="quiz-engine-card" style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      {/* Quiz Top Bar with Title and Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {currentQuizData.topic} • KKM: {passingGrade}
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-on-surface)', marginTop: '0.2rem' }}>
            {currentQuizData.title}
          </h2>
        </div>

        {existingQuizRecord && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface-container-low)', border: '1px solid rgba(191,201,194,0.4)', fontSize: '0.75rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: existingQuizRecord.is_passed ? '#059669' : '#d97706' }}>
              {existingQuizRecord.is_passed ? 'check_circle' : 'history'}
            </span>
            <div>
              <span style={{ fontWeight: 600, display: 'block' }}>
                Nilai Tertinggi: {existingQuizRecord.highest_score ?? existingQuizRecord.score}/100
              </span>
              <span style={{ color: 'var(--color-on-surface-variant)' }}>
                {existingQuizRecord.attempts || 1}x percobaan • Status: {existingQuizRecord.status || 'Tuntas'}
              </span>
            </div>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        /* WIZARD VIEW: One Question Per Page */
        <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid rgba(191,201,194,0.4)', boxShadow: 'var(--shadow-level-1)' }}>
          {/* Progress Indicator */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                Soal {currentIndex + 1} dari {questions.length}
              </span>
              <span>
                Terjawab: {answeredCount} / {questions.length}
              </span>
            </div>
            <div className="progress-track" style={{ height: '8px' }}>
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%`, backgroundColor: 'var(--color-primary-container)' }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.6 }}>
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = userAnswers[currentQuestion.id] === optIdx
              const optionLetters = ['A', 'B', 'C', 'D']

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: isSelected
                      ? '2px solid var(--color-primary-container)'
                      : '1px solid rgba(191,201,194,0.4)',
                    backgroundColor: isSelected
                      ? 'rgba(181, 235, 212, 0.25)'
                      : 'var(--color-surface-container-lowest)',
                    color: 'var(--color-on-surface)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(13,92,70,0.08)' : 'none',
                  }}
                >
                  <span
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                      backgroundColor: isSelected
                        ? 'var(--color-primary-container)'
                        : 'var(--color-surface-container-low)',
                      color: isSelected ? '#ffffff' : 'var(--color-on-surface)',
                    }}
                  >
                    {optionLetters[optIdx]}
                  </span>
                  <span style={{ fontSize: '0.95rem', lineHeight: 1.5, flex: 1 }}>{option}</span>
                </button>
              )
            })}
          </div>

          {/* Wizard Footer Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid rgba(191,201,194,0.3)' }}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(191,201,194,0.6)',
                background: 'transparent',
                color: currentIndex === 0 ? '#94a3b8' : 'var(--color-on-surface)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              <span>Sebelumnya</span>
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={answeredCount < questions.length}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: answeredCount === questions.length ? 'var(--color-primary-container)' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: answeredCount === questions.length ? 'pointer' : 'not-allowed',
                  boxShadow: answeredCount === questions.length ? '0 2px 8px rgba(13,92,70,0.25)' : 'none',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                <span>Kirim Jawaban</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-container)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                <span>Selanjutnya</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RESULTS & REVIEW VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Result Card */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              textAlign: 'center',
              border: '1px solid rgba(191,201,194,0.4)',
              boxShadow: 'var(--shadow-level-2)',
            }}
          >
            <div
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                margin: '0 auto 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: submissionResult?.isPassed ? '#dcfce7' : '#ffe4e6',
                color: submissionResult?.isPassed ? '#15803d' : '#be123c',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '42px' }}>
                {submissionResult?.isPassed ? 'emoji_events' : 'replay'}
              </span>
            </div>

            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                backgroundColor: submissionResult?.isPassed ? '#ecfdf5' : '#fff1f2',
                color: submissionResult?.isPassed ? '#047857' : '#b91c1c',
                border: `1px solid ${submissionResult?.isPassed ? '#a7f3d0' : '#fecdd3'}`,
                marginBottom: '0.75rem',
              }}
            >
              {submissionResult?.isPassed ? 'LULUS KKM (TUNTAS)' : 'BELUM MEMENUHI KKM'}
            </span>

            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-on-surface)' }}>
              {submissionResult?.score} <span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>/ 100</span>
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', maxWidth: '32rem', margin: '0.75rem auto 1.5rem', lineHeight: 1.5 }}>
              {submissionResult?.isPassed
                ? 'Luar biasa! Skor Anda telah melampaui KKM 75. Modul Biologi Sel pada akun Anda kini berstatus Tuntas.'
                : 'Nilai belum mencapai standar ketuntasan minimal (75). Tinjau kembali kunci jawaban di bawah untuk memperdalam pemahaman.'}
            </p>

            <button
              type="button"
              onClick={handleRetake}
              className="btn-export"
              style={{ margin: '0 auto', padding: '0.65rem 1.5rem' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
              <span>Ulangi Kuis Formatif</span>
            </button>
          </div>

          {/* Detailed Question Review List */}
          <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid rgba(191,201,194,0.4)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-on-surface)' }}>
              Pembahasan & Kunci Jawaban
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {questions.map((q, idx) => {
                const userChoice = userAnswers[q.id]
                const isCorrect = userChoice === q.correctIndex

                return (
                  <div
                    key={q.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecdd3'}`,
                      backgroundColor: isCorrect ? '#f0fdf4' : '#fff1f2',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-on-surface)' }}>
                        {idx + 1}. {q.question}
                      </p>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2',
                          color: isCorrect ? '#15803d' : '#b91c1c',
                          flexShrink: 0,
                        }}
                      >
                        {isCorrect ? 'Benar (+20)' : 'Salah (0)'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      <p style={{ color: isCorrect ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
                        <strong>Jawaban Anda:</strong> {q.options[userChoice] ?? 'Tidak Dijawab'}
                      </p>
                      {!isCorrect && (
                        <p style={{ color: '#15803d' }}>
                          <strong>Kunci Jawaban yang Benar:</strong> {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>

                    <div style={{ padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
                      <strong>Penjelasan Ilmiah:</strong> {q.explanation}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
