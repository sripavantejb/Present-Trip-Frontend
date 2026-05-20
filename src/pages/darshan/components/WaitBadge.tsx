import type { WaitLevel } from '../postHeroData'

type Props = { waitTime: string; level: WaitLevel }

export function WaitBadge({ waitTime, level }: Props) {
  return (
    <span className={`darshan__wait-badge darshan__wait-badge--${level}`} title="Estimated wait">
      {waitTime}
    </span>
  )
}
