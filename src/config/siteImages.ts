/** Local image paths under /public — single source for site imagery. */

import { DARSHAN_HERO_IMAGE_URL } from '../features/darshan/data/images'

const img = {
  destinations: {
    kerala: '/images/destinations/kerala.jpg',
    goa: '/images/destinations/goa.jpg',
    manali: '/images/destinations/manali.png',
    rajasthan: '/images/destinations/rajasthan.jpg',
    andaman: '/images/destinations/andaman.jpg',
  },
  hotels: {
    leelaDel: '/images/hotels/leela-del.jpg',
    tajGoa: '/images/hotels/taj-goa.png',
    itcBlr: '/images/hotels/itc-blr.jpg',
    oberoiBom: '/images/hotels/oberoi-bom.png',
    umaidJod: '/images/hotels/umaid-jod.png',
    vivantaSxr: '/images/hotels/vivanta-sxr.png',
  },
  deals: {
    delhi: '/images/deals/delhi-hotel.jpg',
    goa: '/images/deals/goa-resort.jpg',
    bangalore: '/images/deals/bangalore-hotel.jpg',
    mumbai: '/images/deals/mumbai-hotel.jpg',
  },
  blog: {
    goaBeaches: '/images/blog/goa-beaches.jpg',
    manaliBudget: '/images/blog/manali-budget.jpg',
    keralaGuide: '/images/blog/kerala-guide.jpg',
  },
  offers: {
    flight: '/images/offers/flight.jpg',
    hotel: '/images/offers/hotel.jpg',
    train: '/images/offers/train.png',
  },
  avatars: {
    karan: '/images/avatars/karan.jpg',
    sneha: '/images/avatars/sneha.jpg',
    arjun: '/images/avatars/arjun.jpg',
  },
} as const

export const SITE_IMAGES = {
  hero: {
    flights: '/hero-bg-flights.png',
    trains: '/hero-bg-trains.png',
    buses: '/hero-bg-buses.png',
    hotels: '/hero-bg-hotels.png',
    darshan: DARSHAN_HERO_IMAGE_URL,
  },
  weekendDeals: [
    { image: img.deals.delhi, imageAlt: 'Luxury hotel room in New Delhi' },
    { image: img.deals.goa, imageAlt: 'Beach resort pool in Goa' },
    { image: img.deals.bangalore, imageAlt: 'Boutique hotel in Bengaluru' },
    { image: img.deals.mumbai, imageAlt: 'Harbour-view hotel in Mumbai' },
  ],
  destinations: {
    kerala: { image: img.destinations.kerala, imageAlt: 'Kerala backwaters and palm-lined canals' },
    goa: { image: img.destinations.goa, imageAlt: 'Golden sand beach in Goa at sunset' },
    manali: { image: img.destinations.manali, imageAlt: 'Snow-capped Himalayan peaks near Manali' },
    rajasthan: {
      image: img.destinations.rajasthan,
      imageAlt: 'Historic palace architecture in Rajasthan',
    },
    andaman: { image: img.destinations.andaman, imageAlt: 'Turquoise waters of the Andaman Islands' },
  },
  trendingHotels: {
    'leela-del': { image: img.hotels.leelaDel, imageAlt: 'The Leela Palace New Delhi' },
    'taj-goa': { image: img.hotels.tajGoa, imageAlt: 'Taj Exotica resort Goa' },
    'itc-blr': { image: img.hotels.itcBlr, imageAlt: 'ITC Windsor Bengaluru' },
    'oberoi-bom': { image: img.hotels.oberoiBom, imageAlt: 'The Oberoi Mumbai' },
    'umaid-jod': { image: img.hotels.umaidJod, imageAlt: 'Umaid Bhawan Palace Jodhpur' },
    'vivanta-sxr': { image: img.hotels.vivantaSxr, imageAlt: 'Vivanta Dal View Srinagar' },
  },
  blog: {
    'goa-beaches': { image: img.blog.goaBeaches, imageAlt: 'Hidden cove beach in Goa' },
    'manali-budget': { image: img.blog.manaliBudget, imageAlt: 'Mountain valley near Manali' },
    'kerala-guide': { image: img.blog.keralaGuide, imageAlt: 'Houseboat on Kerala backwaters' },
  },
  memberOffers: [
    { image: img.offers.flight, imageAlt: 'Passenger boarding a flight at sunrise' },
    { image: img.offers.hotel, imageAlt: 'Luxury hotel suite with city view' },
    { image: img.offers.train, imageAlt: 'Scenic train journey through Indian hills' },
  ],
  reviewAvatars: [
    { image: img.avatars.karan, imageAlt: 'Portrait of Karan M.' },
    { image: img.avatars.sneha, imageAlt: 'Portrait of Sneha R.' },
    { image: img.avatars.arjun, imageAlt: 'Portrait of Arjun T.' },
  ],
  appMockup: '/images/deals/mumbai-hotel.jpg',
} as const
