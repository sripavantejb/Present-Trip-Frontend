import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Heart, MapPin, Star } from 'lucide-react'
import type { HotelSearchResultItem, HotelSearchSession } from '../api/types/hotels'
import { SiteLayout } from '../components/layout/SiteLayout'
import { AppIcon } from '../components/ui/AppIcon'
import { loadHotelSearchSession } from '../utils/hotelSession'
import './hotels.css'

function formatPrice(amount: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function HotelResultCard({
  hotel,
  session,
}: {
  hotel: HotelSearchResultItem
  session: HotelSearchSession
}) {
  const navigate = useNavigate()
  const mealPlan = hotel.facilities[0]?.facilitiesName?.[0] ?? 'ROOM ONLY'

  function openDetail() {
    navigate(`/hotels/${encodeURIComponent(hotel.hotelCode)}`, {
      state: {
        traceId: session.traceId,
        srdvType: session.srdvType,
        srdvIndex: hotel.srdvIndex,
        resultIndex: hotel.resultIndex,
        hotelCode: hotel.hotelCode,
        hotelName: hotel.hotelName,
        session,
      },
    })
  }

  return (
    <article
      className="pt-home-card pt-home-hotelCard pt-hotels-resultCard pt-hotels-resultCard--clickable"
      role="button"
      tabIndex={0}
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openDetail()
        }
      }}
    >
      <div className="pt-home-hotelMedia">
        <img
          className="pt-home-hotelImg"
          src={hotel.hotelPicture || '/images/hotels/placeholder.jpg'}
          alt={hotel.hotelName}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400/f7f7f7/929292?text=Hotel'
          }}
        />
        <button
          type="button"
          className="pt-home-hotelHeart"
          aria-label="Save hotel"
          onClick={(e) => e.stopPropagation()}
        >
          <AppIcon icon={Heart} size={18} />
        </button>
      </div>
      <div className="pt-home-hotelBody">
        <h3 className="pt-home-hotelName">{hotel.hotelName}</h3>
        <p className="pt-home-hotelCity">
          <AppIcon icon={MapPin} size={14} /> {hotel.city}
          {hotel.hotelAddress ? ` · ${hotel.hotelAddress}` : ''}
        </p>
        <div className="pt-home-hotelRating">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AppIcon key={i} icon={Star} size={14} className="pt-hotels-star" />
          ))}
          <span>{hotel.starRating}-star · {mealPlan}</span>
        </div>
        {hotel.rooms[0]?.category ? (
          <p className="pt-hotels-roomType">{hotel.rooms[0].category}</p>
        ) : null}
        <p className="pt-home-hotelPrice">
          From <strong>{formatPrice(hotel.displayPrice, hotel.price.currencyCode || 'INR')}</strong>{' '}
          / night
        </p>
        <button
          type="button"
          className="pt-hotels-viewBtn"
          onClick={(e) => {
            e.stopPropagation()
            openDetail()
          }}
        >
          View details
        </button>
      </div>
    </article>
  )
}

export default function HotelSearchResultsPage() {
  const location = useLocation()
  const [session, setSession] = useState<HotelSearchSession | null>(
    (location.state as HotelSearchSession | null) ?? null,
  )

  useEffect(() => {
    if (!session) {
      setSession(loadHotelSearchSession())
    }
  }, [session])

  if (!session) {
    return (
      <SiteLayout className="pt-hotels-page">
        <div className="pt-hotels-empty">
          <h1>Search for hotels</h1>
          <p>Start from the homepage to find stays across India.</p>
          <Link to="/" className="pt-hotels-backLink">
            Back to home
          </Link>
        </div>
      </SiteLayout>
    )
  }

  const { searchResult, cityName, checkInDate, checkOutDate } = session
  const hotels = searchResult.hotels ?? []

  return (
    <SiteLayout className="pt-hotels-page">
      <div className="pt-hotels-header">
        <div>
          <p className="pt-hotels-eyebrow">Hotel search</p>
          <h1 className="pt-hotels-title">
            {hotels.length} hotels in {cityName}
          </h1>
          <p className="pt-hotels-subtitle">
            {checkInDate} → {checkOutDate}
          </p>
        </div>
        <Link to="/" className="pt-hotels-backLink">
          Modify search
        </Link>
      </div>

      {hotels.length === 0 ? (
        <div className="pt-hotels-empty">
          <p>No hotels found for these dates. Try different dates or another city.</p>
        </div>
      ) : (
        <div className="pt-home-hotelsGrid pt-hotels-resultsGrid">
          {hotels.map((hotel) => (
            <HotelResultCard key={hotel.resultIndex} hotel={hotel} session={session} />
          ))}
        </div>
      )}
    </SiteLayout>
  )
}
