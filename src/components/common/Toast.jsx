import { useProgress } from '../../context/ProgressContext'

export default function Toast() {
  const { toast } = useProgress()

  return (
    <div className={`toast-container ${toast.show ? 'show' : ''}`} role="alert" aria-live="assertive">
      <div className="toast-card">
        <span
          className="material-symbols-outlined"
          style={{ color: toast.isSuccess ? 'var(--color-primary-fixed-dim, #4cd7f6)' : '#f87171' }}
        >
          {toast.isSuccess ? 'check_circle' : 'error'}
        </span>
        <div>
          <p className="toast-title">{toast.title}</p>
          <p className="toast-msg">{toast.message}</p>
        </div>
      </div>
    </div>
  )
}
