import type { CategoryId } from './categoryThemes'

/** Full-bleed hero photos in /public (flights, trains, hotels). */
export const HERO_BACKGROUND_IMAGES: Partial<Record<CategoryId, string>> = {
  flights: '/hero-bg-flights.png',
  trains: '/hero-bg-trains.png',
  hotels: '/hero-bg-hotels.png',
}

export function heroHasPhotoBackground(category: CategoryId): boolean {
  return category in HERO_BACKGROUND_IMAGES
}
