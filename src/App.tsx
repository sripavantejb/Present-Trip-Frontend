import { Routes, Route } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import DarshanPage from './pages/DarshanPage'
import ListPropertyPage from './pages/ListPropertyPage'
import MyTripsPage from './pages/MyTripsPage'
import SupportPage from './pages/SupportPage'
import TempleExplorerPage from './pages/TempleExplorerPage'
import TourPackagesPage from './pages/TourPackagesPage'
import EventsPage from './pages/EventsPage'
import NearbyPage from './pages/NearbyPage'
import DealsPage from './pages/DealsPage'
import HotelSearchResultsPage from './pages/HotelSearchResultsPage'
import HotelDetailPage from './pages/HotelDetailPage'
import PlanPage from './pages/PlanPage'
import './App.css'
import './styles/layout-grid.css'
import './styles/home-sections.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/darshan" element={<DarshanPage />} />
      <Route path="/list-property" element={<ListPropertyPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/trips" element={<MyTripsPage />} />
      <Route path="/temples" element={<TempleExplorerPage />} />
      <Route path="/packages" element={<TourPackagesPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/nearby" element={<NearbyPage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/hotels/search" element={<HotelSearchResultsPage />} />
      <Route path="/hotels/:hotelCode" element={<HotelDetailPage />} />
      <Route path="/plan" element={<PlanPage />} />
    </Routes>
  )
}
