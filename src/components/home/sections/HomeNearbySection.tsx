import { Link } from 'react-router-dom'
import { HomeSectionHeader } from './HomeSectionHeader'

const NEARBY_DESTINATIONS = [
  {
    id: 'n1',
    name: 'Tirupati',
    subtitle: '12 temples within 100 km',
    image: 'https://images.unsplash.com/photo-1582510003544-4a00b9bd4d81?w=400&h=240&fit=crop',
  },
  {
    id: 'n2',
    name: 'Shirdi',
    subtitle: '6 temples within 50 km',
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0a5?w=400&h=240&fit=crop',
  },
  {
    id: 'n3',
    name: 'Varanasi',
    subtitle: '18 temples within 200 km',
    image: 'https://images.unsplash.com/photo-1548013146-7249f0bb9e9f?w=400&h=240&fit=crop',
  },
] as const

export function HomeNearbySection() {
  return (
    <section className="pt-home-section pt-home-section--white" aria-labelledby="home-nearby-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Nearby Temples"
          subtitle="Explore sacred sites close to popular pilgrimage hubs"
          seeAllHref="/nearby"
          seeAllLabel="See all"
        />
        <div className="pt-home-hScroll pt-home-hScroll--fade" id="home-nearby-heading">
          {NEARBY_DESTINATIONS.map((d) => (
            <Link key={d.id} to="/nearby" className="pt-home-miniCard">
              <img src={d.image} alt={d.name} loading="lazy" />
              <div className="pt-home-miniCard__body">
                <p className="pt-home-miniCard__title">{d.name}</p>
                <p className="pt-home-miniCard__sub">{d.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
