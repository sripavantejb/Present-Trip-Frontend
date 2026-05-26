import { useNavigate } from 'react-router-dom'
import { PilgrimageWizardModal } from '../components/darshan/PilgrimageWizardModal'
import '../styles/pilgrimage-theme.css'
import './plan-page.css'

export default function PlanPage() {
  const navigate = useNavigate()

  return (
    <div className="pil-plan-page">
      <PilgrimageWizardModal fullscreen onClose={() => navigate('/')} />
    </div>
  )
}
