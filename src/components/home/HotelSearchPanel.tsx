import { CalendarDays, ChevronDown, MapPin, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchHotels } from '../../api/hotels'
import { ApiClientError } from '../../api/client'
import { HOTEL_CITIES } from '../../config/hotelCities'
import { saveHotelSearchSession } from '../../utils/hotelSession'
import { AppIcon } from '../ui/AppIcon'

function todayIso(): string {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function addDaysIso(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function HotelSearchPanel() {
  const navigate = useNavigate()
  const [cityId, setCityId] = useState(HOTEL_CITIES[0].cityId)
  const [checkIn, setCheckIn] = useState(addDaysIso(7))
  const [checkOut, setCheckOut] = useState(addDaysIso(8))
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedCity = HOTEL_CITIES.find((c) => c.cityId === cityId) ?? HOTEL_CITIES[0]

  async function handleSearch() {
    setError('')

    if (checkOut <= checkIn) {
      setError('Check-out must be after check-in')
      return
    }

    setLoading(true)
    try {
      const roomGuests = Array.from({ length: rooms }, () => ({
        NoOfAdults: String(adults),
        NoOfChild: String(children),
        ChildAge: children > 0 ? Array.from({ length: children }, () => 8) : [],
      }))

      const result = await searchHotels({
        CheckInDate: checkIn,
        CheckOutDate: checkOut,
        CountryCode: selectedCity.countryCode ?? 'IN',
        CityId: cityId,
        RequestType: 'International',
        NoOfRooms: String(rooms),
        RoomGuests: roomGuests,
      })

      const session = {
        traceId: result.traceId,
        srdvType: result.srdvType,
        cityName: selectedCity.name,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        searchResult: result,
      }

      saveHotelSearchSession(session)
      navigate('/hotels/search', { state: session })
    } catch (err) {
      const message =
        err instanceof ApiClientError ? err.message : 'Unable to search hotels. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="pt-home__fieldsWrap pt-home__fieldsWrap--hotels">
        <div className="pt-home__grid pt-home__grid--hotels">
          <label className="pt-home__cell pt-home__cell--withIcon pt-home__cell--field">
            <span className="pt-home__cellIconBadge">
              <AppIcon icon={MapPin} size={18} className="pt-icon pt-icon--field" />
            </span>
            <div className="pt-home__cellStack">
              <span className="pt-home__cellLabel">City</span>
              <select
                className="pt-home__fieldInput"
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
              >
                {HOTEL_CITIES.map((city) => (
                  <option key={city.id} value={city.cityId}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <AppIcon icon={ChevronDown} size={20} className="pt-home__cellChevron pt-icon" />
          </label>

          <label className="pt-home__cell pt-home__cell--withIcon pt-home__cell--field">
            <span className="pt-home__cellIconBadge">
              <AppIcon icon={CalendarDays} size={18} className="pt-icon pt-icon--field" />
            </span>
            <div className="pt-home__cellStack">
              <span className="pt-home__cellLabel">Check-in</span>
              <input
                type="date"
                className="pt-home__fieldInput"
                value={checkIn}
                min={todayIso()}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </label>

          <label className="pt-home__cell pt-home__cell--withIcon pt-home__cell--field">
            <span className="pt-home__cellIconBadge">
              <AppIcon icon={CalendarDays} size={18} className="pt-icon pt-icon--field" />
            </span>
            <div className="pt-home__cellStack">
              <span className="pt-home__cellLabel">Check-out</span>
              <input
                type="date"
                className="pt-home__fieldInput"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </label>

          <label className="pt-home__cell pt-home__cell--withIcon pt-home__cell--field">
            <span className="pt-home__cellIconBadge">
              <AppIcon icon={Users} size={18} className="pt-icon pt-icon--field" />
            </span>
            <div className="pt-home__cellStack pt-home__cellStack--guests">
              <span className="pt-home__cellLabel">Guests &amp; Rooms</span>
              <div className="pt-home__guestRow">
                <select
                  className="pt-home__fieldInput pt-home__fieldInput--compact"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  aria-label="Adults"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} Adult{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <select
                  className="pt-home__fieldInput pt-home__fieldInput--compact"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  aria-label="Children"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n} Child{n !== 1 ? 'ren' : ''}
                    </option>
                  ))}
                </select>
                <select
                  className="pt-home__fieldInput pt-home__fieldInput--compact"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  aria-label="Rooms"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} Room{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </label>
        </div>
      </div>

      {error ? <p className="pt-home__searchError">{error}</p> : null}

      <div className="pt-home__searchCtaInner">
        <button
          type="button"
          className="pt-home__searchBtn"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching…' : 'Explore Hotels'}
        </button>
      </div>
    </>
  )
}
