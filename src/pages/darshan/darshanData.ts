/** Illustrative mock data for the Darshan landing page until APIs are wired */

export type ServiceItem = {
  id: string
  title: string
  blurb: string
  category: string
}

export type PackageItem = {
  id: string
  title: string
  duration: string
  inclusions: string[]
  transport: string
  accommodation: string
  meals: string
  vipBenefit: string
  rating: number
  reviews: number
  priceDisplay: string
  imageGradient: string
  /** Editorial hero image (royalty-free remote URLs for demo) */
  imageUrl?: string
  imageAlt?: string
}

export type DarshanTypeKey =
  | 'free'
  | 'special300'
  | 'vipBreak'
  | 'srivani'
  | 'seva'

export type CompareColumn = {
  key: DarshanTypeKey
  label: string
}

export type CompareRow = {
  label: string
  values: Record<DarshanTypeKey, string>
}

export type TravelFacility = {
  id: string
  title: string
  description: string
  availabilityMock: string
  priceSnippet: string
  rating: number
}

export type InsightCard = {
  id: string
  title: string
  value: string
  hint: string
  level?: 'low' | 'moderate' | 'high'
}

export type WhyCard = {
  id: string
  title: string
  description: string
}

export type Testimonial = {
  id: string
  name: string
  place: string
  quote: string
  rating: number
}

export type ExperienceBlock = {
  id: string
  title: string
  body: string
  accent: string
  imageUrl: string
  imageAlt: string
}

export type BookingTab =
  | 'darshan'
  | 'vip'
  | 'sevas'
  | 'packages'
  | 'stay'
  | 'travel'

/** Hero backdrop — cinematic pilgrimage mood; illustrative stock only (not official TTD photography) */
export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1596120236222-fb4350be68bf?auto=format&fit=crop&w=2400&q=85',
  alt:
    'Illustrative South Indian temple gopuram against soft dawn sky and misty hills — stock photograph, not Tirumala Tirupati Devasthanams',
} as const

/** Split hero right column — gopuram illustration (local SVG) */
export const HERO_SPLIT_TEMPLE_IMAGE = {
  src: '/Untitled%20design.svg',
  alt: 'Architectural illustration of a South Indian temple tower (gopuram)',
} as const

/** Hero booking tabs only (maps `packages` label to “Temple Tours” in UI) */
export const HERO_TAB_ORDER: BookingTab[] = ['darshan', 'vip', 'sevas', 'packages']

export const HERO_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '#darshan-search', label: 'Darshan' },
  { href: '#packages', label: 'Packages' },
  { href: '#sevas', label: 'Sevas' },
  { href: '#accommodation', label: 'Accommodation' },
  { href: '#darshan-types', label: 'Darshan Types' },
  { href: '/support', label: 'Contact' },
] as const

/** Hero booking card tabs (Darshan / Stay / Transport) */
export type HeroBookingTab = 'darshan' | 'stay' | 'transport'

export const HERO_BOOKING_TABS: HeroBookingTab[] = ['darshan', 'stay', 'transport']

export const HERO_BOOKING_TAB_LABELS: Record<HeroBookingTab, string> = {
  darshan: 'Darshan',
  stay: 'Stay',
  transport: 'Transport',
}

export const HERO_TEMPLE_DESTINATIONS = [
  { value: 'tirupati', label: 'Tirupati — Sri Venkateswara Temple' },
  { value: 'vaishno-devi', label: 'Vaishno Devi — Katra, J&K' },
  { value: 'shirdi', label: 'Shirdi — Sai Baba Temple' },
  { value: 'puri', label: 'Puri — Jagannath Temple' },
  { value: 'guruvayur', label: 'Guruvayur — Kerala' },
  { value: 'kedarnath', label: 'Kedarnath — Uttarakhand' },
  { value: 'mahakaleshwar', label: 'Mahakaleshwar — Ujjain' },
  { value: 'kashi', label: 'Kashi Vishwanath — Varanasi' },
] as const

export const HERO_DARSHAN_TYPES = [
  'Sarva Darshan — Free',
  'Slotted Sarva Darshan — Free (Time Slot)',
  'Special Entry Darshan — ₹300/person',
  'VIP Break Darshan — ₹10,500/person',
  'Seva / Arjitha Darshan — ₹200–₹1,000',
] as const

export const HERO_TRANSPORT_TYPES = [
  'Private Cab (up to 4 pax)',
  'Tempo Traveller (up to 12 pax)',
  'Luxury SUV (up to 6 pax)',
  'Mini Coach (up to 30 pax)',
  'TSRTC / State Bus',
  'Train',
] as const

export const HERO_CITY_SUGGESTIONS = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kochi',
  'Visakhapatnam',
  'Bhubaneswar',
  'Chandigarh',
  'Indore',
  'Nagpur',
  'Coimbatore',
  'Vijayawada',
  'Thiruvananthapuram',
  'Mysuru',
] as const

export * from './postHeroData'

export const ACCOMMODATION_OPTIONS = [
  'Not required',
  'Tirupati — budget stay',
  'Tirupati — premium hotel',
  'Hillside / Tirumala tier',
  'Mutt / lodge',
]

export const TRANSPORT_OPTIONS = [
  'Not required',
  'Private cab — sedan',
  'Private cab — SUV',
  'Airport transfer',
  'Railway pickup',
  'AC coach / group',
]

export const BOOKING_TAB_LABELS: Record<BookingTab, string> = {
  darshan: 'Darshan',
  vip: 'VIP Darshan',
  sevas: 'Sevas',
  packages: 'Temple Tour Packages',
  stay: 'Accommodation',
  travel: 'Travel',
}

export function heroTabLabel(tab: BookingTab): string {
  if (tab === 'packages') return 'Temple Tours'
  return BOOKING_TAB_LABELS[tab]
}

export const SERVICES: ServiceItem[] = [
  { id: 's1', title: '₹300 Special Entry Darshan', blurb: 'Faster corridor access with allotment support.', category: 'Darshan' },
  { id: 's2', title: 'VIP Break Darshan', blurb: 'Curated routing with coordinator assistance.', category: 'VIP' },
  { id: 's3', title: 'Srivani Trust Darshan', blurb: 'Donation-linked entry pathways where applicable.', category: 'VIP' },
  { id: 's4', title: 'Seva Booking', blurb: 'Archana, Thomala, and daily sevas — slots guided.', category: 'Seva' },
  { id: 's5', title: 'Accommodation', blurb: 'Hotels, mutts & cottages matched to budget.', category: 'Stay' },
  { id: 's6', title: 'Annadanam', blurb: 'Sponsorship and hall visit coordination.', category: 'Seva' },
  { id: 's7', title: 'Tirupati Airport Pickup', blurb: 'Meet & greet transfers to foothill stays.', category: 'Transport' },
  { id: 's8', title: 'Cab Services', blurb: 'AC sedans & SUVs with hill-experienced drivers.', category: 'Transport' },
  { id: 's9', title: 'Bus Packages', blurb: 'Group-friendly departures from metro cities.', category: 'Transport' },
  { id: 's10', title: 'Elderly Assistance', blurb: 'Wheelchair-ready routes and pacing support.', category: 'Care' },
  { id: 's11', title: 'Wheelchair Services', blurb: 'Priority queue guidance and ramp-aware planning.', category: 'Care' },
  { id: 's12', title: 'Tonsure Booking', blurb: 'Kalyana Katta timing and locker tips.', category: 'Ritual' },
  { id: 's13', title: 'Laddu Counter Guide', blurb: 'Collection windows and complementary add-ons.', category: 'Guide' },
  { id: 's14', title: 'Temple Tour Guide', blurb: 'Local storytellers, multi-language options.', category: 'Guide' },
  { id: 's15', title: 'Donation Services', blurb: 'Hundi and trust routes with transparent receipts.', category: 'Seva' },
  { id: 's16', title: 'Nearby Temple Packages', blurb: 'Srikalahasti, Padmavathi, and Tiruchanur circuits.', category: 'Packages' },
]

export const PACKAGES: PackageItem[] = [
  {
    id: 'p1',
    title: 'One Day Tirupati Darshan',
    duration: '1 day',
    inclusions: ['Pickup coordination', 'Darshan assistance', 'Laddu guide'],
    transport: 'Private cab',
    accommodation: 'Day use locker assist',
    meals: 'Prasadam + breakfast',
    vipBenefit: 'Queue insights',
    rating: 4.8,
    reviews: 612,
    priceDisplay: 'From ₹4,999 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #0f3d91 0%, #2563eb 55%, #93c5fd 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1596120236222-fb4350be68bf?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Illustrative carved South Indian temple gopuram against sky (stock)',
  },
  {
    id: 'p2',
    title: 'VIP Srivani Package',
    duration: '2 days',
    inclusions: ['Trust onboarding help', 'Priority lane briefing', 'Seva slots'],
    transport: 'Luxury SUV',
    accommodation: '4★ hillside stay',
    meals: 'All meals included',
    vipBenefit: 'Dedicated coordinator',
    rating: 4.95,
    reviews: 204,
    priceDisplay: 'From ₹18,500 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #0c1e42 0%, #0f3d91 50%, #fcd34d 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1606293926075-69a00a890143?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Rows of traditional oil lamps glowing for a festival evening (illustrative)',
  },
  {
    id: 'p3',
    title: 'Family Comfort Package',
    duration: '2 days',
    inclusions: ['Child-friendly timing', 'Group seating', 'Photo stops'],
    transport: 'Minivan',
    accommodation: 'Connecting rooms',
    meals: 'Satvik thali',
    vipBenefit: 'Crowd-hour flexibility',
    rating: 4.7,
    reviews: 438,
    priceDisplay: 'From ₹9,200 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #1e40af 0%, #60a5fa 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1512813190700-8910ed350d65?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Ornate temple doorway and carved stone archway (illustrative stock)',
  },
  {
    id: 'p4',
    title: 'Senior Citizen Package',
    duration: '3 days',
    inclusions: ['Slow-paced itinerary', 'Medical kit list', 'Wheelchair add-on'],
    transport: 'Sedan with assist',
    accommodation: 'Ground-floor rooms',
    meals: 'Soft diet options',
    vipBenefit: 'Break darshan consult',
    rating: 4.9,
    reviews: 311,
    priceDisplay: 'From ₹11,800 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #0f3d91 0%, #e2e8f0 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1577896851231-70ef833cec04?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Quiet temple courtyard with columns and warm stone (illustrative stock)',
  },
  {
    id: 'p5',
    title: 'Tirumala + Nearby Temples Tour',
    duration: '4 days',
    inclusions: ['Tiruchanur', 'PADMAVATI AMMAVARI circuit', 'Srikalahasti optional'],
    transport: 'Private cab + tolls',
    accommodation: 'Boutique hotel',
    meals: 'Most meals covered',
    vipBenefit: 'Route optimisation',
    rating: 4.85,
    reviews: 189,
    priceDisplay: 'From ₹22,000 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #1e3a5f 0%, #2563eb 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Intricately carved historic temple stone facade (illustrative)',
  },
  {
    id: 'p6',
    title: 'Hyderabad to Tirupati Package',
    duration: '2–3 days',
    inclusions: ['City pickup', 'Highway-safe halts', 'Return slot planning'],
    transport: 'AC cab round trip',
    accommodation: 'Tirupati / Tirumala tiered',
    meals: '2× breakfast + dinners',
    vipBenefit: 'Highway coordinator',
    rating: 4.75,
    reviews: 520,
    priceDisplay: 'From ₹10,499 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #2563eb 0%, #bfdbfe 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1580919474247-068123d2b17c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pilgrims walking together along a tree-lined approach (illustrative)',
  },
  {
    id: 'p7',
    title: 'Bangalore Weekend Darshan',
    duration: '2 days',
    inclusions: ['Friday night departure', 'Sunday return window', 'Express darshan consult'],
    transport: 'Tempo / cab',
    accommodation: 'Tirupati premium stay',
    meals: 'Weekend meal pack',
    vipBenefit: 'Slot SMS alerts',
    rating: 4.72,
    reviews: 401,
    priceDisplay: 'From ₹8,750 / pilgrim',
    imageGradient: 'linear-gradient(145deg, #0f3d91 0%, #fef3c7 100%)',
    imageUrl:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Temple bell and ritual metalwork in soft light (illustrative stock)',
  },
]

export const COMPARE_COLUMNS: CompareColumn[] = [
  { key: 'free', label: 'Free Darshan' },
  { key: 'special300', label: '₹300 Darshan' },
  { key: 'vipBreak', label: 'VIP Break' },
  { key: 'srivani', label: 'Srivani Trust' },
  { key: 'seva', label: 'Seva Darshan' },
]

export const COMPARE_ROWS: CompareRow[] = [
  {
    label: 'Typical wait (indicative)',
    values: {
      free: '4–18 hrs (season)',
      special300: '1–6 hrs',
      vipBreak: 'Under 2 hrs typical',
      srivani: 'As per trust slot',
      seva: 'Tied to seva time',
    },
  },
  {
    label: 'Key benefit',
    values: {
      free: 'No special fee',
      special300: 'Dedicated queue lane',
      vipBreak: 'Coordinated pacing',
      srivani: 'Contribution-linked pathway',
      seva: 'Ritual + darshan combine',
    },
  },
  {
    label: 'Availability',
    values: {
      free: 'Always (subject to closures)',
      special300: 'Quota-based window',
      vipBreak: 'Limited daily',
      srivani: 'Trust allotment',
      seva: 'Seva calendar',
    },
  },
  {
    label: 'Crowd level',
    values: {
      free: 'High',
      special300: 'Moderate',
      vipBreak: 'Low–moderate',
      srivani: 'Managed',
      seva: 'Managed',
    },
  },
  {
    label: 'Recommended for',
    values: {
      free: 'Flexible timelines',
      special300: 'Families on budget',
      vipBreak: 'Time-bound travellers',
      srivani: 'Donors & sponsors',
      seva: 'Devotees seeking ritual depth',
    },
  },
  {
    label: 'Booking difficulty',
    values: {
      free: 'Low (walk-in)',
      special300: 'Moderate',
      vipBreak: 'High',
      srivani: 'Moderate–high',
      seva: 'Moderate',
    },
  },
]

export const EXPERIENCE_BLOCKS: ExperienceBlock[] = [
  {
    id: 'e1',
    title: 'Walking through Tirumala',
    body: 'Every step is shared with millions of stories — we help you plan rest, hydration, and darshan timing so the climb feels intentional, not rushed.',
    accent: 'walk',
    imageUrl:
      'https://images.unsplash.com/photo-1580919474247-068123d2b17c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Pilgrims walking on a broad approach path with trees (illustrative stock)',
  },
  {
    id: 'e2',
    title: 'Temple lights at dawn',
    body: 'The sanctum reads differently in first light. We align stays and transport so you catch the stillness before the corridors swell.',
    accent: 'night',
    imageUrl:
      'https://images.unsplash.com/photo-1606293926075-69a00a890143?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Warm rows of traditional oil lamps at dusk (illustrative)',
  },
  {
    id: 'e3',
    title: 'Laddu prasadam',
    body: 'Sacred sweets, neatly planned — counters, combos, and hand-carry guidance for elders and flyers.',
    accent: 'prasadam',
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9577?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Assorted Indian mithai and sweets on a platter — prasad-style offering (illustrative)',
  },
  {
    id: 'e4',
    title: 'Annadanam experience',
    body: 'Community meals that nourish body and devotion. We arrange slots and sponsorship pathways when you wish to give.',
    accent: 'annadanam',
    imageUrl:
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Volunteers serving food in a busy community dining line (illustrative)',
  },
  {
    id: 'e5',
    title: 'Sacred rituals',
    body: 'Sevas that deepen connection — coordinated with multilingual support so every family member understands the flow.',
    accent: 'ritual',
    imageUrl:
      'https://images.unsplash.com/photo-1544273676-dd2a060c7dd6?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Hands offering a lit oil lamp during prayer (illustrative)',
  },
  {
    id: 'e6',
    title: 'Ghat roads & mountain breezes',
    body: 'Scenic bends deserve calm drivers and clear ETAs — from Tirupati to Tirumala and back, with predictable halts.',
    accent: 'roads',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Winding road through forested green hills — journey to the hills (illustrative)',
  },
]

export const TRAVEL_FACILITIES: TravelFacility[] = [
  { id: 't1', title: 'Airport transfers', description: 'Tirupati / Chennai routing with flight tracking buffers.', availabilityMock: '12 slots today', priceSnippet: 'From ₹899', rating: 4.8 },
  { id: 't2', title: 'Railway pickup', description: 'Tirupati station meet with signage and baggage help.', availabilityMock: '8 slots today', priceSnippet: 'From ₹449', rating: 4.7 },
  { id: 't3', title: 'Private cabs', description: 'Sedan to SUV fleet, hill-tested brakes & AC.', availabilityMock: 'Live queue: 24', priceSnippet: 'From ₹14/km hill', rating: 4.85 },
  { id: 't4', title: 'AC buses', description: 'Metro batch departures with fixed return windows.', availabilityMock: 'Next: Sat 6AM', priceSnippet: 'From ₹2,199', rating: 4.5 },
  { id: 't5', title: 'Luxury vehicles', description: 'Innova Crysta / premium MPVs with extra recline.', availabilityMock: '6 vehicles free', priceSnippet: 'From ₹4,500', rating: 4.92 },
  { id: 't6', title: 'Hotel partners', description: 'Tirupati & hillside inventory with negotiated rates.', availabilityMock: '38% occupied', priceSnippet: 'Best price lock', rating: 4.6 },
  { id: 't7', title: 'Mutts & lodges', description: 'Traditional stays with seva-friendly timings.', availabilityMock: 'Call to confirm', priceSnippet: 'From ₹299/night', rating: 4.4 },
  { id: 't8', title: 'Cottages & retreats', description: 'Quiet recuperation post-darshan — spa optional.', availabilityMock: '4 left this week', priceSnippet: 'From ₹5,499', rating: 4.88 },
  { id: 't9', title: 'Travel coordinators', description: 'On-call Telugu, Hindi, English, Kannada guides.', availabilityMock: '24×7 desk', priceSnippet: 'Included in VIP', rating: 4.91 },
]

export const INSIGHTS: InsightCard[] = [
  { id: 'i1', title: 'Crowd level', value: 'Moderate → High', hint: 'Weekends + festivals peak', level: 'high' },
  { id: 'i2', title: 'Best time to visit', value: 'Tue–Thu mornings', hint: 'Lower corridor pressure historically', level: 'low' },
  { id: 'i3', title: 'Estimated wait today', value: '2h 40m ± 35m', hint: 'For ₹300 corridor (mock)', level: 'moderate' },
  { id: 'i4', title: 'Weather', value: '24°C • Light breeze', hint: 'Carry a light shawl evenings', level: 'low' },
  { id: 'i5', title: 'Accommodation', value: '62% Tirupati occupancy', hint: 'Book hillside 72h ahead', level: 'moderate' },
  { id: 'i6', title: 'Seva slot alert', value: '2 Archana openings', hint: 'Next release in 04h 18m', level: 'high' },
]

export const WHY_US: WhyCard[] = [
  { id: 'w1', title: 'Verified bookings', description: 'Partners vetted with transparent cancellation windows.' },
  { id: 'w2', title: 'Trusted local operators', description: 'Experienced fleets and stays around the seven hills.' },
  { id: 'w3', title: 'Dedicated support', description: 'Humans first — escalate to coordinators anytime.' },
  { id: 'w4', title: 'Instant confirmations', description: 'SMS + WhatsApp receipts for itinerary steps.' },
  { id: 'w5', title: 'Personalized planning', description: 'Elderly, kids, dietary, ritual depth — accounted for.' },
  { id: 'w6', title: 'Secure payments', description: 'PCI-minded flows — no shady cash-only surprises.' },
  { id: 'w7', title: 'Multi-language', description: 'Telugu • Hindi • English • Kannada onboarding.' },
]

export const TESTIMONIALS: Testimonial[] = [
  { id: 'r1', name: 'Priya & family', place: 'Bengaluru', quote: 'We never felt rushed. The coordinator paced darshan for my parents beautifully.', rating: 5 },
  { id: 'r2', name: 'Ramesh Kumar', place: 'Hyderabad', quote: 'VIP break pathway was explained clearly — no jargon, just calm assurance.', rating: 5 },
  { id: 'r3', name: 'Ananya', place: 'Chennai', quote: 'Crowd hints saved our morning. Felt like a premium travel app, but spiritual.', rating: 5 },
  { id: 'r4', name: 'Mohit Shah', place: 'Pune', quote: 'Pickup from airport + laddu guide + stay — everything in one thread.', rating: 4 },
]

export const TEMPLE_OPTIONS = ['Sri Venkateswara Temple, Tirumala', 'Sri Padmavathi Ammavari Temple, Tiruchanoor', 'Sri Kalyana Venkateswara Swamy, Srinivasa Mangapuram']

export const DARSHAN_TYPE_OPTIONS = ['Sarva darshan (guidance)', '₹300 special entry consult', 'VIP break consult', 'Srivani / trust route', 'Seva-linked']

export const ASSISTANT_PROMPTS = [
  'Best time this week?',
  '₹300 vs VIP — fit for elders?',
  'Airport to Tirupati cab?',
  'Seva eligibility basics',
]

export const FOOTER_COLUMNS = [
  {
    title: 'Guides',
    links: [
      { label: 'First-time traveller checklist', href: '#guides' },
      { label: 'What to carry', href: '#guides' },
      { label: 'Footwear & lockers', href: '#guides' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'FAQs', href: '#support' },
      { label: 'Cancellation policy', href: '#support' },
      { label: 'Refunds timeline', href: '#support' },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: '24×7 pilgrimage support', href: '#support' },
      { label: 'Emergency contacts', href: '#support' },
      { label: 'Accessibility desk', href: '#support' },
    ],
  },
] as const
