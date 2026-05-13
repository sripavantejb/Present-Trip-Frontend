const DEALS = [
  {
    name: 'The Orion Suites',
    place: 'New Delhi',
    rating: '4.3',
    reviews: 512,
    discount: '20% off',
    price: '2,599',
    tone: 'a' as const,
  },
  {
    name: 'Azure Bay Resort',
    place: 'Goa',
    rating: '4.6',
    reviews: 328,
    discount: '25% off',
    price: '3,899',
    tone: 'b' as const,
  },
  {
    name: 'Cityline Hotel',
    place: 'Bengaluru',
    rating: '4.1',
    reviews: 890,
    discount: '15% off',
    price: '1,999',
    tone: 'c' as const,
  },
  {
    name: 'Harbour View Inn',
    place: 'Mumbai',
    rating: '4.5',
    reviews: 204,
    discount: '20% off',
    price: '4,200',
    tone: 'd' as const,
  },
]

export function OffersSection() {
  return (
    <section id="dutyfree" className="pt-home__deals" aria-labelledby="deals-heading">
      <div className="pt-home__dealsHead">
        <div>
          <h2 id="deals-heading" className="pt-home__dealsTitle">
            Last-minute weekend deals
          </h2>
          <p className="pt-home__dealsSub">
            Minimum 20% off deals for your next weekend getaway!
          </p>
        </div>
        <a href="#deals" className="pt-home__dealsSeeAll">
          See all deals
        </a>
      </div>

      <div className="pt-home__dealsTrack">
        <div className="pt-home__dealsCards" role="list">
          {DEALS.map((d) => (
            <article
              key={d.name}
              className={`pt-home__dealCard pt-home__dealCard--${d.tone}`}
              role="listitem"
            >
              <div className="pt-home__dealMedia">
                <button type="button" className="pt-home__dealHeart" aria-label="Save deal">
                  <IconHeart />
                </button>
              </div>
              <div className="pt-home__dealBody">
                <h3 className="pt-home__dealName">{d.name}</h3>
                <p className="pt-home__dealPlace">{d.place}</p>
                <div className="pt-home__dealRating">
                  <span className="pt-home__dealDot" aria-hidden />
                  <span>
                    {d.rating} ({d.reviews} reviews)
                  </span>
                </div>
                <div className="pt-home__dealRow">
                  <span className="pt-home__dealTag">{d.discount}</span>
                </div>
                <p className="pt-home__dealPrice">
                  From <strong>₹{d.price}</strong> / night
                </p>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className="pt-home__dealsScrollBtn" aria-label="More deals">
          ›
        </button>
      </div>
    </section>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  )
}
