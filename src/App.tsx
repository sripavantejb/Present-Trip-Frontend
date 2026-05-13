import { Routes, Route } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import DarshanPage from './pages/DarshanPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/darshan" element={<DarshanPage />} />
    </Routes>
  )
}
