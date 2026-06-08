import type {
  DarshanOption,
  KeyInfoItem,
  NearbyTemple,
  PracticalSection,
  QueueSlot,
  ReviewItem,
  SevaItem,
  AddOnConfig,
} from '../types'
import { templeCardImage } from './images'

export const TIRUPATI_DARSHAN_OPTIONS: DarshanOption[] = [
  {
    id: 'free',
    icon: '🙏',
    name: 'Free Darshan (Sarva Darshan)',
    wait: '6–20 hours',
    pricePerPerson: 0,
    note: 'Token required at counter',
  },
  {
    id: 'sed',
    icon: '⭐',
    name: 'Special Entry Darshan (SED)',
    wait: '2–4 hours',
    pricePerPerson: 300,
    note: 'Online booking',
  },
  {
    id: 'vip',
    icon: '👑',
    name: 'VIP Break Darshan',
    wait: '1–2 hours',
    pricePerPerson: 1500,
    note: 'Quota based',
  },
  {
    id: 'vvip',
    icon: '💎',
    name: 'VVIP Divya Darshan',
    wait: '15–30 min',
    pricePerPerson: 5000,
    note: 'Includes Laddoo + Archana',
    badge: 'Most Popular',
  },
]

export const TIRUPATI_QUEUE: QueueSlot[] = [
  { time: '6AM', level: 'low' },
  { time: '8AM', level: 'moderate' },
  { time: '10AM', level: 'high' },
  { time: '12PM', level: 'moderate' },
  { time: '2PM', level: 'low' },
  { time: '4PM', level: 'moderate' },
  { time: '6PM', level: 'high' },
  { time: '8PM', level: 'low' },
]

export const TIRUPATI_ABOUT = [
  'Sri Venkateswara Swamy Temple, situated atop the Tirumala hills in Andhra Pradesh, is the most visited religious site on Earth with over 50,000 devotees daily. Lord Venkateswara, a form of Lord Vishnu, is believed to bless devotees with moksha — liberation from the cycle of birth and death.',
  "The temple has existed since at least 300 CE and is mentioned in ancient Puranas as 'Vaikuntham on Earth'. The seven hills of Tirumala are considered the body of Adisesha, the cosmic serpent of Lord Vishnu. Every aspect of the temple — from the gold-plated gopuram to the Laddoo prasadam — carries deep sacred significance.",
  "The famous Tirupati Laddoo holds a Geographical Indication tag and is one of India's most recognised prasadams. The annual tonsure ritual, where devotees offer their hair as a vow, is the world's largest human hair offering tradition.",
]

export const TIRUPATI_KEY_INFO: KeyInfoItem[] = [
  { label: 'Deity', value: 'Lord Venkateswara (Vishnu)' },
  { label: 'Entry Fee', value: 'Free (Sarva Darshan) / ₹300 SED' },
  { label: 'Best Time', value: 'October – March' },
  { label: 'Language', value: 'Telugu, Sanskrit' },
  { label: 'Dress Code', value: 'Traditional attire preferred. Dhoti/saree for sevas.' },
  { label: 'Prasadam', value: 'Tirupati Laddoo · Pulihora' },
]

export const TIRUPATI_SEVAS: SevaItem[] = [
  { id: 'suprabhatam', name: 'Suprabhatam Seva', price: 500, time: '4:30 AM slot' },
  { id: 'thomala', name: 'Thomala Seva', price: 1000, time: 'Morning' },
  { id: 'abhishekam', name: 'Abhishekam', price: 2000, time: 'Booked slot' },
  { id: 'brahmotsavam', name: 'Arjitha Brahmotsavam', price: 2000, time: 'Evening' },
]

export const TIRUPATI_ADDONS: AddOnConfig[] = [
  { id: 'laddoo', icon: '🍱', name: 'Tirupati Laddoo Prasadam', priceLabel: '₹50/piece', price: 50, type: 'counter' },
  { id: 'tonsure', icon: '✂️', name: 'Head Tonsure (Mokku)', priceLabel: '₹150/person', price: 150, type: 'toggle' },
  { id: 'cottage', icon: '🏠', name: 'TTD Cottage (1 night)', priceLabel: '₹1,200/night', price: 1200, type: 'add' },
  { id: 'transport', icon: '🚕', name: 'Local Temple Transport', priceLabel: '₹800/cab', price: 800, type: 'add' },
  { id: 'ladduBooking', icon: '🎫', name: 'Laddu Booking (4 pcs)', priceLabel: '₹200', price: 200, type: 'add' },
]

export const TIRUPATI_NEARBY: NearbyTemple[] = [
  {
    id: 'padmavathi',
    name: 'Sri Padmavathi Temple',
    distance: '5 km',
    tag: 'Must Visit',
    image: templeCardImage('padmavathi'),
  },
  {
    id: 'govindaraja',
    name: 'Sri Govindaraja Temple',
    distance: '1 km',
    image: templeCardImage('govindaraja'),
  },
  {
    id: 'kapileswara',
    name: 'Sri Kapileswara Temple',
    distance: '3 km',
    image: templeCardImage('kapileswara'),
  },
  {
    id: 'srikalahasti',
    name: 'Srikalahasti Temple',
    distance: '36 km',
    tag: 'Rahu-Ketu Pooja',
    image: templeCardImage('srikalahasti'),
  },
  {
    id: 'kanipakam',
    name: 'Kanipakam Ganesha',
    distance: '70 km',
    tag: 'Miracle Temple',
    image: templeCardImage('kanipakam'),
  },
]

export const TIRUPATI_PRACTICAL: PracticalSection[] = [
  {
    id: 'reach',
    title: 'How to Reach',
    content:
      'Nearest airport: Tirupati Airport (TIR), 15 km. Nearest railway: Tirupati Railway Station, 22 km from Tirumala. APSRTC buses run frequently from Tirupati bus stand to Tirumala.',
  },
  {
    id: 'carry',
    title: 'What to Carry',
    content:
      'Valid government ID proof (mandatory for darshan). Comfortable footwear for walking. Traditional attire recommended. No leather items allowed inside.',
  },
  {
    id: 'dos',
    title: "Do's and Don'ts",
    content:
      "Do: Carry ID · Wear traditional clothes · Visit Varahaswami first. Don't: Bring non-veg food · Carry leather bags · Use mobile inside sanctum",
  },
  {
    id: 'stay',
    title: 'Accommodation',
    content:
      'TTD guest houses available inside Tirumala. Book at ttdevasthanams.ap.gov.in. Private hotels available in Tirupati town from ₹800/night.',
  },
]

export const TIRUPATI_REVIEWS: ReviewItem[] = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: "The VIP darshan booking was seamless. Arrived at Tirupati and got entry within 15 minutes. Present Trip's team was very helpful.",
  },
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'First time visiting with family. The add-on transport was excellent. Kids really enjoyed the laddoo prasadam.',
  },
  {
    name: 'Anita Patel',
    location: 'Hyderabad',
    rating: 4,
    text: 'Good experience overall. Suggest booking 2 weeks in advance for weekend slots.',
  },
]

export const RATING_BREAKDOWN = [
  { stars: 5, pct: 89 },
  { stars: 4, pct: 8 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0.5 },
  { stars: 1, pct: 0.5 },
]

/** Default darshan options for temples without custom data */
export function getDarshanOptionsForTemple(templeId: string): DarshanOption[] {
  if (templeId === 'tirupati-balaji') return TIRUPATI_DARSHAN_OPTIONS
  return [
    {
      id: 'free',
      icon: '🙏',
      name: 'Free Darshan',
      wait: '2–6 hours',
      pricePerPerson: 0,
      note: 'General queue',
    },
    {
      id: 'sed',
      icon: '⭐',
      name: 'Special Entry',
      wait: '1–3 hours',
      pricePerPerson: 200,
      note: 'Online booking',
    },
    {
      id: 'vip',
      icon: '👑',
      name: 'VIP Darshan',
      wait: '30–90 min',
      pricePerPerson: 1000,
      note: 'Limited slots',
    },
    {
      id: 'vvip',
      icon: '💎',
      name: 'Premium Darshan',
      wait: '15–30 min',
      pricePerPerson: 3000,
      note: 'Includes prasadam',
      badge: 'Most Popular',
    },
  ]
}

export function getQueueForTemple(templeId: string): QueueSlot[] {
  if (templeId === 'tirupati-balaji') return TIRUPATI_QUEUE
  return [
    { time: '6AM', level: 'low' },
    { time: '8AM', level: 'moderate' },
    { time: '10AM', level: 'high' },
    { time: '12PM', level: 'moderate' },
    { time: '2PM', level: 'low' },
    { time: '4PM', level: 'moderate' },
    { time: '6PM', level: 'high' },
    { time: '8PM', level: 'low' },
  ]
}
