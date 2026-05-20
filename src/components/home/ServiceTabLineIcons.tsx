import { BedDouble, Bus, Landmark, Plane, TrainFront, type LucideIcon } from 'lucide-react'
import type { CategoryId } from '../../config/categoryThemes'
import { AppIcon } from '../ui/AppIcon'

const TAB_ICONS: Record<CategoryId, LucideIcon> = {
  flights: Plane,
  trains: TrainFront,
  buses: Bus,
  hotels: BedDouble,
  darshan: Landmark,
}

export function ServiceLineIcon({ id }: { id: CategoryId }) {
  return <AppIcon icon={TAB_ICONS[id]} className="pt-icon pt-icon--tab" size={32} strokeWidth={1.65} />
}
