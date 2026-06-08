import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FlightBookingProvider } from './context/FlightBookingContext'
import { DarshanBookingProvider } from './features/darshan/context/DarshanBookingContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FlightBookingProvider>
          <DarshanBookingProvider>
            <App />
          </DarshanBookingProvider>
        </FlightBookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
