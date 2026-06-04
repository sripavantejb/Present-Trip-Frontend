import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import { getHotelInfo } from '../api/hotels'
import { ApiClientError } from '../api/client'
import type { HotelDetail, HotelSearchSession } from '../api/types/hotels'
import { SiteLayout } from '../components/layout/SiteLayout'
import { AppIcon } from '../components/ui/AppIcon'
import { loadHotelSearchSession } from '../utils/hotelSession'
import './hotels.css'

type DetailLocationState = {
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  hotelCode: string
  hotelName?: string
  session?: HotelSearchSession
}

export default function HotelDetailPage() {
  const { hotelCode } = useParams<{ hotelCode: string }>()
  const location = useLocation()
  const state = location.state as DetailLocationState | null

  const [hotel, setHotel] = useState<HotelDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchInfo() {
      const session = state?.session ?? loadHotelSearchSession()
      const traceId = state?.traceId ?? session?.traceId
      const srdvType = state?.srdvType ?? session?.srdvType
      const srdvIndex = state?.srdvIndex
      const resultIndex = state?.resultIndex
      const code = hotelCode ?? state?.hotelCode

      if (!traceId || !srdvType || !srdvIndex || !resultIndex || !code) {
        setError('Missing search context. Please search for hotels again.')
        setLoading(false)
        return
      }

      try {
        const data = await getHotelInfo({
          TraceId: traceId,
          SrdvType: srdvType,
          SrdvIndex: srdvIndex,
          ResultIndex: resultIndex,
          HotelCode: code,
        })
        setHotel(data.hotel)
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : 'Unable to load hotel details.')
      } finally {
        setLoading(false)
      }
    }

    fetchInfo()
  }, [hotelCode, state])

  if (loading) {
    return (
      <SiteLayout className="pt-hotels-page">
        <div className="pt-hotels-empty">
          <p>Loading hotel details…</p>
        </div>
      </SiteLayout>
    )
  }

  if (error || !hotel) {
    return (
      <SiteLayout className="pt-hotels-page">
        <div className="pt-hotels-empty">
          <h1>Hotel unavailable</h1>
          <p>{error || 'Could not load this hotel.'}</p>
          <Link to="/hotels/search" className="pt-hotels-backLink">
            Back to results
          </Link>
        </div>
      </SiteLayout>
    )
  }

  const heroImage = hotel.mainImage || hotel.gallery[0] || ''

  return (
    <SiteLayout className="pt-hotels-page">
      <div className="pt-hotels-detail">
        <Link to="/hotels/search" className="pt-hotels-backLink">
          ← Back to results
        </Link>

        <div className="pt-hotels-detailHero">
          <img
            src={heroImage || 'https://placehold.co/1200x500/f7f7f7/929292?text=Hotel'}
            alt={hotel.hotelName}
            className="pt-hotels-detailHeroImg"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x500/f7f7f7/929292?text=Hotel'
            }}
          />
        </div>

        <div className="pt-hotels-detailHead">
          <div>
            <h1 className="pt-hotels-detailTitle">{hotel.hotelName}</h1>
            <div className="pt-hotels-detailMeta">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <AppIcon key={i} icon={Star} size={16} className="pt-hotels-star" />
              ))}
              <span>{hotel.starRating}-star hotel</span>
            </div>
            <p className="pt-hotels-detailAddress">
              <AppIcon icon={MapPin} size={16} />
              {[hotel.address.full, hotel.address.city, hotel.address.country]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        </div>

        {hotel.gallery.length > 1 ? (
          <div className="pt-hotels-gallery">
            {hotel.gallery.slice(0, 6).map((img) => (
              <img key={img} src={img} alt="" className="pt-hotels-galleryImg" loading="lazy" />
            ))}
          </div>
        ) : null}

        {hotel.description.length > 0 ? (
          <section className="pt-hotels-section">
            <h2>About this property</h2>
            {hotel.description.map((section) => (
              <div key={section.Name} className="pt-hotels-descBlock">
                <h3>{section.Name}</h3>
                {section.Detail.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
          </section>
        ) : null}

        {hotel.facilities.length > 0 ? (
          <section className="pt-hotels-section">
            <h2>Facilities</h2>
            <ul className="pt-hotels-facilityList">
              {hotel.facilities.map((f) => (
                <li key={f.Name}>{f.Name}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {hotel.policy ? (
          <section className="pt-hotels-section">
            <h2>Policies</h2>
            <p>{hotel.policy}</p>
            {hotel.specialInstructions ? <p>{hotel.specialInstructions}</p> : null}
          </section>
        ) : null}

        {(hotel.contact.phone || hotel.contact.email) && (
          <section className="pt-hotels-section">
            <h2>Contact</h2>
            {hotel.contact.phone ? <p>Phone: {hotel.contact.phone}</p> : null}
            {hotel.contact.email ? <p>Email: {hotel.contact.email}</p> : null}
          </section>
        )}
      </div>
    </SiteLayout>
  )
}
