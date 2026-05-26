export type PackageCategory = 'all' | 'group' | 'private' | 'family' | 'solo' | 'luxury'

export type TourPackage = {
  id: string
  title: string
  route: string
  days: number
  nights: number
  groupSize: string
  category: Exclude<PackageCategory, 'all'>
  inclusions: ('hotel' | 'meals' | 'transport' | 'guide')[]
  pricePerPerson: number
  originalPrice?: number
  rating: number
  reviews: number
  nextDeparture: string
  featured?: boolean
  imageUrl: string
  sortRank: number
}

export const PACKAGE_FILTERS: { id: PackageCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'group', label: 'Group Tours' },
  { id: 'private', label: 'Private' },
  { id: 'family', label: 'Family' },
  { id: 'solo', label: 'Solo' },
  { id: 'luxury', label: 'Luxury' },
]

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg1',
    title: 'Divine Tirupati Weekend',
    route: 'Bangalore → Tirupati → Tirumala',
    days: 2,
    nights: 1,
    groupSize: 'Up to 12',
    category: 'group',
    inclusions: ['hotel', 'meals', 'transport', 'guide'],
    pricePerPerson: 4999,
    originalPrice: 6499,
    rating: 4.8,
    reviews: 324,
    nextDeparture: 'Sat 7 Jun 2026',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4a00b9bd4d81?w=1200&h=400&fit=crop',
    sortRank: 1,
  },
  {
    id: 'pkg2',
    title: 'VIP Break Darshan Experience',
    route: 'Hyderabad → Tirumala',
    days: 1,
    nights: 0,
    groupSize: 'Private (up to 4)',
    category: 'luxury',
    inclusions: ['transport', 'guide'],
    pricePerPerson: 12500,
    originalPrice: 15000,
    rating: 4.9,
    reviews: 89,
    nextDeparture: 'Daily departures',
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0a5?w=800&h=300&fit=crop',
    sortRank: 2,
  },
  {
    id: 'pkg3',
    title: 'Family Comfort Pilgrimage',
    route: 'Chennai → Tirupati → Shirdi',
    days: 4,
    nights: 3,
    groupSize: 'Family (2–6)',
    category: 'family',
    inclusions: ['hotel', 'meals', 'transport', 'guide'],
    pricePerPerson: 8999,
    rating: 4.7,
    reviews: 156,
    nextDeparture: 'Fri 13 Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-7249f0bb9e9f?w=800&h=300&fit=crop',
    sortRank: 3,
  },
  {
    id: 'pkg4',
    title: 'Solo Devotee Express',
    route: 'Delhi → Vaishno Devi',
    days: 3,
    nights: 2,
    groupSize: 'Solo traveller',
    category: 'solo',
    inclusions: ['hotel', 'transport'],
    pricePerPerson: 5999,
    rating: 4.6,
    reviews: 42,
    nextDeparture: 'Wed 11 Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=800&h=300&fit=crop',
    sortRank: 4,
  },
  {
    id: 'pkg5',
    title: 'Private Cab Pilgrimage',
    route: 'Mumbai → Shirdi → Nashik',
    days: 3,
    nights: 2,
    groupSize: 'Private (up to 6)',
    category: 'private',
    inclusions: ['hotel', 'meals', 'transport'],
    pricePerPerson: 7499,
    originalPrice: 8999,
    rating: 4.5,
    reviews: 67,
    nextDeparture: 'Flexible dates',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4a00b9bd4d81?w=800&h=300&fit=crop',
    sortRank: 5,
  },
  {
    id: 'pkg6',
    title: 'Char Dham Yatra — Premium',
    route: 'Yamunotri → Gangotri → Kedarnath → Badrinath',
    days: 10,
    nights: 9,
    groupSize: 'Up to 16',
    category: 'group',
    inclusions: ['hotel', 'meals', 'transport', 'guide'],
    pricePerPerson: 45999,
    originalPrice: 52999,
    rating: 4.9,
    reviews: 412,
    nextDeparture: 'Mon 2 Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-7249f0bb9e9f?w=800&h=300&fit=crop',
    sortRank: 6,
  },
  {
    id: 'pkg7',
    title: 'Varanasi Spiritual Retreat',
    route: 'Delhi → Varanasi → Sarnath',
    days: 3,
    nights: 2,
    groupSize: 'Up to 10',
    category: 'group',
    inclusions: ['hotel', 'meals', 'transport', 'guide'],
    pricePerPerson: 6999,
    rating: 4.7,
    reviews: 198,
    nextDeparture: 'Fri 20 Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=800&h=300&fit=crop',
    sortRank: 7,
  },
  {
    id: 'pkg8',
    title: 'Luxury Golden Triangle Pilgrimage',
    route: 'Delhi → Agra → Jaipur',
    days: 5,
    nights: 4,
    groupSize: 'Private (up to 4)',
    category: 'luxury',
    inclusions: ['hotel', 'meals', 'transport', 'guide'],
    pricePerPerson: 24999,
    originalPrice: 29999,
    rating: 4.8,
    reviews: 76,
    nextDeparture: 'Flexible dates',
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0a5?w=800&h=300&fit=crop',
    sortRank: 8,
  },
]

export type PackageSort = 'price' | 'rating' | 'duration' | 'popularity'

export function sortPackages(packages: TourPackage[], sort: PackageSort): TourPackage[] {
  const list = [...packages]
  switch (sort) {
    case 'price':
      return list.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating)
    case 'duration':
      return list.sort((a, b) => b.days - a.days)
    case 'popularity':
      return list.sort((a, b) => a.sortRank - b.sortRank)
    default:
      return list
  }
}

export const INCLUSION_LABELS: Record<TourPackage['inclusions'][number], string> = {
  hotel: 'Hotel',
  meals: 'Meals',
  transport: 'Transport',
  guide: 'Guide',
}
