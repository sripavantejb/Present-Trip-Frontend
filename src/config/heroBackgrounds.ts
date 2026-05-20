import type { CategoryId } from './categoryThemes'
import { SITE_IMAGES } from './siteImages'

/** Full-bleed hero illustrations in /public. */
export const HERO_BACKGROUND_IMAGES: Partial<Record<CategoryId, string>> = {
  flights: SITE_IMAGES.hero.flights,
  trains: SITE_IMAGES.hero.trains,
  buses: SITE_IMAGES.hero.buses,
  hotels: SITE_IMAGES.hero.hotels,
}

export function heroHasPhotoBackground(category: CategoryId): boolean {
  return category in HERO_BACKGROUND_IMAGES
}
