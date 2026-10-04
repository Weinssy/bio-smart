import { useState, useEffect, useMemo } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { resolveAsset, validateDiagramData } from '../../utils/assetResolver'
import './InteractiveDiagram.css'

export default function InteractiveDiagram({ diagram }) {
  const [activePartId, setActivePartId] = useState(null)
  const [mode, setMode] = useState('explore') // 'explore' | 'identify'
  const [imageError, setImageError] = useState(false)

  // Validate diagram in development
  useEffect(() => {
    if (diagram) {
      validateDiagramData(diagram)
    }
  }, [diagram])

  const parts = useMemo(() => {
    return Array.isArray(diagram?.parts) ? diagram.parts : []
  }, [diagram])

  // Identify Mode State
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [hasFailedCurrent, setHasFailedCurrent] = useState(false)
  const [isIdentifyFinished, setIsIdentifyFinished] = useState(false)
  const [feedback, setFeedback] = useState(null) // { status: 'correct' | 'incorrect', message: string }

  const startIdentifyQuiz = () => {
    if (parts.length === 0) {
      setQuestions([])
      setCurrentQuestionIndex(0)
      setScore(0)
      setHasFailedCurrent(false)
      setIsIdentifyFinished(false)
      setFeedback(null)
      setActivePartId(null)
      return
    }

    const shuffled = [...parts]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selectedQuestions = shuffled.slice(0, 5)
    setQuestions(selectedQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setHasFailedCurrent(false)
    setIsIdentifyFinished(false)
    setFeedback(null)
    setActivePartId(null)
  }

  // Handle mode changes cleanly without side-effect cascades
  const handleSwitchMode = (newMode) => {
    setMode(newMode)
    setActivePartId(null)
    setFeedback(null)
    if (newMode === 'identify') {
      startIdentifyQuiz()
    }
  }

  const activePart = parts.find(p => p.id === activePartId)
  const currentTarget = questions[currentQuestionIndex]

  const handleHotspotClick = (partId) => {
    if (mode === 'explore') {
      setActivePartId(partId)
      return
    }

    if (mode === 'identify') {
      // Disable interaction if already correct or finished or no target
      if (feedback?.status === 'correct' || isIdentifyFinished || !currentTarget) {
        return
      }

      setActivePartId(partId)

      if (partId === currentTarget.id) {
        // Point awarded only if user didn't fail on previous attempt for this question
        if (!hasFailedCurrent) {
          setScore(s => s + 1)
        }
        setFeedback({
          status: 'correct',
          message: currentTarget.function || currentTarget.description || 'Jawaban kamu tepat!'
        })
      } else {
        setHasFailedCurrent(true)
        setFeedback({
          status: 'incorrect',
          message: 'Coba perhatikan kembali posisi bagian tersebut.'
        })
      }
    }
  }

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

  const imageSrc = resolveAsset(diagram?.src)

  return (
    <div className="interactive-diagram-container">
      <div className="diagram-header">
        <div className="diagram-header-top">
          <div className="diagram-header-text">
            <h3 className="diagram-title">{diagram?.title || 'Diagram Interaktif'}</h3>
            {diagram?.description && mode === 'explore' && (
              <p className="diagram-desc">{diagram.description}</p>
            )}
            {mode === 'identify' && (
              <p className="diagram-desc">Uji pemahamanmu dengan mengenali bagian diagram.</p>
            )}
          </div>
          <div className="diagram-mode-switch">
            <button
              type="button"
              className={`mode-btn ${mode === 'explore' ? 'active' : ''}`}
              onClick={() => handleSwitchMode('explore')}
            >
              Eksplorasi
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === 'identify' ? 'active' : ''}`}
              onClick={() => handleSwitchMode('identify')}
            >
              Kenali Bagian
            </button>
          </div>
        </div>
      </div>

      <div className="diagram-layout">
        {/* Visual / Image Area */}
        <div className="diagram-visual-area">
          <div className="diagram-controls-hint">
            <span className="material-symbols-outlined">pinch</span> Gunakan dua jari / scroll untuk zoom & geser
          </div>

          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="zoom-controls">
                  <button type="button" onClick={() => zoomIn()} title="Perbesar (Zoom In)" aria-label="Perbesar Diagram">
                    <span className="material-symbols-outlined">zoom_in</span>
                  </button>
                  <button type="button" onClick={() => zoomOut()} title="Perkecil (Zoom Out)" aria-label="Perkecil Diagram">
                    <span className="material-symbols-outlined">zoom_out</span>
                  </button>
                  <button type="button" onClick={() => resetTransform()} title="Kembalikan Tampilan (Reset)" aria-label="Reset Posisi Diagram">
                    <span className="material-symbols-outlined">restart_alt</span>
                  </button>
                </div>

                <TransformComponent wrapperClass="diagram-transform-wrapper">
                  <div className="diagram-wrapper">
                    {imageError ? (
                      <div className="diagram-fallback">
                        <span className="material-symbols-outlined fallback-icon">broken_image</span>
                        <p>Diagram visual tidak dapat dimuat</p>
                      </div>
                    ) : (
                      <img
                        src={imageSrc}
                        alt={diagram?.title || 'Diagram visual'}
                        className="diagram-image"
                        loading="lazy"
                        onError={() => setImageError(true)}
                      />
                    )}

                    {/* Hotspot Markers */}
                    {!imageError && parts.map((part, idx) => {
                      const isTargetActive = activePartId === part.id
                      let hotspotClass = 'diagram-hotspot'

                      if (isTargetActive) hotspotClass += ' active'
                      if (mode === 'identify' && isTargetActive) {
                        if (feedback?.status === 'correct') hotspotClass += ' correct'
                        if (feedback?.status === 'incorrect') hotspotClass += ' incorrect'
                      }

                      const xCoord = Math.max(0, Math.min(100, part.hotspot?.x ?? 50))
                      const yCoord = Math.max(0, Math.min(100, part.hotspot?.y ?? 50))

                      return (
                        <button
                          key={part.id || idx}
                          type="button"
                          className={hotspotClass}
                          style={{ left: `${xCoord}%`, top: `${yCoord}%` }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleHotspotClick(part.id)
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          aria-label={
                            mode === 'explore'
                              ? `Pilih bagian ${part.label}`
                              : `Pilih area nomor ${idx + 1}`
                          }
                        >
                          {mode === 'explore' ? (
                            <span className="hotspot-number">{idx + 1}</span>
                          ) : (
                            <span className="hotspot-number">?</span>
                          )}
                          {mode === 'explore' && (
                            <span className="hotspot-label-tooltip">{part.label}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>

          {diagram?.caption && mode === 'explore' && (
            <div className="diagram-caption">{diagram.caption}</div>
          )}
        </div>

        {/* Right: Info / Quiz Panel Area */}
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
                <button
                  type="button"
                  className="btn-reset-selection"
                  onClick={() => setActivePartId(null)}
                >
                  Tutup Detail
                </button>
              </div>
            ) : (
              <div className="info-panel empty-panel">
                <span className="material-symbols-outlined empty-icon">ads_click</span>
                <p>Klik salah satu penanda pada diagram untuk melihat detail struktur dan fungsinya.</p>

                {parts.length > 0 && (
                  <div className="legend-list">
                    <strong>Daftar Bagian:</strong>
                    <ul>
                      {parts.map((part, idx) => (
                        <li
                          key={part.id || idx}
                          onClick={() => setActivePartId(part.id)}
                          className="legend-item"
                        >
                          <span className="legend-number">{idx + 1}</span> {part.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          ) : (
            /* Identify Mode Panel */
            <div className="info-panel identify-panel">
              {questions.length === 0 ? (
                <div className="identify-empty">
                  <span className="material-symbols-outlined">info</span>
                  <p>Tidak ada bagian interaktif yang tersedia untuk kuis ini.</p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleSwitchMode('explore')}
                  >
                    Kembali ke Eksplorasi
                  </button>
                </div>
              ) : isIdentifyFinished ? (
                <div className="identify-result">
                  <div className="result-icon">
                    <span className="material-symbols-outlined">
                      {score / questions.length >= 0.8 ? 'emoji_events' : 'school'}
                    </span>
                  </div>
                  <h4 className="result-title">Selesai!</h4>
                  <div className="result-score">
                    Skor: <span>{score} / {questions.length}</span> (
                    {Math.round((score / questions.length) * 100)}%)
                  </div>
                  <div className="result-actions">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={startIdentifyQuiz}
                    >
                      Ulangi Kuis
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleSwitchMode('explore')}
                    >
                      Pelajari Lagi
                    </button>
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
                        <button
                          type="button"
                          className="btn-next"
                          onClick={handleNextQuestion}
                        >
                          Lanjut
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="question-waiting">
                      Klik penanda (?) yang menurutmu benar pada diagram.
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
