import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ExternalLink, MapPin, Star } from 'lucide-react'
import { getHotelInfo, getHotelRooms } from '../api/hotels'
import { ApiClientError } from '../api/client'
import type { HotelDetail, HotelRoomsResponse, HotelSearchSession } from '../api/types/hotels'
import { SiteLayout } from '../components/layout/SiteLayout'
import { AppIcon } from '../components/ui/AppIcon'
import { HotelRoomsSection } from './components/HotelRoomsSection'
import { loadHotelSearchSession } from '../utils/hotelSession'
import './hotels.css'

type DetailLocationState = {
  traceId?: string
  srdvType?: string
  srdvIndex?: string
  resultIndex?: string
  hotelCode?: string
  hotelName?: string
  session?: HotelSearchSession
}

function resolveHotelContext(
  hotelCodeParam: string | undefined,
  state: DetailLocationState | null,
) {
  const session = state?.session ?? loadHotelSearchSession()
  const code = decodeURIComponent(hotelCodeParam ?? state?.hotelCode ?? '')
  const match = session?.searchResult.hotels.find(
    (h) => h.hotelCode === code || h.resultIndex === code,
  )

  return {
    session,
    code: code || match?.hotelCode || '',
    traceId: state?.traceId ?? session?.traceId,
    srdvType: state?.srdvType ?? session?.srdvType,
    srdvIndex: state?.srdvIndex ?? match?.srdvIndex,
    resultIndex: state?.resultIndex ?? match?.resultIndex,
    listHotel: match,
  }
}

function mapLink(lat: string, lng: string) {
  if (!lat || !lng) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`
}

function isAttractionSection(name: string) {
  return /attraction|location|nearby/i.test(name)
}

export default function HotelDetailPage() {
  const { hotelCode } = useParams<{ hotelCode: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as DetailLocationState | null

  const context = useMemo(
    () => resolveHotelContext(hotelCode, state),
    [hotelCode, state],
  )

  const [hotel, setHotel] = useState<HotelDetail | null>(null)
  const [roomsData, setRoomsData] = useState<HotelRoomsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [roomsLoading, setRoomsLoading] = useState(true)
  const [error, setError] = useState('')
  const [roomsError, setRoomsError] = useState('')

  useEffect(() => {
    async function fetchInfoAndRooms() {
      const { traceId, srdvType, srdvIndex, resultIndex, code } = context

      if (!traceId || !srdvType || !srdvIndex || !resultIndex || !code) {
        setError('Missing search context. Please search for hotels again.')
        setLoading(false)
        setRoomsLoading(false)
        return
      }

      const roomRequest = {
        TraceId: traceId,
        SrdvType: srdvType,
        SrdvIndex: srdvIndex,
        ResultIndex: resultIndex,
        HotelCode: code,
      }

      setLoading(true)
      setRoomsLoading(true)
      setError('')
      setRoomsError('')

      try {
        const data = await getHotelInfo(roomRequest)
        setHotel(data.hotel)

        try {
          const rooms = await getHotelRooms(roomRequest)
          setRoomsData(rooms)
        } catch (err) {
          setRoomsError(
            err instanceof ApiClientError ? err.message : 'Unable to load available rooms.',
          )
        }
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : 'Unable to load hotel details.')
      } finally {
        setLoading(false)
        setRoomsLoading(false)
      }
    }

    fetchInfoAndRooms()
  }, [context.traceId, context.srdvType, context.srdvIndex, context.resultIndex, context.code])

  function backToResults() {
    if (context.session) {
      navigate('/hotels/search', { state: context.session })
    } else {
      navigate('/hotels/search')
    }
  }

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
          <button type="button" className="pt-hotels-backLink" onClick={backToResults}>
            Back to results
          </button>
        </div>
      </SiteLayout>
    )
  }

  const heroImage = hotel.mainImage || hotel.gallery[0] || ''
  const mapsUrl = mapLink(hotel.coordinates.lat, hotel.coordinates.lng)
  const descriptionSections = hotel.description.filter((s) => !isAttractionSection(s.Name))
  const attractionSections = hotel.description.filter((s) => isAttractionSection(s.Name))

  return (
    <SiteLayout className="pt-hotels-page">
      <div className="pt-hotels-detail">
        <button type="button" className="pt-hotels-backLink" onClick={backToResults}>
          ← Back to results
        </button>

        {context.session ? (
          <p className="pt-hotels-contextBanner">
            {context.session.cityName} · {context.session.checkInDate} →{' '}
            {context.session.checkOutDate}
            {context.listHotel
              ? ` · from ${new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: context.listHotel.price.currencyCode || 'INR',
                  maximumFractionDigits: 0,
                }).format(context.listHotel.displayPrice)}/night`
              : null}
          </p>
        ) : null}

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
              {[hotel.address.full, hotel.address.city, hotel.address.state, hotel.address.country]
                .filter(Boolean)
                .join(', ')}
            </p>
            <div className="pt-hotels-detailActions">
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-hotels-detailLink"
                >
                  View on map
                </a>
              ) : null}
              {hotel.hotelURL ? (
                <a
                  href={hotel.hotelURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-hotels-detailLink"
                >
                  <AppIcon icon={ExternalLink} size={14} />
                  Hotel website
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {hotel.gallery.length > 1 ? (
          <div className="pt-hotels-gallery">
            {hotel.gallery.slice(0, 6).map((img) => (
              <img key={img} src={img} alt="" className="pt-hotels-galleryImg" loading="lazy" />
            ))}
          </div>
        ) : null}

        <HotelRoomsSection
          hotelCode={context.code}
          traceId={context.traceId ?? ''}
          srdvType={context.srdvType ?? ''}
          srdvIndex={context.srdvIndex ?? ''}
          resultIndex={context.resultIndex ?? ''}
          roomsData={roomsData}
          loading={roomsLoading}
          error={roomsError}
        />

        {descriptionSections.length > 0 ? (
          <section className="pt-hotels-section">
            <h2>About this property</h2>
            {descriptionSections.map((section) => (
              <div key={section.Name} className="pt-hotels-descBlock">
                <h3>{section.Name}</h3>
                {section.Detail.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
          </section>
        ) : null}

        {attractionSections.length > 0 ? (
          <section className="pt-hotels-section">
            <h2>Attractions & location</h2>
            {attractionSections.map((section) => (
              <div key={section.Name} className="pt-hotels-descBlock">
                <h3>{section.Name}</h3>
                <ul className="pt-hotels-attractionList">
                  {section.Detail.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
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

        {hotel.otherDetails ? (
          <section className="pt-hotels-section">
            <h2>Additional details</h2>
            <p>{hotel.otherDetails}</p>
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
