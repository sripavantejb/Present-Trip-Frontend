export function LoginSection() {
  return (
    <section className="darshan__section darshan__section--muted darshan__login-strip" aria-label="Login and profile">
      <div className="darshan__container">
        <div className="darshan__login-grid">
          <div id="login" className="darshan__login-card">
            <h2 className="darshan__h3">Login</h2>
            <p className="darshan__muted">Sign in to sync bookings, seva slots, and family manifests.</p>
            <button type="button" className="darshan__btn darshan__btn--primary">
              Sign in — coming soon
            </button>
          </div>
          <div id="profile" className="darshan__login-card">
            <h2 className="darshan__h3">Profile</h2>
            <p className="darshan__muted">Manage pilgrims, elders’ assistance presets, and language preferences.</p>
            <button type="button" className="darshan__btn darshan__btn--ghost">
              Open traveller profile — coming soon
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
