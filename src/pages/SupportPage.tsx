import { Link } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'

const FAQ = [
  {
    q: 'How do I change or cancel a booking?',
    a: 'Open My Trips, select your reservation, and choose Change or Cancel. Policies vary by airline, hotel, or package partner.',
  },
  {
    q: 'Is payment secure?',
    a: 'Yes. We use industry-standard encryption and never store full card details on our servers.',
  },
  {
    q: 'How do I reach customer support?',
    a: 'Use Help Centre on this page or call the 24×7 desk listed on your confirmation email.',
  },
]

export default function SupportPage() {
  return (
    <SiteLayout>
      <div className="ds-pageHero">
        <h1 className="ds-display-xl">Support</h1>
        <p className="ds-body-md">
          Help with bookings, refunds, and account questions. For urgent travel issues, call our desk anytime.
        </p>
        <p className="ds-body-sm" style={{ marginTop: 'var(--space-base)' }}>
          <a href="tel:+911800000000" className="ds-btn ds-btn--primary ds-btn--sm">
            Call 24×7 desk
          </a>
        </p>
      </div>
      <div className="ds-pageContent" id="safety">
        <h2 className="ds-display-lg">Common questions</h2>
        <ul className="ds-faqList">
          {FAQ.map((item) => (
            <li key={item.q}>
              <h3 className="ds-title-md">{item.q}</h3>
              <p className="ds-body-md" style={{ marginTop: 'var(--space-sm)' }}>
                {item.a}
              </p>
            </li>
          ))}
        </ul>
        <p className="ds-body-sm" style={{ marginTop: 'var(--space-xl)' }} id="cancellation">
          <Link to="/trips">View My Trips</Link>
          {' · '}
          <Link to="/list-property">List your property</Link>
        </p>
      </div>
    </SiteLayout>
  )
}
