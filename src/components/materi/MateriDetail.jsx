import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import materiDataRaw from '../../data/materiData.json'

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

  // Scroll content to top when switching subtopics
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
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
        <Link to="/materi" className="btn-export" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
          Kembali ke Katalog
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
            <p><TooltipText text={contentBlock.text} /></p>
          </div>
        )
      case 'image':
        return (
          <figure key={index} className="materi-content-image">
            <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1rem', margin: '1rem 0' }}>
              <img src={contentBlock.src} alt={contentBlock.caption || 'Ilustrasi'} style={{ width: '100%', display: 'block' }} />
            </div>
            {contentBlock.caption && <figcaption style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', textAlign: 'center', marginTop: '0.5rem' }}>{contentBlock.caption}</figcaption>}
          </figure>
        )
      case 'video':
        return (
          <div key={index} className="materi-content-video" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', margin: '1.5rem 0' }}>
            <iframe
              src={contentBlock.src}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={contentBlock.caption || 'Video Pembelajaran'}
            />
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
      {/* Breadcrumb */}
      <div className="materi-breadcrumb">
        <Link to="/materi" className="materi-breadcrumb-link">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
          Katalog Materi
        </Link>
        <span className="materi-breadcrumb-sep">/</span>
        <span className="materi-breadcrumb-current">{mod.title}</span>
      </div>

      {/* Module Title Header */}
      <div className="materi-detail-progress-bar">
        <div className="materi-detail-progress-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="materi-card-icon" style={{ background: `${mod.color}18`, color: mod.color, width: '2rem', height: '2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{mod.icon}</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{mod.title}</span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
            {totalSubtopics} sub-topik tersedia
          </span>
        </div>
      </div>

      {/* Two-column layout: Sidebar + Content */}
      <div className="materi-detail-layout">
        {/* Left: Subtopic Navigation */}
        <aside className="materi-subtopic-nav">
          <h4 className="materi-subtopic-nav-title">Daftar Materi</h4>
          <ul className="materi-subtopic-list">
            {mod.subtopics.map((st, idx) => {
              const isActive = idx === activeSubtopic
              return (
                <li key={st.id}>
                  <button
                    type="button"
                    className={`materi-subtopic-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveSubtopic(idx)}
                  >
                    <span
                      className="materi-subtopic-indicator"
                    >
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-outline)' }}>{idx + 1}</span>
                    </span>
                    <div className="materi-subtopic-btn-text">
                      <span className="materi-subtopic-btn-title">{st.title}</span>
                    </div>
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

          {/* Navigation */}
          <div className="materi-content-actions">
            <div className="materi-nav-buttons" style={{ marginLeft: 'auto' }}>
              {activeSubtopic > 0 && (
                <button
                  type="button"
                  className="btn-import materi-nav-btn"
                  onClick={() => setActiveSubtopic(activeSubtopic - 1)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
                  Sebelumnya
                </button>
              )}
              {activeSubtopic < totalSubtopics - 1 && (
                <button
                  type="button"
                  className="btn-export materi-nav-btn"
                  style={{ backgroundColor: mod.color }}
                  onClick={() => setActiveSubtopic(activeSubtopic + 1)}
                >
                  Selanjutnya
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
