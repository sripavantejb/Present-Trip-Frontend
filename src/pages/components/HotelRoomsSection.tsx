import { useState } from 'react'
import type { HotelRoomItem, HotelRoomsResponse } from '../../api/types/hotels'
import { saveSelectedHotelRoom, loadSelectedHotelRoom } from '../../utils/hotelRoomSelection'

type Props = {
  hotelCode: string
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  roomsData: HotelRoomsResponse | null
  loading: boolean
  error: string
}

function formatPrice(amount: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function RoomCard({
  room,
  hotelCode,
  traceId,
  srdvType,
  srdvIndex,
  resultIndex,
  selectedRoomIndex,
  onSelect,
}: {
  room: HotelRoomItem
  hotelCode: string
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  selectedRoomIndex: string | null
  onSelect: (room: HotelRoomItem) => void
}) {
  const [showPolicies, setShowPolicies] = useState(false)
  const isSelected = selectedRoomIndex === room.roomIndex
  const thumb = room.images[0] || ''

  return (
    <article className={`pt-hotels-roomCard${isSelected ? ' pt-hotels-roomCard--selected' : ''}`}>
      {thumb ? (
        <img src={thumb} alt="" className="pt-hotels-roomCardImg" loading="lazy" />
      ) : (
        <div className="pt-hotels-roomCardImg pt-hotels-roomCardImg--placeholder" />
      )}
      <div className="pt-hotels-roomCardBody">
        <h4 className="pt-hotels-roomCardTitle">{room.roomTypeName}</h4>
        {room.mealPlan ? <p className="pt-hotels-roomCardMeal">{room.mealPlan}</p> : null}
        <div className="pt-hotels-roomCardBadges">
          {room.fullRefundAllowed ? (
            <span className="pt-hotels-roomBadge pt-hotels-roomBadge--refund">Refundable</span>
          ) : (
            <span className="pt-hotels-roomBadge pt-hotels-roomBadge--norefund">Non-refundable</span>
          )}
          {room.isPanMandatory ? (
            <span className="pt-hotels-roomBadge">PAN required</span>
          ) : null}
          {room.roomStatus ? (
            <span className="pt-hotels-roomBadge">{room.roomStatus}</span>
          ) : null}
        </div>
        {room.amenities.length > 0 ? (
          <ul className="pt-hotels-roomAmenities">
            {room.amenities.slice(0, 4).map((a) => (
              <li key={a.Name}>{a.Name}</li>
            ))}
          </ul>
        ) : null}
        {room.cancellationPolicies.length > 0 ? (
          <div className="pt-hotels-roomPolicies">
            <button
              type="button"
              className="pt-hotels-roomPoliciesToggle"
              onClick={() => setShowPolicies((v) => !v)}
            >
              {showPolicies ? 'Hide' : 'View'} cancellation policy
            </button>
            {showPolicies ? (
              <ul className="pt-hotels-roomPolicyList">
                {room.cancellationPolicies.map((p, i) => (
                  <li key={i}>
                    {p.FromDate} → {p.ToDate}: {p.Charge} {p.Currency}
                    {p.ChargeType === 1 ? '%' : ''} charge
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="pt-hotels-roomCardFooter">
          <p className="pt-hotels-roomCardPrice">
            <strong>{formatPrice(room.displayPrice, room.price.currencyCode)}</strong>
            <span> total</span>
          </p>
          <button
            type="button"
            className={`pt-hotels-roomSelectBtn${isSelected ? ' pt-hotels-roomSelectBtn--selected' : ''}`}
            onClick={() => onSelect(room)}
          >
            {isSelected ? 'Selected' : 'Select room'}
          </button>
        </div>
      </div>
    </article>
  )
}

export function HotelRoomsSection({
  hotelCode,
  traceId,
  srdvType,
  srdvIndex,
  resultIndex,
  roomsData,
  loading,
  error,
}: Props) {
  const initialSelection = loadSelectedHotelRoom(hotelCode)
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<string | null>(
    initialSelection?.room.roomIndex ?? null,
  )

  function handleSelect(room: HotelRoomItem) {
    setSelectedRoomIndex(room.roomIndex)
    saveSelectedHotelRoom({
      hotelCode,
      traceId,
      srdvType,
      srdvIndex,
      resultIndex,
      room,
    })
  }

  if (loading) {
    return (
      <section className="pt-hotels-section">
        <h2>Available rooms</h2>
        <p className="pt-hotels-roomsStatus">Loading rooms and rates…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="pt-hotels-section">
        <h2>Available rooms</h2>
        <p className="pt-hotels-roomsStatus pt-hotels-roomsStatus--error">{error}</p>
      </section>
    )
  }

  if (!roomsData || roomsData.count === 0) {
    return (
      <section className="pt-hotels-section">
        <h2>Available rooms</h2>
        <p className="pt-hotels-roomsStatus">No rooms available for these dates.</p>
      </section>
    )
  }

  return (
    <section className="pt-hotels-section pt-hotels-roomsSection">
      <h2>Available rooms</h2>
      <p className="pt-hotels-roomsCount">{roomsData.count} room options found</p>
      {roomsData.categories.map((category) =>
        category.rooms.length > 0 ? (
          <div key={category.categoryName} className="pt-hotels-roomCategory">
            <h3 className="pt-hotels-roomCategoryTitle">{category.categoryName}</h3>
            <div className="pt-hotels-roomGrid">
              {category.rooms.map((room) => (
                <RoomCard
                  key={room.roomIndex || room.roomId}
                  room={room}
                  hotelCode={hotelCode}
                  traceId={traceId}
                  srdvType={srdvType}
                  srdvIndex={srdvIndex}
                  resultIndex={resultIndex}
                  selectedRoomIndex={selectedRoomIndex}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        ) : null,
      )}
    </section>
  )
}
