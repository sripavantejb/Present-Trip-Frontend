import type { TempleSearchItem } from '../types'
import { templeHeroImage } from './images'

export const DARSHAN_TEMPLES: TempleSearchItem[] = [
  {
    id: 'tirupati-balaji',
    name: 'Sri Venkateswara Swamy Temple',
    shortName: 'Tirupati Balaji',
    alias: ['tirupati', 'balaji', 'tirumala', 'venkateswara'],
    location: 'Tirumala, Andhra Pradesh',
    waitTime: '3–5 hrs',
    opens: '2:30 AM',
    visitors: '50,000+',
    crowdLevel: 'very-high',
    entryFee: 'Free / ₹300 SED',
    image: templeHeroImage('tirupati-balaji'),
    rating: 4.9,
    reviewCount: '125k',
    badge: 'Most Visited',
  },
  {
    id: 'padmavathi',
    name: 'Sri Padmavathi Ammavari Temple',
    shortName: 'Sri Padmavathi Ammavari',
    alias: ['padmavathi', 'tiruchanur', 'alamelu'],
    location: 'Tiruchanur, AP',
    waitTime: '1–2 hrs',
    opens: '5:30 AM',
    visitors: '20,000+',
    crowdLevel: 'high',
    entryFee: 'Free',
    image: templeHeroImage('padmavathi'),
    rating: 4.8,
    reviewCount: '42k',
  },
  {
    id: 'srikalahasti',
    name: 'Sri Kalahasteeswara Temple',
    shortName: 'Srikalahasti',
    alias: ['srikalahasti', 'kalahasti', 'rahu ketu', 'vayu lingam'],
    location: 'Srikalahasti, AP',
    waitTime: '1–3 hrs',
    opens: '5:30 AM',
    visitors: '15,000+',
    crowdLevel: 'high',
    entryFee: 'Free / ₹200 special',
    image: templeHeroImage('srikalahasti'),
    rating: 4.7,
    reviewCount: '38k',
  },
  {
    id: 'kanipakam',
    name: 'Sri Varasiddhi Vinayaka Temple',
    shortName: 'Kanipakam Ganesha',
    alias: ['kanipakam', 'ganesha', 'vinayaka', 'varasiddhi'],
    location: 'Kanipakam, AP',
    waitTime: '30–60 min',
    opens: '4:00 AM',
    visitors: '10,000+',
    crowdLevel: 'moderate',
    entryFee: 'Free',
    image: templeHeroImage('kanipakam'),
    rating: 4.8,
    reviewCount: '28k',
  },
  {
    id: 'shirdi',
    name: 'Shirdi Sai Baba Temple',
    shortName: 'Shirdi Sai Baba',
    alias: ['shirdi', 'sai baba', 'saibaba'],
    location: 'Shirdi, Maharashtra',
    waitTime: '2–3 hrs',
    opens: '4:00 AM',
    visitors: '25,000+',
    crowdLevel: 'high',
    entryFee: 'Free',
    image: templeHeroImage('shirdi'),
    rating: 4.9,
    reviewCount: '95k',
  },
  {
    id: 'kashi',
    name: 'Kashi Vishwanath Temple',
    shortName: 'Kashi Vishwanath',
    alias: ['kashi', 'varanasi', 'vishwanath', 'banaras'],
    location: 'Varanasi, UP',
    waitTime: '1–2 hrs',
    opens: '2:30 AM',
    visitors: '30,000+',
    crowdLevel: 'high',
    entryFee: 'Free',
    image: templeHeroImage('kashi'),
    rating: 4.8,
    reviewCount: '72k',
  },
  {
    id: 'vaishno-devi',
    name: 'Vaishno Devi Temple',
    shortName: 'Vaishno Devi',
    alias: ['vaishno devi', 'vaishnodevi', 'katra', 'mata'],
    location: 'Katra, J&K',
    waitTime: '4–6 hrs',
    opens: 'All day',
    visitors: '40,000+',
    crowdLevel: 'very-high',
    entryFee: 'Free',
    image: templeHeroImage('vaishno-devi'),
    rating: 4.9,
    reviewCount: '110k',
  },
  {
    id: 'yadadri',
    name: 'Sri Lakshmi Narasimha Temple',
    shortName: 'Yadadri Narasimha',
    alias: ['yadadri', 'yadagirigutta', 'narasimha'],
    location: 'Yadagirigutta, Telangana',
    waitTime: '2–4 hrs',
    opens: '4:00 AM',
    visitors: '30,000+',
    crowdLevel: 'very-high',
    entryFee: 'Free / ₹100',
    image: templeHeroImage('yadadri'),
    rating: 4.7,
    reviewCount: '35k',
  },
  {
    id: 'chilkur',
    name: 'Chilkur Balaji Temple',
    shortName: 'Chilkur Balaji',
    alias: ['chilkur', 'visa balaji', 'chilkoor'],
    location: 'Hyderabad, Telangana',
    waitTime: '30–60 min',
    opens: '5:00 AM',
    visitors: '75,000+/week',
    crowdLevel: 'very-high',
    entryFee: 'Free (No Hundi)',
    image: templeHeroImage('chilkur'),
    rating: 4.8,
    reviewCount: '48k',
  },
  {
    id: 'iskcon-tirupati',
    name: 'ISKCON Tirupati',
    shortName: 'ISKCON Tirupati',
    alias: ['iskcon', 'radha govinda', 'hare krishna tirupati'],
    location: 'Tirupati, AP',
    waitTime: '5–10 min',
    opens: '4:30 AM',
    visitors: '3,000+',
    crowdLevel: 'low',
    entryFee: 'Free',
    image: templeHeroImage('iskcon-tirupati'),
    rating: 4.9,
    reviewCount: '12k',
  },
  {
    id: 'kapileswara',
    name: 'Sri Kapileswara Swamy Temple',
    shortName: 'Kapileswara Tirupati',
    alias: ['kapileswara', 'kapila theertham', 'kapila'],
    location: 'Tirupati, AP',
    waitTime: '15–30 min',
    opens: '4:15 AM',
    visitors: '5,000+',
    crowdLevel: 'moderate',
    entryFee: 'Free',
    image: templeHeroImage('kapileswara'),
    rating: 4.7,
    reviewCount: '18k',
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple',
    shortName: 'Golden Temple Amritsar',
    alias: ['golden temple', 'harmandir sahib', 'amritsar'],
    location: 'Amritsar, Punjab',
    waitTime: '30 min',
    opens: '2:00 AM',
    visitors: '1,00,000+',
    crowdLevel: 'high',
    entryFee: 'Free',
    image: templeHeroImage('golden-temple'),
    rating: 4.9,
    reviewCount: '200k',
  },
]

export const POPULAR_CHIPS = [
  { label: 'Tirupati', templeId: 'tirupati-balaji' },
  { label: 'Shirdi', templeId: 'shirdi' },
  { label: 'Varanasi', templeId: 'kashi' },
  { label: 'Amritsar', templeId: 'golden-temple' },
  { label: 'Mathura', templeId: 'kashi' },
] as const

export function getTempleById(id: string): TempleSearchItem | undefined {
  return DARSHAN_TEMPLES.find((t) => t.id === id)
}

/** Map display names / explorer listings to darshan temple route ids */
export function resolveTempleIdFromLabel(label: string): string {
  const q = label.toLowerCase()
  const found = DARSHAN_TEMPLES.find(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortName.toLowerCase().includes(q) ||
      t.alias.some((a) => q.includes(a) || a.includes(q)),
  )
  if (found) return found.id
  if (q.includes('tirupati') || q.includes('balaji') || q.includes('venkateswara')) return 'tirupati-balaji'
  if (q.includes('shirdi') || q.includes('sai')) return 'shirdi'
  if (q.includes('kashi') || q.includes('varanasi')) return 'kashi'
  if (q.includes('amritsar') || q.includes('golden')) return 'golden-temple'
  if (q.includes('vaishno')) return 'vaishno-devi'
  if (q.includes('kalahasti')) return 'srikalahasti'
  if (q.includes('kanipakam') || q.includes('vinayaka')) return 'kanipakam'
  if (q.includes('padmavathi')) return 'padmavathi'
  if (q.includes('yadadri') || q.includes('yadagiri')) return 'yadadri'
  if (q.includes('chilkur')) return 'chilkur'
  if (q.includes('iskcon')) return 'iskcon-tirupati'
  if (q.includes('kapileswara')) return 'kapileswara'
  if (q.includes('govindaraja')) return 'govindaraja'
  return 'tirupati-balaji'
}

export function fuzzyMatchTemples(query: string): TempleSearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return DARSHAN_TEMPLES

  return DARSHAN_TEMPLES.filter((t) => {
    const haystack = [t.name, t.shortName, t.location, ...t.alias].join(' ').toLowerCase()
    return haystack.includes(q) || t.alias.some((a) => a.includes(q) || q.includes(a))
  })
}
