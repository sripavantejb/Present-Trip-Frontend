import { Link } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <SiteLayout>
      <div className="ds-container ds-section">
        <h1 className="ds-display-lg">Profile</h1>
        <p className="ds-body-md" style={{ marginTop: 'var(--space-md)', maxWidth: '36rem' }}>
          Signed in as <strong>{user.name}</strong> ({user.email})
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginTop: 'var(--space-xl)',
          }}
        >
          <Link to="/trips" className="ds-btn ds-btn--primary">
            My trips
          </Link>
          <Link to="/support" className="ds-btn ds-btn--tertiary">
            Help centre
          </Link>
          <button type="button" className="ds-btn ds-btn--secondary" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </SiteLayout>
  )
}
