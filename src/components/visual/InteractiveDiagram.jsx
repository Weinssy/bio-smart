import { useState, useEffect } from 'react'
import './InteractiveDiagram.css'

export default function InteractiveDiagram({ diagram }) {
  const [activePartId, setActivePartId] = useState(null)
  
  // Mode: 'explore' | 'identify'
  const [mode, setMode] = useState('explore')

  // Identify Mode State
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isIdentifyFinished, setIsIdentifyFinished] = useState(false)
  const [feedback, setFeedback] = useState(null) // { status: 'correct'|'incorrect', message: '' }

  useEffect(() => {
    if (mode === 'identify') {
      startIdentifyQuiz()
    } else {
      setActivePartId(null)
      setFeedback(null)
    }
  }, [mode, diagram])

  const startIdentifyQuiz = () => {
    const parts = [...diagram.parts]
    // Shuffle parts
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }
    // Take up to 5 questions
    const selectedQuestions = parts.slice(0, 5)
    setQuestions(selectedQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setIsIdentifyFinished(false)
    setFeedback(null)
    setActivePartId(null)
  }

  const activePart = diagram.parts.find(p => p.id === activePartId)
  const currentTarget = questions[currentQuestionIndex]

  const handleHotspotClick = (partId) => {
    if (mode === 'explore') {
      setActivePartId(partId)
    } else if (mode === 'identify') {
      // Disable clicking if already answered correctly or finished
      if (feedback?.status === 'correct' || isIdentifyFinished) return

      setActivePartId(partId)
      
      if (partId === currentTarget.id) {
        setFeedback({
          status: 'correct',
          message: currentTarget.function || currentTarget.description
        })
        // Increment score only on first try if we want strict scoring, 
        // but here simple scoring: they get the point if they click it, 
        // wait, if they click wrong first, they shouldn't get the point?
        // The spec says: "Jawaban salah: Coba perhatikan kembali... Jangan langsung memberikan jawaban".
        // It implies they can try again. But does it give a point? 
        // Let's implement strict scoring: they get 1 point if they haven't failed this question yet.
        // We need a state for `hasAttempted`.
        // To keep it simple, we just give 1 point if they find it. Wait, if they just guess 5 times they get 100%.
        // Let's use a `hasFailedCurrent` state.
      } else {
        setFeedback({
          status: 'incorrect',
          message: 'Coba perhatikan kembali posisi bagian tersebut.'
        })
      }
    }
  }

  // Handle score awarding
  const [hasFailedCurrent, setHasFailedCurrent] = useState(false)

  useEffect(() => {
    if (mode === 'identify') {
      if (feedback?.status === 'incorrect') {
        setHasFailedCurrent(true)
      } else if (feedback?.status === 'correct' && !hasFailedCurrent) {
        setScore(s => s + 1)
      }
    }
  }, [feedback, mode])

  const handleNextQuestion = () => {
    setFeedback(null)
    setActivePartId(null)
    setHasFailedCurrent(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1)
    } else {
      setIsIdentifyFinished(true)
    }
  }

  return (
    <div className="interactive-diagram-container">
      <div className="diagram-header">
        <div className="diagram-header-top">
          <div className="diagram-header-text">
            <h3 className="diagram-title">{diagram.title}</h3>
            {diagram.description && mode === 'explore' && <p className="diagram-desc">{diagram.description}</p>}
            {mode === 'identify' && <p className="diagram-desc">Uji pemahamanmu dengan mengenali bagian diagram.</p>}
          </div>
          <div className="diagram-mode-switch">
            <button 
              className={`mode-btn ${mode === 'explore' ? 'active' : ''}`}
              onClick={() => setMode('explore')}
            >
              Eksplorasi
            </button>
            <button 
              className={`mode-btn ${mode === 'identify' ? 'active' : ''}`}
              onClick={() => setMode('identify')}
            >
              Kenali Bagian
            </button>
          </div>
        </div>
      </div>

      <div className="diagram-layout">
        {/* Left: Diagram Area */}
        <div className="diagram-visual-area">
          <div className="diagram-wrapper">
            <img 
              src={diagram.src.startsWith('http') ? diagram.src : `${import.meta.env.BASE_URL}${diagram.src.replace(/^\//, '')}`}
              alt={diagram.title} 
              className="diagram-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('image-error');
              }}
            />
            
            {/* Hotspots */}
            {diagram.parts.map((part, idx) => {
              const isTargetActive = activePartId === part.id;
              let hotspotClass = 'diagram-hotspot';
              
              if (isTargetActive) hotspotClass += ' active';
              if (mode === 'identify' && isTargetActive) {
                if (feedback?.status === 'correct') hotspotClass += ' correct';
                if (feedback?.status === 'incorrect') hotspotClass += ' incorrect';
              }

              return (
                <button
                  key={part.id}
                  type="button"
                  className={hotspotClass}
                  style={{ left: `${part.hotspot.x}%`, top: `${part.hotspot.y}%` }}
                  onClick={() => handleHotspotClick(part.id)}
                  aria-label={mode === 'explore' ? `Pilih bagian ${part.label}` : 'Pilih area ini'}
                >
                  {mode === 'explore' ? (
                    <span className="hotspot-number">{idx + 1}</span>
                  ) : (
                    <span className="hotspot-number">?</span>
                  )}
                  {mode === 'explore' && <span className="hotspot-label-tooltip">{part.label}</span>}
                </button>
              );
            })}
          </div>
          {diagram.caption && mode === 'explore' && <div className="diagram-caption">{diagram.caption}</div>}
        </div>

        {/* Right: Info Panel Area */}
        <div className="diagram-info-area">
          {mode === 'explore' ? (
            activePart ? (
              <div className="info-panel active-panel">
                <div className="info-panel-header">
                  <span className="info-panel-subtitle">Bagian Terpilih:</span>
                  <h4 className="info-panel-title">{activePart.label}</h4>
                </div>
                <div className="info-panel-body">
                  {activePart.description && (
                    <div className="info-section">
                      <strong>Deskripsi:</strong>
                      <p>{activePart.description}</p>
                    </div>
                  )}
                  {activePart.function && (
                    <div className="info-section">
                      <strong>Fungsi:</strong>
                      <p>{activePart.function}</p>
                    </div>
                  )}
                </div>
                <button className="btn-reset-selection" onClick={() => setActivePartId(null)}>
                  Tutup Detail
                </button>
              </div>
            ) : (
              <div className="info-panel empty-panel">
                <span className="material-symbols-outlined empty-icon">ads_click</span>
                <p>Klik salah satu penanda pada diagram untuk melihat detail struktur dan fungsinya.</p>
                
                <div className="legend-list">
                  <strong>Daftar Bagian:</strong>
                  <ul>
                    {diagram.parts.map((part, idx) => (
                      <li key={part.id} onClick={() => setActivePartId(part.id)} className="legend-item">
                        <span className="legend-number">{idx + 1}</span> {part.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ) : (
            /* Identify Mode Panel */
            <div className="info-panel identify-panel">
              {isIdentifyFinished ? (
                <div className="identify-result">
                  <div className="result-icon">
                    <span className="material-symbols-outlined">
                      {score / questions.length >= 0.8 ? 'emoji_events' : 'school'}
                    </span>
                  </div>
                  <h4 className="result-title">Selesai!</h4>
                  <div className="result-score">
                    Skor: <span>{score} / {questions.length}</span> ({Math.round(score/questions.length * 100)}%)
                  </div>
                  <div className="result-actions">
                    <button className="btn-primary" onClick={startIdentifyQuiz}>Ulangi Kuis</button>
                    <button className="btn-secondary" onClick={() => setMode('explore')}>Pelajari Lagi</button>
                  </div>
                </div>
              ) : (
                <div className="identify-question">
                  <div className="question-progress">
                    Soal {currentQuestionIndex + 1} dari {questions.length}
                  </div>
                  <h4 className="question-title">Kenali Bagian</h4>
                  <p className="question-instruction">Bagian manakah yang disebut:</p>
                  <div className="question-target">"{currentTarget?.label}"</div>
                  
                  {feedback ? (
                    <div className={`feedback-card ${feedback.status}`}>
                      <div className="feedback-header">
                        <span className="material-symbols-outlined">
                          {feedback.status === 'correct' ? 'check_circle' : 'cancel'}
                        </span>
                        <strong>{feedback.status === 'correct' ? 'Benar!' : 'Belum tepat.'}</strong>
                      </div>
                      <p className="feedback-message">{feedback.message}</p>
                      
                      {feedback.status === 'correct' && (
                        <button className="btn-next" onClick={handleNextQuestion}>
                          Lanjut
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="question-waiting">
                      Klik penanda yang menurutmu benar pada diagram.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
