import { DarshanSearchForm } from '../../features/darshan/components/search/DarshanSearchForm'
import '../../features/darshan/styles/darshan-v2.css'
import '../../styles/home-darshan-search.css'

export function HomeDarshanSearchPanel() {
  return (
    <div className="pt-home__darshanEmbed">
      <DarshanSearchForm embedded showBanner />
    </div>
  )
}
