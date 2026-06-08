import type { CategoryId } from './categoryThemes'
import { DARSHAN_HERO_IMAGE_URL } from '../features/darshan/data/images'
import { SITE_IMAGES } from './siteImages'

/** Full-bleed hero illustrations in /public (or remote for darshan). */
export const HERO_BACKGROUND_IMAGES: Partial<Record<CategoryId, string>> = {
  flights: SITE_IMAGES.hero.flights,
  trains: SITE_IMAGES.hero.trains,
  buses: SITE_IMAGES.hero.buses,
  hotels: SITE_IMAGES.hero.hotels,
  darshan: DARSHAN_HERO_IMAGE_URL,
}

export function heroHasPhotoBackground(category: CategoryId): boolean {
  return category in HERO_BACKGROUND_IMAGES
}
