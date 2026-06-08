import { SiteLayout } from '../../../components/layout/SiteLayout'
import { DarshanSearchForm } from '../components/search/DarshanSearchForm'
import '../styles/darshan-v2.css'
import '../styles/dv2-booking-layout.css'

export default function DarshanSearchPage() {
  return (
    <SiteLayout>
      <div className="dv2 dv2-flow dv2-flow--search">
        <div className="ds-page-shell ds-page-shell--reading dv2-flow__shell">
          <header className="dv2-page__head">
            <h1 className="ds-display-lg">Book darshan</h1>
            <p className="ds-body-sm">
              Find your temple, pick a date, and explore darshan options across India&apos;s holiest shrines.
            </p>
          </header>
          <DarshanSearchForm showBanner />
        </div>
      </div>
    </SiteLayout>
  )
}
