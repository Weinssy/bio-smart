import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import './styles/design-tokens.css'
import './styles/dashboard.css'
import './styles/materi.css'
import './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppRoutes />
        <Toaster position="top-center" richColors closeButton />
      </HashRouter>
    </ThemeProvider>
  )
}
