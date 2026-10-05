import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import materiDataRaw from '../../data/materiData.json'
import quizDataRaw from '../../data/quizData.json'
import InteractiveDiagram from '../visual/InteractiveDiagram'
import { resolveAsset } from '../../utils/assetResolver'

const allModules = materiDataRaw.modules
const glossary = materiDataRaw.glossary || []

function TooltipText({ text }) {
  // Parse bold **text** first
  const boldParts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {boldParts.map((bPart, bIdx) => {
        const isBold = bPart.startsWith('**') && bPart.endsWith('**');
        let contentToParse = isBold ? bPart.slice(2, -2) : bPart;

        if (!glossary.length) {
          return isBold ? <strong key={bIdx}>{contentToParse}</strong> : <span key={bIdx}>{contentToParse}</span>;
        }

        const terms = glossary.map(g => g.term).sort((a, b) => b.length - a.length);
        const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
        const parts = contentToParse.split(regex);

        const parsedContent = parts.map((part, i) => {
          const foundItem = glossary.find(g => g.term.toLowerCase() === part.toLowerCase());
          if (foundItem) {
            return (
              <span key={i} className="glossary-term" title={foundItem.definition}>
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        });

        return isBold ? <strong key={bIdx}>{parsedContent}</strong> : <span key={bIdx}>{parsedContent}</span>;
      })}
    </>
  )
}

export default function MateriDetail() {
  const { moduleId } = useParams()
  const mod = allModules.find((m) => m.id === moduleId)
  
  const [activeSubtopic, setActiveSubtopic] = useState(0)
  const contentRef = useRef(null)
  const subtopicListRef = useRef(null)

  // Scroll content to top when switching subtopics
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Also scroll window to top if on mobile
    if (window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeSubtopic])

  // Auto-scroll active subtopic tab into view on mobile
  useEffect(() => {
    if (subtopicListRef.current) {
      const activeEl = subtopicListRef.current.querySelector('.materi-subtopic-btn.active')
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeSubtopic])

  if (!mod) {
    return (
      <div className="materi-not-found">
        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--color-outline)' }}>
          search_off
        </span>
        <h2>Modul Tidak Ditemukan</h2>
        <p>Modul dengan ID "{moduleId}" tidak tersedia.</p>
        <Link to="/" className="materi-back-btn" style={{ marginTop: '1rem' }}>
          <span className="material-symbols-outlined">arrow_back</span>
          Kembali ke Katalog Materi
        </Link>
      </div>
    )
  }

  const subtopic = mod.subtopics[activeSubtopic]
  const totalSubtopics = mod.subtopics.length

  const renderContent = (contentBlock, index) => {
    switch (contentBlock.type) {
      case 'heading':
        return (
          <h3 key={index} className="materi-content-heading">
            {contentBlock.text}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className="materi-content-paragraph">
            <TooltipText text={contentBlock.text} />
          </p>
        )
      case 'keypoint':
        return (
          <div key={index} className="materi-keypoint">
            <div className="materi-keypoint-icon">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <strong className="materi-keypoint-label">Poin Kunci</strong>
              <p><TooltipText text={contentBlock.text} /></p>
            </div>
          </div>
        )
      case 'highlight':
        return (
          <div key={index} className="materi-highlight">
            <span className="material-symbols-outlined materi-highlight-icon">auto_awesome</span>
            <div>
              <p><TooltipText text={contentBlock.text} /></p>
            </div>
          </div>
        )
      case 'image':
        return (
          <figure key={index} className="materi-content-image">
            <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '0.75rem', margin: '1rem 0', border: '1px solid rgba(191,201,194,0.3)' }}>
              <img
                src={resolveAsset(contentBlock.src)}
                alt={contentBlock.caption || 'Ilustrasi'}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-md)' }}
              />
            </div>
            {contentBlock.caption && (
              <figcaption className="materi-content-caption" style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', marginTop: '0.35rem' }}>
                {contentBlock.caption}
              </figcaption>
            )}
          </figure>
        )
      case 'interactiveImage':
        return (
          <div key={index} className="materi-interactive-diagram-wrapper">
            <InteractiveDiagram diagram={contentBlock} />
          </div>
        )
      case 'list':
        return (
          <ul key={index} className="materi-content-list">
            {(contentBlock.items || []).map((item, i) => (
              <li key={i}><TooltipText text={item} /></li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="materi-detail">
      {/* Unified Material Header Card with Prominent Back Action */}
      <div className="materi-header-card">
        <div className="materi-header-action-row">
          <Link to="/" className="materi-back-btn" title="Kembali ke Katalog Materi">
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Kembali ke Katalog Materi</span>
          </Link>

          <div className="materi-progress-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>menu_book</span>
            <span>Sub-topik {activeSubtopic + 1} dari {totalSubtopics}</span>
          </div>
        </div>

        <div className="materi-header-info">
          <div className="materi-card-icon" style={{ background: `${mod.color}18`, color: mod.color, width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{mod.icon}</span>
          </div>
          <div className="materi-header-titles">
            <span className="materi-header-tag">Bahan Ajar Biologi SMA • Fase F</span>
            <h1 className="materi-header-title">{mod.title}</h1>
          </div>
        </div>
      </div>

      {/* Two-column layout: Sidebar Tabs + Content Area */}
      <div className="materi-detail-layout">
        {/* Subtopic Navigation */}
        <aside className="materi-subtopic-nav">
          <div className="materi-subtopic-nav-header">
            <h4 className="materi-subtopic-nav-title">Daftar Sub-Topik</h4>
            <span className="materi-subtopic-counter">
              {activeSubtopic + 1}/{totalSubtopics}
            </span>
          </div>

          <ul className="materi-subtopic-list" ref={subtopicListRef}>
            {mod.subtopics.map((st, idx) => {
              const isActive = idx === activeSubtopic
              return (
                <li key={st.id}>
                  <button
                    type="button"
                    className={`materi-subtopic-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveSubtopic(idx)}
                    title={st.title}
                  >
                    <span className="materi-subtopic-indicator">
                      {idx + 1}
                    </span>
                    <span className="materi-subtopic-btn-title">{st.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Right: Content Area */}
        <div className="materi-content-area" ref={contentRef}>
          {/* Subtopic Header */}
          <div className="materi-content-header" style={{ borderLeftColor: mod.color }}>
            <div className="materi-content-header-icon" style={{ background: `${mod.color}18`, color: mod.color }}>
              <span className="material-symbols-outlined">{subtopic.icon}</span>
            </div>
            <div>
              <span className="materi-content-chapter">
                Sub-topik {activeSubtopic + 1} dari {totalSubtopics}
              </span>
              <h2 className="materi-content-title">{subtopic.title}</h2>
            </div>
          </div>

          {/* Rendered Content Blocks */}
          <div className="materi-content-body">
            {(subtopic.content || []).map((block, i) => renderContent(block, i))}
          </div>

          {/* Navigation Action Buttons */}
          <div className="materi-content-actions">
            <div className="materi-nav-buttons">
              {activeSubtopic > 0 ? (
                <button
                  type="button"
                  className="btn-import materi-nav-btn"
                  onClick={() => setActiveSubtopic(activeSubtopic - 1)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
                  Sebelumnya
                </button>
              ) : <div />}

              {activeSubtopic < totalSubtopics - 1 ? (
                <button
                  type="button"
                  className="btn-export materi-nav-btn"
                  style={{ backgroundColor: mod.color }}
                  onClick={() => setActiveSubtopic(activeSubtopic + 1)}
                >
                  Selanjutnya
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </button>
              ) : (
                <Link 
                  to={`/quiz?quizId=${quizDataRaw.quizzes.find(q => q.moduleId === mod.id)?.id || ''}`} 
                  className="btn-practical"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0d5c46', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}
                >
                  <span className="material-symbols-outlined">quiz</span>
                  Kerjakan Kuis Modul
                </Link>
              )}
            </div>

            {/* Bottom Quick Return to Catalog */}
            <div className="materi-bottom-return">
              <Link to="/" className="materi-bottom-back-link">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                <span>Kembali ke Katalog Materi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
