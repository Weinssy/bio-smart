import { Link } from 'react-router-dom'
import materiDataRaw from '../../data/materiData.json'

const modules = materiDataRaw.modules

export default function MateriCatalog() {
  return (
    <div className="materi-catalog">
      <div className="materi-catalog-grid">
        {modules.map((mod) => {
          return (
            <Link
              key={mod.id}
              to={`/materi/${mod.id}`}
              className="materi-card"
              style={{ textDecoration: 'none' }}
            >
              {/* Top accent bar */}
              <div
                className="materi-card-accent"
                style={{ background: mod.gradient }}
              />

              {/* Card Header */}
              <div className="materi-card-header">
                <div
                  className="materi-card-icon"
                  style={{ background: `${mod.color}18`, color: mod.color }}
                >
                  <span className="material-symbols-outlined">{mod.icon}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="materi-card-body">
                <h3 className="materi-card-title">{mod.title}</h3>
                <p className="materi-card-desc">{mod.description}</p>
              </div>

              {/* Card Meta */}
              <div className="materi-card-meta">
                <div className="materi-meta-item">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '16px' }}
                  >
                    library_books
                  </span>
                  <span>{mod.totalSubtopics} Sub-topik</span>
                </div>
                <div className="materi-meta-item">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '16px' }}
                  >
                    timer
                  </span>
                  <span>{mod.estimatedHours} Jam</span>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="materi-card-footer">
                <span
                  className="materi-card-cta"
                  style={{ color: mod.color }}
                >
                  Buka Materi
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '18px' }}
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
