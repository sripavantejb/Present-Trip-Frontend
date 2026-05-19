import { Routes, Route } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import ListPropertyPage from './pages/ListPropertyPage'
import MyTripsPage from './pages/MyTripsPage'
import SupportPage from './pages/SupportPage'
import './App.css'
import './styles/layout-grid.css'
import './styles/home-sections.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/list-property" element={<ListPropertyPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/trips" element={<MyTripsPage />} />
    </Routes>
  )
}
