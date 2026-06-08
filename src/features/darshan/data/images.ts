/**
 * Production image paths — all assets live under /public/darshan/
 * Run: npm run images:darshan (from frontend/) to download sources.
 */

const T = '/darshan/temples'
const S = '/darshan/stays'
const V = '/darshan/transport'
const H = '/darshan/hubs'
const P = '/darshan/packages'
const E = '/darshan/events'
const M = '/darshan/misc'

/** Full-bleed darshan landing + homepage hero */
export const DARSHAN_HERO_IMAGE_URL =
  'https://res.cloudinary.com/dfqdb1xws/image/upload/v1780590421/temple_image_exz15t.png' as const

/** 12 primary darshan temples — hero + card share same asset */
export const TEMPLE_IMAGE_BY_ID: Record<string, string> = {
  'tirupati-balaji': `${T}/tirupati-balaji.jpg`,
  padmavathi: `${T}/padmavathi.jpg`,
  srikalahasti: `${T}/srikalahasti.jpg`,
  kanipakam: `${T}/kanipakam.jpg`,
  shirdi: `${T}/shirdi.jpg`,
  kashi: `${T}/kashi.jpg`,
  'vaishno-devi': `${T}/vaishno-devi.jpg`,
  yadadri: `${T}/yadadri.jpg`,
  chilkur: `${T}/chilkur.jpg`,
  'iskcon-tirupati': `${T}/iskcon-tirupati.jpg`,
  kapileswara: `${T}/kapileswara.jpg`,
  'golden-temple': `${T}/golden-temple.jpg`,
  govindaraja: `${T}/govindaraja.jpg`,
}

export function templeHeroImage(templeId: string): string {
  return TEMPLE_IMAGE_BY_ID[templeId] ?? `${T}/tirupati-balaji.jpg`
}

export function templeCardImage(templeId: string): string {
  return templeHeroImage(templeId)
}

export const STAY_IMAGES: Record<string, { url: string; alt: string }> = {
  a1: { url: `${S}/a1.jpg`, alt: 'Clean hotel bedroom with air conditioning' },
  a2: { url: `${S}/a2.jpg`, alt: 'TTD guest house near Tirumala temple' },
  a3: { url: `${S}/a3.jpg`, alt: 'Simple pilgrim dharamshala room' },
  a4: { url: `${S}/a4.jpg`, alt: 'Upscale hotel suite interior' },
  a5: { url: `${S}/a5.jpg`, alt: 'Hillside resort with pool' },
  a6: { url: `${S}/a6.jpg`, alt: 'Comfortable mid-range hotel room' },
}

export const TRANSPORT_IMAGES: Record<string, { url: string; alt: string }> = {
  v1: { url: `${V}/v1.jpg`, alt: 'White sedan cab for temple trips' },
  v2: { url: `${V}/v2.jpg`, alt: 'Tempo traveller for group pilgrimage' },
  v3: { url: `${V}/v3.jpg`, alt: 'Luxury SUV for VIP temple travel' },
  v4: { url: `${V}/v4.jpg`, alt: 'Mini coach for large pilgrim groups' },
}

export const HUB_IMAGES: Record<string, string> = {
  tirupati: `${H}/tirupati.jpg`,
  shirdi: `${H}/shirdi.jpg`,
  varanasi: `${H}/varanasi.jpg`,
  puri: `${H}/puri.jpg`,
}

export const PACKAGE_IMAGES = {
  tirupatiWeekend: `${P}/tirupati-weekend.jpg`,
  familyDarshan: `${P}/family-darshan.jpg`,
  luxurySed: `${P}/luxury-sed.jpg`,
  shirdiWeekend: `${P}/shirdi-weekend.jpg`,
  kashiGanga: `${P}/kashi-ganga.jpg`,
  vaishnoTrek: `${P}/vaishno-trek.jpg`,
  goldenAmritsar: `${P}/golden-amritsar.jpg`,
  southCircuit: `${P}/south-circuit.jpg`,
} as const

export const EVENT_IMAGES: Record<string, { url: string; alt: string }> = {
  e1: { url: `${E}/brahmotsavam.jpg`, alt: 'Tirumala Brahmotsavam festival' },
  e2: { url: `${E}/vaikunta-ekadasi.jpg`, alt: 'Vaikunta Ekadasi at Tirumala' },
  e3: { url: `${E}/sarva-darshan.jpg`, alt: 'Devotees at Tirumala darshan' },
  e4: { url: `${E}/ganga-aarti.jpg`, alt: 'Ganga Aarti at Varanasi ghats' },
  e5: { url: `${E}/guru-purnima-shirdi.jpg`, alt: 'Guru Purnima at Shirdi' },
  e6: { url: `${H}/puri.jpg`, alt: 'Rath Yatra at Jagannath Temple Puri' },
}

/** Legacy darshan page experience blocks (accent keys) */
export const EXPERIENCE_IMAGES: Record<string, string> = {
  walk: `${M}/plan-pilgrimage.jpg`,
  night: `${M}/hero-backdrop.jpg`,
  prasadam: `${M}/prasadam-laddoo.jpg`,
  annadanam: `${E}/sarva-darshan.jpg`,
  ritual: `${M}/hero-gopuram.jpg`,
  roads: `${V}/v1.jpg`,
}

/** Curated package cards on legacy darshan hero (p1–p7) */
export const LEGACY_PACKAGE_IMAGES: Record<string, string> = {
  p1: `${P}/tirupati-weekend.jpg`,
  p2: `${P}/luxury-sed.jpg`,
  p3: `${P}/family-darshan.jpg`,
  p4: `${P}/south-circuit.jpg`,
  p5: `${P}/south-circuit.jpg`,
  p6: `${P}/kashi-ganga.jpg`,
  p7: `${P}/shirdi-weekend.jpg`,
}

export const MISC_IMAGES = {
  heroBackdrop: DARSHAN_HERO_IMAGE_URL,
  heroGopuram: DARSHAN_HERO_IMAGE_URL,
  planBanner: `${M}/plan-pilgrimage.jpg`,
  prasadam: `${M}/prasadam-laddoo.jpg`,
  laddoo: `${M}/tirupati-laddoo.jpg`,
} as const

/** Trending row thumbnails */
export const TRENDING_IMAGES = {
  tirupati: { url: templeCardImage('tirupati-balaji'), alt: 'Tirumala Venkateswara Temple gopuram' },
  shirdi: { url: templeCardImage('shirdi'), alt: 'Shirdi Sai Baba temple' },
  vaishnoDevi: { url: templeCardImage('vaishno-devi'), alt: 'Vaishno Devi shrine hills' },
  puri: { url: `${H}/puri.jpg`, alt: 'Jagannath Temple Puri' },
} as const

/** Explorer listing id → temple image id */
export const EXPLORER_IMAGE_BY_LISTING_ID: Record<string, string> = {
  t1: 'tirupati-balaji',
  t2: 'padmavathi',
  t3: 'govindaraja',
  t4: 'kapileswara',
  t5: 'srikalahasti',
  t6: 'kanipakam',
  t7: 'iskcon-tirupati',
  t8: 'chilkur',
  t9: 'yadadri',
  t10: 'shirdi',
  t11: 'kashi',
  t12: 'golden-temple',
  t13: 'vaishno-devi',
  t14: 'tirupati-balaji',
  t15: 'padmavathi',
  t16: 'srikalahasti',
  t17: 'kanipakam',
  t18: 'yadadri',
  t19: 'chilkur',
  t20: 'kapileswara',
}

export function explorerImage(listingId: string): string {
  const templeId = EXPLORER_IMAGE_BY_LISTING_ID[listingId] ?? 'tirupati-balaji'
  return templeCardImage(templeId)
}
