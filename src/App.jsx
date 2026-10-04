import { HashRouter } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import './styles/design-tokens.css'
import './styles/dashboard.css'
import './App.css'

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ProgressProvider>
  )
}
