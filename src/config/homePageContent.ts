/** Mock content for homepage marketing sections below the trust bar. */

import { SITE_IMAGES } from './siteImages'

export type FlightRoute = {
  id: string
  from: string
  to: string
  duration: string
  price: string
}

export type Destination = {
  id: string
  name: string
  tagline: string
  image: string
  imageAlt: string
  gradient: string
  featured?: boolean
}

export type MemberOffer = {
  id: string
  accent: 'red' | 'orange' | 'teal'
  headline: string
  description: string
  expiry: string
  image: string
  imageAlt: string
}

export type TrendingHotel = {
  id: string
  name: string
  city: string
  rating: string
  reviews: number
  discount: string
  price: string
  image: string
  imageAlt: string
}

export type WhyUsItem = {
  id: string
  headline: string
  description: string
  icon: 'trophy' | 'lock' | 'clock' | 'plane'
}

export type BlogArticle = {
  id: string
  title: string
  category: string
  categoryTone: 'red' | 'teal'
  excerpt: string
  author: string
  date: string
  image: string
  imageAlt: string
}

export type WeekendDeal = {
  name: string
  place: string
  rating: string
  reviews: number
  discount: string
  price: string
  image: string
  imageAlt: string
}

export type TravelerReview = {
  id: string
  stars: number
  quote: string
  name: string
  trip: string
  initials: string
  avatar: string
  avatarAlt: string
}

export const POPULAR_FLIGHT_ROUTES: FlightRoute[] = [
  { id: 'del-bom', from: 'Delhi', to: 'Mumbai', duration: '2h 10m', price: '2,499' },
  { id: 'bom-goi', from: 'Mumbai', to: 'Goa', duration: '1h 15m', price: '1,899' },
  { id: 'blr-del', from: 'Bengaluru', to: 'Delhi', duration: '2h 45m', price: '3,199' },
  { id: 'maa-ccu', from: 'Chennai', to: 'Kolkata', duration: '2h 30m', price: '2,799' },
  { id: 'hyd-bom', from: 'Hyderabad', to: 'Mumbai', duration: '1h 25m', price: '2,299' },
  { id: 'del-blr', from: 'Delhi', to: 'Bengaluru', duration: '2h 40m', price: '3,499' },
  { id: 'pnq-jai', from: 'Pune', to: 'Jaipur', duration: '1h 50m', price: '2,599' },
  { id: 'amd-maa', from: 'Ahmedabad', to: 'Chennai', duration: '2h 05m', price: '2,899' },
]

export const TOP_DESTINATIONS: Destination[] = [
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: "God's Own Country",
    ...SITE_IMAGES.destinations.kerala,
    gradient: 'linear-gradient(145deg, #0d9488 0%, #059669 45%, #064e3b 100%)',
    featured: true,
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Beach Vibes All Year',
    ...SITE_IMAGES.destinations.goa,
    gradient: 'linear-gradient(145deg, #f59e0b 0%, #ea580c 50%, #c2410c 100%)',
  },
  {
    id: 'manali',
    name: 'Manali',
    tagline: 'Snow & Adventure',
    ...SITE_IMAGES.destinations.manali,
    gradient: 'linear-gradient(145deg, #93c5fd 0%, #60a5fa 40%, #1e3a8a 100%)',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Royal Heritage',
    ...SITE_IMAGES.destinations.rajasthan,
    gradient: 'linear-gradient(145deg, #fbbf24 0%, #d97706 50%, #92400e 100%)',
  },
  {
    id: 'andaman',
    name: 'Andaman',
    tagline: 'Turquoise Escapes',
    ...SITE_IMAGES.destinations.andaman,
    gradient: 'linear-gradient(145deg, #22d3ee 0%, #0891b2 50%, #164e63 100%)',
  },
]

export const MEMBER_OFFERS: MemberOffer[] = [
  {
    id: 'first500',
    accent: 'red',
    headline: '₹500 Off Your First Flight',
    description: 'Use code FIRST500 at checkout. Valid on all domestic flights.',
    expiry: 'Ends 31 May',
    ...SITE_IMAGES.memberOffers[0],
  },
  {
    id: 'partner',
    accent: 'orange',
    headline: 'Extra 10% Off with Present Trip Partner Card',
    description: 'No minimum booking. Stack with select weekend deals.',
    expiry: 'Ends 31 May',
    ...SITE_IMAGES.memberOffers[1],
  },
  {
    id: 'stayfree',
    accent: 'teal',
    headline: 'Free Hotel Night on Bookings Above ₹15,000',
    description: 'Use code STAYFREE on combined flight + hotel packages.',
    expiry: 'Ends 31 May',
    ...SITE_IMAGES.memberOffers[2],
  },
]

export const WEEKEND_DEALS: WeekendDeal[] = [
  {
    name: 'The Orion Suites',
    place: 'New Delhi',
    rating: '4.3',
    reviews: 512,
    discount: '20% off',
    price: '2,599',
    ...SITE_IMAGES.weekendDeals[0],
  },
  {
    name: 'Azure Bay Resort',
    place: 'Goa',
    rating: '4.6',
    reviews: 328,
    discount: '25% off',
    price: '3,899',
    ...SITE_IMAGES.weekendDeals[1],
  },
  {
    name: 'Cityline Hotel',
    place: 'Bengaluru',
    rating: '4.1',
    reviews: 890,
    discount: '15% off',
    price: '1,999',
    ...SITE_IMAGES.weekendDeals[2],
  },
  {
    name: 'Harbour View Inn',
    place: 'Mumbai',
    rating: '4.5',
    reviews: 204,
    discount: '20% off',
    price: '4,200',
    ...SITE_IMAGES.weekendDeals[3],
  },
]

export const TRENDING_HOTELS: TrendingHotel[] = [
  {
    id: 'leela-del',
    name: 'The Leela Palace',
    city: 'New Delhi',
    rating: '4.8',
    reviews: 1203,
    discount: '30% off',
    price: '8,500',
    ...SITE_IMAGES.trendingHotels['leela-del'],
  },
  {
    id: 'taj-goa',
    name: 'Taj Exotica',
    city: 'Goa',
    rating: '4.7',
    reviews: 892,
    discount: '25% off',
    price: '6,200',
    ...SITE_IMAGES.trendingHotels['taj-goa'],
  },
  {
    id: 'itc-blr',
    name: 'ITC Windsor',
    city: 'Bengaluru',
    rating: '4.6',
    reviews: 654,
    discount: '20% off',
    price: '4,800',
    ...SITE_IMAGES.trendingHotels['itc-blr'],
  },
  {
    id: 'oberoi-bom',
    name: 'The Oberoi',
    city: 'Mumbai',
    rating: '4.9',
    reviews: 2104,
    discount: '15% off',
    price: '9,100',
    ...SITE_IMAGES.trendingHotels['oberoi-bom'],
  },
  {
    id: 'umaid-jod',
    name: 'Umaid Bhawan',
    city: 'Jodhpur',
    rating: '4.8',
    reviews: 743,
    discount: '20% off',
    price: '7,400',
    ...SITE_IMAGES.trendingHotels['umaid-jod'],
  },
  {
    id: 'vivanta-sxr',
    name: 'Vivanta Dal View',
    city: 'Srinagar',
    rating: '4.5',
    reviews: 512,
    discount: '35% off',
    price: '5,600',
    ...SITE_IMAGES.trendingHotels['vivanta-sxr'],
  },
]

export const WHY_PRESENT_TRIP: WhyUsItem[] = [
  {
    id: 'price',
    headline: 'Best Price Guarantee',
    description: "Find it cheaper? We'll match it.",
    icon: 'trophy',
  },
  {
    id: 'secure',
    headline: '100% Secure Payments',
    description: 'PCI-DSS compliant. Your data is safe.',
    icon: 'lock',
  },
  {
    id: 'support',
    headline: '24/7 Customer Support',
    description: 'Real humans, always available.',
    icon: 'clock',
  },
  {
    id: 'inventory',
    headline: '500+ Airlines & Hotels',
    description: 'Widest inventory across India & abroad.',
    icon: 'plane',
  },
]

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'goa-beaches',
    title: "10 Hidden Beaches in Goa You've Never Heard Of",
    category: 'Destinations',
    categoryTone: 'red',
    excerpt:
      'Skip the crowded shores and discover secluded coves, quiet fishing villages, and sunset spots locals love.',
    author: 'Priya Sharma',
    date: 'May 12, 2026',
    ...SITE_IMAGES.blog['goa-beaches'],
  },
  {
    id: 'manali-budget',
    title: 'How to Plan a Budget Trip to Manali Under ₹10,000',
    category: 'Travel Tips',
    categoryTone: 'teal',
    excerpt:
      'Smart transport picks, homestay hacks, and free activities that keep your mountain escape affordable.',
    author: 'Rahul Verma',
    date: 'May 8, 2026',
    ...SITE_IMAGES.blog['manali-budget'],
  },
  {
    id: 'kerala-guide',
    title: "Kerala Backwaters: A Complete First-Timer's Guide",
    category: 'Destinations',
    categoryTone: 'red',
    excerpt:
      'Houseboat routes, best seasons, and what to pack for a peaceful journey through the backwaters.',
    author: 'Ananya Iyer',
    date: 'May 3, 2026',
    ...SITE_IMAGES.blog['kerala-guide'],
  },
]

export const TRAVELER_REVIEWS: TravelerReview[] = [
  {
    id: 'karan',
    stars: 5,
    quote:
      'Booked a last-minute flight to Goa and got an amazing deal. The whole process was seamless!',
    name: 'Karan M.',
    trip: 'Solo Trip · Goa',
    initials: 'KM',
    avatar: SITE_IMAGES.reviewAvatars[0].image,
    avatarAlt: SITE_IMAGES.reviewAvatars[0].imageAlt,
  },
  {
    id: 'sneha',
    stars: 5,
    quote:
      'Hotel recommendations were spot on. Stayed at Azure Bay Resort and it was exactly as described.',
    name: 'Sneha R.',
    trip: 'Couple Trip · Goa',
    initials: 'SR',
    avatar: SITE_IMAGES.reviewAvatars[1].image,
    avatarAlt: SITE_IMAGES.reviewAvatars[1].imageAlt,
  },
  {
    id: 'arjun',
    stars: 4,
    quote:
      'Great customer support when my flight got delayed. They helped rebook within minutes.',
    name: 'Arjun T.',
    trip: 'Family Trip · Manali',
    initials: 'AT',
    avatar: SITE_IMAGES.reviewAvatars[2].image,
    avatarAlt: SITE_IMAGES.reviewAvatars[2].imageAlt,
  },
]
