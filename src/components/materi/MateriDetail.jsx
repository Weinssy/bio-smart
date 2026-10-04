import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import materiDataRaw from '../../data/materiData.json'

const allModules = materiDataRaw.modules

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
            {contentBlock.text}
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
              <p>{contentBlock.text}</p>
            </div>
          </div>
        )
      case 'highlight':
        return (
          <div key={index} className="materi-highlight">
            <span className="material-symbols-outlined materi-highlight-icon">auto_awesome</span>
            <p>{contentBlock.text}</p>
          </div>
        )
      case 'list':
        return (
          <ul key={index} className="materi-content-list">
            {(contentBlock.items || []).map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
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
