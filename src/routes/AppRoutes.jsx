import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

// Lazy loaded page modules
const AnatomyPage = lazy(() => import('../pages/AnatomyPage.jsx'))
const QuizPage = lazy(() => import('../pages/QuizPage.jsx'))
const LabPage = lazy(() => import('../pages/LabPage.jsx'))

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem', color: 'var(--color-primary)' }}>
      <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Memuat Halaman BioSMA...</p>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/anatomi" element={<AnatomyPage />} />
        <Route path="/anatomi-3d" element={<AnatomyPage />} />
        <Route path="/kuis" element={<QuizPage />} />
        <Route path="/laboratorium" element={<LabPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/praktikum" element={<LabPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
