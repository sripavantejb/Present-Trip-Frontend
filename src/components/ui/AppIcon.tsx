import type { LucideIcon, LucideProps } from 'lucide-react'

type AppIconProps = Omit<LucideProps, 'ref'> & {
  icon: LucideIcon
}

/** Consistent stroke icons — Airbnb-style 1.75 weight at 24px grid. */
export function AppIcon({ icon: Icon, size = 24, strokeWidth = 1.75, ...props }: AppIconProps) {
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden {...props} />
}
