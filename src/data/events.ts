export type EventType = 'upcoming' | 'special-puja' | 'current' | 'live'

export type EventItem = {
  id: string
  name: string
  location: string
  date: string
  time: string
  attendees: string
  type: EventType
  imageUrl: string
  imageAlt: string
  hasSpecialEntry?: boolean
  month: number
}

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'Brahmotsavam — Garuda Seva',
    location: 'Tirumala, Andhra Pradesh',
    date: '14 Jun 2026',
    time: '6:00 AM – 12:00 PM',
    attendees: '2L+ expected',
    type: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4a00b9bd4d81?w=600&h=340&fit=crop',
    imageAlt: 'Brahmotsavam',
    hasSpecialEntry: true,
    month: 6,
  },
  {
    id: 'e2',
    name: 'Vaikunta Ekadasi Special Entry',
    location: 'Tirumala, Andhra Pradesh',
    date: '10 Jan 2027',
    time: '4:00 AM – 12:00 PM',
    attendees: '28k+ expected',
    type: 'special-puja',
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0a5?w=600&h=340&fit=crop',
    imageAlt: 'Vaikunta Ekadasi',
    hasSpecialEntry: true,
    month: 1,
  },
  {
    id: 'e3',
    name: 'Weekly Sarva Darshan — Tirumala',
    location: 'Tirumala, Andhra Pradesh',
    date: 'Every Sunday',
    time: '5:00 AM onwards',
    attendees: '12k+ expected',
    type: 'current',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-7249f0bb9e9f?w=600&h=340&fit=crop',
    imageAlt: 'Sarva Darshan',
    month: 0,
  },
  {
    id: 'e4',
    name: 'Ganga Aarti — Dashashwamedh Ghat',
    location: 'Varanasi, Uttar Pradesh',
    date: 'Daily',
    time: '6:00 PM – 7:00 PM',
    attendees: '5k+ expected',
    type: 'live',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=600&h=340&fit=crop',
    imageAlt: 'Ganga Aarti',
    month: 0,
  },
  {
    id: 'e5',
    name: 'Guru Purnima at Shirdi',
    location: 'Shirdi, Maharashtra',
    date: '26 Jul 2026',
    time: '4:00 AM – 10:00 PM',
    attendees: '80k+ expected',
    type: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4a00b9bd4d81?w=600&h=340&fit=crop',
    imageAlt: 'Guru Purnima Shirdi',
    hasSpecialEntry: true,
    month: 7,
  },
  {
    id: 'e6',
    name: 'Rath Yatra — Jagannath Temple',
    location: 'Puri, Odisha',
    date: '16 Jul 2026',
    time: '10:00 AM – 6:00 PM',
    attendees: '1L+ expected',
    type: 'special-puja',
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0a5?w=600&h=340&fit=crop',
    imageAlt: 'Rath Yatra Puri',
    month: 7,
  },
]

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  upcoming: 'Upcoming',
  'special-puja': 'Special Puja',
  current: 'Current',
  live: 'Live',
}

export const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const
