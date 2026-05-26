export type DealCategory = 'all' | 'darshan' | 'hotels' | 'packages' | 'transport'

export type Deal = {
  id: string
  title: string
  discount: string
  couponCode: string
  validTill: string
  category: Exclude<DealCategory, 'all'>
  description: string
  tags: string[]
}

export const DEALS: Deal[] = [
  {
    id: 'd1',
    title: 'Special Entry Darshan Bundle',
    discount: '25% OFF',
    couponCode: 'DARSHAN25',
    validTill: '30 Jun 2026',
    category: 'darshan',
    description: 'Save on Special Entry Darshan + coordinator support at Tirumala.',
    tags: ['Early Bird', 'VIP'],
  },
  {
    id: 'd2',
    title: 'Weekend Pilgrimage Package',
    discount: '15% OFF',
    couponCode: 'WEEKEND15',
    validTill: '15 Jul 2026',
    category: 'packages',
    description: 'Valid on select weekend departures from Bangalore & Chennai.',
    tags: ['Group'],
  },
  {
    id: 'd3',
    title: 'First-Time Devotee Offer',
    discount: '30% OFF',
    couponCode: 'FIRST30',
    validTill: '31 Dec 2026',
    category: 'darshan',
    description: 'New users only — up to ₹1,500 off your first darshan booking.',
    tags: ['New User'],
  },
  {
    id: 'd4',
    title: 'Hill Stay + Darshan Combo',
    discount: '20% OFF',
    couponCode: 'STAYDARSHAN',
    validTill: '20 Aug 2026',
    category: 'hotels',
    description: 'Book 2 nights near Tirupati and get darshan assistance included.',
    tags: ['Combo'],
  },
  {
    id: 'd5',
    title: 'TSRTC Bus + Token Bundle',
    discount: '10% OFF',
    couponCode: 'BUS10',
    validTill: '30 Sep 2026',
    category: 'transport',
    description: 'Hyderabad & Bengaluru special darshan bus services with bundled token.',
    tags: ['Transport'],
  },
  {
    id: 'd6',
    title: 'Family Package Early Bird',
    discount: '18% OFF',
    couponCode: 'FAMILY18',
    validTill: '01 Oct 2026',
    category: 'packages',
    description: 'Book 60 days ahead on family comfort packages for extra savings.',
    tags: ['Family', 'Early Bird'],
  },
]

export const DEAL_CATEGORY_FILTERS: { id: DealCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'darshan', label: 'Darshan' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'packages', label: 'Packages' },
  { id: 'transport', label: 'Transport' },
]
