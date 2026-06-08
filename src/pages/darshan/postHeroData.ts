/** Mock content for post-hero Darshan sections (sections 1–9) */

import { STAY_IMAGES, TRANSPORT_IMAGES, TRENDING_IMAGES } from '../../features/darshan/data/images'

export type SlotStatus = 'available' | 'filling' | 'full'
export type WaitLevel = 'short' | 'moderate' | 'long'

export type DarshanTypeCard = {
  id: string
  name: string
  price: string
  waitTime: string
  waitLevel: WaitLevel
  audience: string
  description: string
  slotStatus: SlotStatus
  featured?: boolean
}

export type PackageInclusionKey = 'darshan' | 'stay' | 'transport' | 'coordinator'

export type CuratedPackage = {
  id: string
  name: string
  priceFrom: string
  idealFor: string
  popular?: boolean
  inclusions: { key: PackageInclusionKey; label: string }[]
}

export type StayType = 'TTD Guest House' | 'Hotel' | 'Dharamshala' | 'Resort'
export type StayLocation = 'Tirupati town' | 'Tirumala Hills'
export type BudgetBand = 'under500' | 'mid' | 'premium'

export type AccommodationListing = {
  id: string
  name: string
  type: StayType
  location: StayLocation
  budget: BudgetBand
  guests: number[]
  distance: string
  rating: number
  reviews: number
  amenities: string[]
  pricePerNight: string
  availability: string
  imageUrl: string
  imageAlt: string
}

export type PrivateVehicleOption = {
  id: string
  name: string
  capacity: string
  ac: boolean
  priceRange: string
  idealFor: string
  imageUrl: string
  imageAlt: string
}

export type PublicRoute = {
  id: string
  route: string
  operator: string
  frequency: string
  duration: string
  tokenBundled: boolean
}

export type PilgrimInfoTopic = {
  id: string
  title: string
  iconKey: 'documents' | 'dress' | 'timing' | 'food' | 'tonsure' | 'accessibility'
  bullets: string[]
}

export type SevaOffering = {
  id: string
  name: string
  time: string
  price: string
  description: string
  availability: string
}

export type PilgrimReview = {
  id: string
  name: string
  city: string
  rating: number
  packageUsed: string
  quote: string
  visitDate: string
}

export type WhyBookPoint = {
  id: string
  title: string
  description: string
  iconKey: 'ticket' | 'refresh' | 'phone' | 'compass'
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const DARSHAN_TYPE_CARDS: DarshanTypeCard[] = [
  {
    id: 'sarva',
    name: 'Sarva Darshan (Free)',
    price: '₹0',
    waitTime: '6–20 hrs',
    waitLevel: 'long',
    audience: 'Budget pilgrims, walk-in',
    description: 'General queue darshan with no special entry fee.',
    slotStatus: 'available',
  },
  {
    id: 'slotted',
    name: 'Slotted Sarva Darshan',
    price: '₹0',
    waitTime: '1–3 hrs',
    waitLevel: 'moderate',
    audience: 'Pre-slot token holders',
    description: 'Free darshan with a pre-issued time slot token.',
    slotStatus: 'filling',
  },
  {
    id: 'special300',
    name: 'Special Entry Darshan',
    price: '₹300/person',
    waitTime: '2–4 hrs',
    waitLevel: 'moderate',
    audience: 'Most popular online booking',
    description: 'Dedicated corridor — the go-to paid option for families.',
    slotStatus: 'filling',
    featured: true,
  },
  {
    id: 'vip',
    name: 'VIP Break Darshan',
    price: '₹10,500/person',
    waitTime: '45–60 min',
    waitLevel: 'short',
    audience: 'SRIVANI Trust donors, VIPs',
    description: 'Priority entry with coordinator support on the hill.',
    slotStatus: 'available',
  },
  {
    id: 'seva',
    name: 'Seva / Arjitha Darshan',
    price: '₹200–₹1,000',
    waitTime: 'Scheduled slot',
    waitLevel: 'short',
    audience: 'Devotees wanting specific rituals',
    description: 'Ritual-linked darshan at fixed seva timings.',
    slotStatus: 'available',
  },
]

export const CURATED_PACKAGES: CuratedPackage[] = [
  {
    id: 'saver',
    name: 'Devotee Saver',
    priceFrom: '₹1,499/person',
    idealFor: 'Solo pilgrims, budget travelers',
    inclusions: [
      { key: 'darshan', label: 'Sarva Darshan token assist' },
      { key: 'stay', label: 'Budget guesthouse (1 night)' },
      { key: 'transport', label: 'TSRTC/APSRTC bus (one-way)' },
    ],
  },
  {
    id: 'family',
    name: 'Family Comfort',
    priceFrom: '₹4,999/person',
    idealFor: 'Families, 2–6 persons',
    popular: true,
    inclusions: [
      { key: 'darshan', label: 'Special Entry Darshan (₹300 booked)' },
      { key: 'stay', label: '3-star hotel (1 night)' },
      { key: 'transport', label: 'Private cab pick-up & drop' },
    ],
  },
  {
    id: 'vip',
    name: 'Divine VIP',
    priceFrom: '₹14,999/person',
    idealFor: 'Premium pilgrims, senior citizens, groups',
    inclusions: [
      { key: 'darshan', label: 'VIP Break Darshan (priority entry)' },
      { key: 'stay', label: '4-star hotel' },
      { key: 'transport', label: 'Private AC vehicle' },
      { key: 'coordinator', label: 'Dedicated trip coordinator' },
    ],
  },
]

export const PACKAGE_ADD_ONS = [
  { id: 'prasadam', label: 'Prasadam assist' },
  { id: 'tonsure', label: 'Head tonsure booking' },
  { id: 'airport', label: 'Airport pickup' },
] as const

export const ACCOMMODATION_LISTINGS: AccommodationListing[] = [
  {
    id: 'a1',
    name: 'Padmavathi Residency',
    type: 'Hotel',
    location: 'Tirupati town',
    budget: 'mid',
    guests: [1, 2, 3, 4],
    distance: '0.8 km from Alipiri',
    rating: 4.2,
    reviews: 318,
    amenities: ['AC', 'Parking', 'Veg meals', 'Hot water'],
    pricePerNight: '₹1,850',
    availability: '3 rooms left',
    imageUrl: STAY_IMAGES.a1.url,
    imageAlt: STAY_IMAGES.a1.alt,
  },
  {
    id: 'a2',
    name: 'TTD Srinivasam Complex',
    type: 'TTD Guest House',
    location: 'Tirumala Hills',
    budget: 'under500',
    guests: [1, 2],
    distance: 'Near temple queue complex',
    rating: 4.5,
    reviews: 892,
    amenities: ['Non-AC', 'Veg meals', 'Locker assist'],
    pricePerNight: '₹350',
    availability: 'Quota release weekly',
    imageUrl: STAY_IMAGES.a2.url,
    imageAlt: STAY_IMAGES.a2.alt,
  },
  {
    id: 'a3',
    name: 'Sri Venkateswara Dharamshala',
    type: 'Dharamshala',
    location: 'Tirupati town',
    budget: 'under500',
    guests: [1, 2, 3, 4, 5],
    distance: '1.2 km from railway station',
    rating: 4.0,
    reviews: 156,
    amenities: ['Non-AC', 'Veg meals', '24hr hot water'],
    pricePerNight: '₹450',
    availability: 'Available',
    imageUrl: STAY_IMAGES.a3.url,
    imageAlt: STAY_IMAGES.a3.alt,
  },
  {
    id: 'a4',
    name: 'Hillside Grand',
    type: 'Hotel',
    location: 'Tirupati town',
    budget: 'premium',
    guests: [2, 3, 4],
    distance: '2.1 km from temple gates',
    rating: 4.6,
    reviews: 421,
    amenities: ['AC', 'Parking', 'Veg meals', 'Hot water'],
    pricePerNight: '₹4,200',
    availability: '5 rooms left',
    imageUrl: STAY_IMAGES.a4.url,
    imageAlt: STAY_IMAGES.a4.alt,
  },
  {
    id: 'a5',
    name: 'Seven Hills Resort',
    type: 'Resort',
    location: 'Tirupati town',
    budget: 'premium',
    guests: [2, 3, 4, 5],
    distance: '4 km from Alipiri (quiet)',
    rating: 4.7,
    reviews: 203,
    amenities: ['AC', 'Parking', 'Veg meals', 'Hot water'],
    pricePerNight: '₹5,800',
    availability: 'Weekend filling fast',
    imageUrl: STAY_IMAGES.a5.url,
    imageAlt: STAY_IMAGES.a5.alt,
  },
  {
    id: 'a6',
    name: 'Balaji Comfort Lodge',
    type: 'Hotel',
    location: 'Tirupati town',
    budget: 'mid',
    guests: [1, 2, 3],
    distance: '0.5 km from bus stand',
    rating: 3.9,
    reviews: 267,
    amenities: ['AC', 'Veg meals', 'Hot water'],
    pricePerNight: '₹1,200',
    availability: 'Available',
    imageUrl: STAY_IMAGES.a6.url,
    imageAlt: STAY_IMAGES.a6.alt,
  },
]

export const PRIVATE_VEHICLES: PrivateVehicleOption[] = [
  {
    id: 'v1',
    name: 'Cab (Sedan)',
    capacity: 'Up to 4 passengers',
    ac: true,
    priceRange: '₹12–₹15/km',
    idealFor: 'Families',
    imageUrl: TRANSPORT_IMAGES.v1.url,
    imageAlt: TRANSPORT_IMAGES.v1.alt,
  },
  {
    id: 'v2',
    name: 'Tempo Traveller',
    capacity: '9–12 passengers',
    ac: true,
    priceRange: '₹18–₹22/km',
    idealFor: 'Group pilgrimages',
    imageUrl: TRANSPORT_IMAGES.v2.url,
    imageAlt: TRANSPORT_IMAGES.v2.alt,
  },
  {
    id: 'v3',
    name: 'Luxury SUV',
    capacity: 'Up to 6 passengers',
    ac: true,
    priceRange: '₹20–₹25/km',
    idealFor: 'VIP trips',
    imageUrl: TRANSPORT_IMAGES.v3.url,
    imageAlt: TRANSPORT_IMAGES.v3.alt,
  },
  {
    id: 'v4',
    name: 'Mini Coach',
    capacity: '20–30 passengers',
    ac: true,
    priceRange: '₹28–₹35/km',
    idealFor: 'Large group pilgrimages',
    imageUrl: TRANSPORT_IMAGES.v4.url,
    imageAlt: TRANSPORT_IMAGES.v4.alt,
  },
]

export const PUBLIC_ROUTES: PublicRoute[] = [
  { id: 'r1', route: 'Hyderabad → Tirupati', operator: 'TSRTC', frequency: '30 buses/day', duration: '8–9 hrs', tokenBundled: true },
  { id: 'r2', route: 'Bangalore → Tirupati', operator: 'KSRTC', frequency: '15 buses/day', duration: '5–6 hrs', tokenBundled: true },
  { id: 'r3', route: 'Chennai → Tirupati', operator: 'TNSTC', frequency: '20 buses/day', duration: '3–4 hrs', tokenBundled: false },
  { id: 'r4', route: 'Hyderabad → Tirupati', operator: 'Train (AP Exp)', frequency: '2 trains/day', duration: '10–11 hrs', tokenBundled: false },
]

export const PILGRIM_INFO_TOPICS: PilgrimInfoTopic[] = [
  {
    id: 'docs',
    title: 'Documents Required',
    iconKey: 'documents',
    bullets: [
      'Aadhaar card (mandatory for Indians, for all darshan types)',
      'Passport (for NRI devotees)',
      'PAN card / Voter ID / Driving licence (as alternate ID)',
      'Booking confirmation printout or e-ticket on phone',
      'Children below 12 years: no ticket required, carry age proof',
    ],
  },
  {
    id: 'dress',
    title: 'Dress Code',
    iconKey: 'dress',
    bullets: [
      'Men: Dhoti + upper cloth (angavastram) OR full-length trousers with shirt',
      'Women: Saree / half-saree with blouse OR churidar with upper cloth (dupatta)',
      'Western casuals (shorts, sleeveless, jeans) are NOT permitted inside the sanctum',
      'Dress code checked at queue entry point',
    ],
  },
  {
    id: 'timing',
    title: 'Best Time to Visit',
    iconKey: 'timing',
    bullets: [
      'Weekdays (Tuesday–Thursday): Shorter wait times',
      'Avoid festival days (Brahmotsavam, Vaikunta Ekadasi), weekends, public holidays — queues can extend 20+ hours',
      'Early morning darshans (4 AM–8 AM): Less crowded even on busy days',
    ],
  },
  {
    id: 'food',
    title: 'Food & Prasadam',
    iconKey: 'food',
    bullets: [
      'Annadanam (free meals) served daily at the Annaprasadam complex — open to all pilgrims',
      'Tirupati Laddu: Included with paid darshan tickets; extra laddus available at ₹50 each',
      'Only vegetarian food is permitted inside Tirumala Hills',
    ],
  },
  {
    id: 'tonsure',
    title: 'Head Tonsure (Mokku)',
    iconKey: 'tonsure',
    bullets: [
      'Available free of cost at Kalyanakatta buildings',
      'Advance token available; no separate charge',
      'We can assist with booking the tonsure slot as an add-on',
    ],
  },
  {
    id: 'access',
    title: 'Special Assistance',
    iconKey: 'accessibility',
    bullets: [
      'Separate queues for: Senior citizens (65+), differently-abled devotees, parents with infants',
      'Wheelchair assistance available at entry points',
      'Companion allowed inside queue',
    ],
  },
]

export const SEVA_OFFERINGS: SevaOffering[] = [
  { id: 'sv1', name: 'Suprabhatam Seva', time: '3 AM', price: '₹500', description: 'Wake-up prayers for the Lord', availability: 'Filling fast' },
  { id: 'sv2', name: 'Thomala Seva', time: '4:30 AM', price: '₹500', description: 'Floral decoration ritual', availability: 'Available' },
  { id: 'sv3', name: 'Archana', time: '8 AM', price: '₹200', description: 'Personal name-gotra chanting', availability: 'Available' },
  { id: 'sv4', name: 'Kalyanotsavam', time: '10 AM', price: '₹1,000', description: 'Sacred celestial wedding ritual', availability: 'Limited' },
  { id: 'sv5', name: 'Sahasra Deepalankara Seva', time: '5 PM', price: '₹500', description: 'Thousand-lamp illumination', availability: 'Available' },
  { id: 'sv6', name: 'Arjitha Brahmotsavam', time: '12:30 PM', price: '₹200', description: 'Procession ritual', availability: 'Filling fast' },
]

export const PILGRIM_REVIEWS: PilgrimReview[] = [
  {
    id: 'rv1',
    name: 'Sudha M.',
    city: 'Bangalore',
    rating: 5,
    packageUsed: 'Family Comfort Package · Tirupati',
    quote:
      'Booked the Family Comfort package for 4 of us. The Special Entry darshan ticket was pre-confirmed, hotel was clean and just 1 km from the main gate. Driver was very familiar with temple timings. Absolutely stress-free trip.',
    visitDate: 'March 2025',
  },
  {
    id: 'rv2',
    name: 'Arun T.',
    city: 'Hyderabad',
    rating: 5,
    packageUsed: 'TSRTC bus + darshan token',
    quote:
      'TSRTC bus + darshan token combo was very convenient. Saved us so much trouble of booking separately. The darshan happened in exactly 2.5 hrs.',
    visitDate: 'January 2025',
  },
  {
    id: 'rv3',
    name: 'Priya N.',
    city: 'Chennai',
    rating: 5,
    packageUsed: 'Divine VIP Package',
    quote:
      'VIP package was worth every rupee for elderly parents. No queues, dedicated coordinator, and back at the hotel in under 3 hours.',
    visitDate: 'February 2025',
  },
  {
    id: 'rv4',
    name: 'Ravi K.',
    city: 'Hyderabad',
    rating: 4,
    packageUsed: 'Devotee Saver',
    quote: 'Budget-friendly and honest about wait times. Bus was on schedule and the guesthouse was basic but clean.',
    visitDate: 'December 2024',
  },
  {
    id: 'rv5',
    name: 'Lakshmi P.',
    city: 'Vijayawada',
    rating: 5,
    packageUsed: 'Seva + Special Entry',
    quote: 'They booked Thomala Seva and coordinated our darshan slot perfectly. Support team answered calls at 4 AM.',
    visitDate: 'April 2025',
  },
  {
    id: 'rv6',
    name: 'Mohit S.',
    city: 'Pune',
    rating: 4,
    packageUsed: 'Private cab + hotel',
    quote: 'Clear pricing on transport and a driver who knew every ghat road halt. Would book again for our parents.',
    visitDate: 'November 2024',
  },
  {
    id: 'rv7',
    name: 'Anitha R.',
    city: 'Coimbatore',
    rating: 5,
    packageUsed: 'Family Comfort Package',
    quote: 'Kids loved the trip — timing was relaxed and meals were all vegetarian as promised.',
    visitDate: 'March 2025',
  },
  {
    id: 'rv8',
    name: 'Karthik V.',
    city: 'Bengaluru',
    rating: 5,
    packageUsed: 'VIP Break Darshan',
    quote: 'Senior parents completed darshan in under an hour. Coordinator stayed with us through the queue.',
    visitDate: 'February 2025',
  },
  {
    id: 'rv9',
    name: 'Meena D.',
    city: 'Chennai',
    rating: 4,
    packageUsed: 'Accommodation only',
    quote: 'Hotel near Alipiri was exactly as described. Easy walk to queue starting point.',
    visitDate: 'January 2025',
  },
  {
    id: 'rv10',
    name: 'Suresh B.',
    city: 'Hyderabad',
    rating: 5,
    packageUsed: 'TSRTC Special Darshan bus',
    quote: 'Token was bundled with the bus ticket. Highly recommend booking early — seats go fast.',
    visitDate: 'December 2024',
  },
  {
    id: 'rv11',
    name: 'Divya H.',
    city: 'Mumbai',
    rating: 5,
    packageUsed: 'Divine VIP Package',
    quote: 'End-to-end coordination was flawless. Every detail from cab to laddu counter was handled.',
    visitDate: 'April 2025',
  },
  {
    id: 'rv12',
    name: 'Gopal N.',
    city: 'Tirupati',
    rating: 4,
    packageUsed: 'Special Entry assist',
    quote: 'Helped extended family from abroad with ID and dress code briefing. Very professional desk.',
    visitDate: 'March 2025',
  },
]

export const WHY_BOOK_POINTS: WhyBookPoint[] = [
  { id: 'wb1', title: 'Confirmed Darshan Slots', description: 'We pre-book your darshan token; no on-arrival uncertainty', iconKey: 'ticket' },
  { id: 'wb2', title: 'Flexible Cancellation', description: 'Cancel up to 48 hrs before travel for full refund', iconKey: 'refresh' },
  { id: 'wb3', title: '24/7 Pilgrim Support', description: 'Dedicated helpline for darshan timing changes, hotel queries', iconKey: 'phone' },
  { id: 'wb4', title: 'End-to-End Coordination', description: 'One booking covers darshan + stay + transport + sevas', iconKey: 'compass' },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    question: 'How far in advance should I book a darshan ticket?',
    answer:
      'Special Entry and seva slots typically open 2–4 weeks ahead and sell quickly. VIP and bundled bus packages should be booked as early as possible — we recommend at least 2–3 weeks before travel for peak seasons.',
  },
  {
    id: 'f2',
    question: 'What is the difference between Special Entry Darshan and Sarva Darshan?',
    answer:
      'Sarva Darshan is the free general queue with longer waits. Special Entry Darshan (₹300) uses a dedicated paid corridor with significantly shorter average wait times and is the most popular online option.',
  },
  {
    id: 'f3',
    question: 'Can children get darshan without a ticket?',
    answer:
      'Children below 12 years do not require a separate ticket but should carry age proof (birth certificate or school ID). They must follow the same dress code as adults.',
  },
  {
    id: 'f4',
    question: 'What documents must I carry to the temple?',
    answer:
      'Carry Aadhaar (mandatory for Indian devotees), your booking confirmation on phone or printout, and alternate ID if needed. NRIs should carry passport. See our Documents section for the full list.',
  },
  {
    id: 'f5',
    question: 'Is accommodation available inside Tirumala Hills?',
    answer:
      'Yes — TTD offers guest houses and dormitories on the hill, booked via the official TTD website. We help you book private hotels, dharamshalas, and resorts in Tirupati town and coordinate hill transfers.',
  },
  {
    id: 'f6',
    question: 'Can I cancel or reschedule my package?',
    answer:
      'Most packages allow free cancellation up to 48 hours before travel. Rescheduling depends on slot availability — contact our 24×7 desk and we will assist with TTD rules that apply to your booking type.',
  },
  {
    id: 'f7',
    question: 'What is the SRIVANI Trust VIP darshan scheme?',
    answer:
      'SRIVANI Trust donors may access VIP Break Darshan pathways subject to trust rules and daily quotas. We help with eligibility checks and documentation — fees and availability change per TTD advisories.',
  },
  {
    id: 'f8',
    question: 'Are TSRTC buses from Hyderabad reliable for darshan token bundling?',
    answer:
      'TSRTC Special Darshan services are popular and generally reliable, with bundled TTD tokens on select services (~1,000 tokens/day). Book early — we monitor availability and confirm your seat and token together.',
  },
]

export const SLOT_STATUS_LABELS: Record<SlotStatus, string> = {
  available: 'Available',
  filling: 'Filling Fast',
  full: 'Full',
}

export type TrendingTemple = {
  rank: number
  id: string
  name: string
  location: string
  bookings: number
  changePercent: number
  imageUrl: string
  imageAlt: string
}

export const TRENDING_TEMPLES: TrendingTemple[] = [
  {
    rank: 1,
    id: 'tt1',
    name: 'Sri Venkateswara Temple',
    location: 'Tirumala, Andhra Pradesh',
    bookings: 12480,
    changePercent: 18,
    imageUrl: TRENDING_IMAGES.tirupati.url,
    imageAlt: TRENDING_IMAGES.tirupati.alt,
  },
  {
    rank: 2,
    id: 'tt2',
    name: 'Sai Baba Temple',
    location: 'Shirdi, Maharashtra',
    bookings: 8920,
    changePercent: 12,
    imageUrl: TRENDING_IMAGES.shirdi.url,
    imageAlt: TRENDING_IMAGES.shirdi.alt,
  },
  {
    rank: 3,
    id: 'tt3',
    name: 'Vaishno Devi Shrine',
    location: 'Katra, Jammu & Kashmir',
    bookings: 7650,
    changePercent: -4,
    imageUrl: TRENDING_IMAGES.vaishnoDevi.url,
    imageAlt: TRENDING_IMAGES.vaishnoDevi.alt,
  },
  {
    rank: 4,
    id: 'tt4',
    name: 'Jagannath Temple',
    location: 'Puri, Odisha',
    bookings: 5420,
    changePercent: 8,
    imageUrl: TRENDING_IMAGES.puri.url,
    imageAlt: TRENDING_IMAGES.puri.alt,
  },
]
