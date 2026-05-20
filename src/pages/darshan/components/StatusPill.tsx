import type { SlotStatus } from '../postHeroData'
import { SLOT_STATUS_LABELS } from '../postHeroData'

type Props = { status: SlotStatus }

export function StatusPill({ status }: Props) {
  return (
    <span className={`darshan__slot-pill darshan__slot-pill--${status}`}>{SLOT_STATUS_LABELS[status]}</span>
  )
}
