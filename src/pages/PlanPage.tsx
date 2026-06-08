import { useNavigate } from 'react-router-dom'
import { PilgrimageWizardModal } from '../components/darshan/PilgrimageWizardModal'
import { SiteLayout } from '../components/layout/SiteLayout'
import '../styles/pilgrimage-theme.css'
import './plan-page.css'

export default function PlanPage() {
  const navigate = useNavigate()

  return (
    <SiteLayout className="ds-page--plan-wizard">
      <PilgrimageWizardModal embedded onClose={() => navigate('/')} />
    </SiteLayout>
  )
}
