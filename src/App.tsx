import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'
import HomePage from './components/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import DarshanPage from './pages/DarshanPage'
import DarshanBookingPage from './features/darshan/pages/DarshanBookingPage'
import DarshanConfirmationPage from './features/darshan/pages/DarshanConfirmationPage'
import TempleDetailPage from './features/darshan/pages/TempleDetailPage'
import ListPropertyPage from './pages/ListPropertyPage'
import MyTripsPage from './pages/MyTripsPage'
import SupportPage from './pages/SupportPage'
import TempleExplorerPage from './pages/TempleExplorerPage'
import TourPackagesPage from './pages/TourPackagesPage'
import EventsPage from './pages/EventsPage'
import NearbyPage from './pages/NearbyPage'
import DealsPage from './pages/DealsPage'
import PlanPage from './pages/PlanPage'
import ProfilePage from './pages/ProfilePage'
import FlightResultsPage from './pages/flights/FlightResultsPage'
import FlightBookPage from './pages/flights/FlightBookPage'
import FlightPaymentPage from './pages/flights/FlightPaymentPage'
import FlightConfirmationPage from './pages/flights/FlightConfirmationPage'
import './App.css'
import './features/darshan/styles/darshan-v2.css'
import './styles/layout-grid.css'
import './styles/home-sections.css'
import './styles/auth-pages.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/flights/results" element={<FlightResultsPage />} />
      <Route
        path="/flights/book"
        element={
          <RequireAuth>
            <FlightBookPage />
          </RequireAuth>
        }
      />
      <Route
        path="/flights/payment"
        element={
          <RequireAuth>
            <FlightPaymentPage />
          </RequireAuth>
        }
      />
      <Route path="/flights/confirmation/:bookingId" element={<FlightConfirmationPage />} />
      <Route path="/darshan" element={<DarshanPage />} />
      <Route path="/darshan/temple/:templeId" element={<TempleDetailPage />} />
      <Route
        path="/darshan/book"
        element={
          <RequireAuth>
            <DarshanBookingPage />
          </RequireAuth>
        }
      />
      <Route path="/darshan/confirmation/:bookingRef" element={<DarshanConfirmationPage />} />
      <Route path="/list-property" element={<ListPropertyPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route
        path="/trips"
        element={
          <RequireAuth>
            <MyTripsPage />
          </RequireAuth>
        }
      />
      <Route path="/temples" element={<TempleExplorerPage />} />
      <Route path="/packages" element={<TourPackagesPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/nearby" element={<NearbyPage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/plan" element={<PlanPage />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
