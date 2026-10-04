import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Halaman yang Anda tuju tidak tersedia.</p>
      <Link to="/" style={{ color: 'var(--color-primary-container, #0d5c46)' }}>
        Kembali ke Dashboard
      </Link>
    </div>
  )
}
