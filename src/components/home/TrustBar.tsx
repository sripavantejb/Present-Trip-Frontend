import { BadgePercent, Headset, Lock, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppIcon } from '../ui/AppIcon'

const ITEMS: { title: string; sub: string; icon: LucideIcon }[] = [
  {
    title: 'Best Price Guarantee',
    sub: 'Get the best prices or we match it',
    icon: BadgePercent,
  },
  {
    title: 'Secure Payments',
    sub: '100% secure payment options',
    icon: Lock,
  },
  {
    title: '24/7 Customer Support',
    sub: "We're here to help anytime",
    icon: Headset,
  },
  {
    title: 'Trusted by Millions',
    sub: 'Join millions of happy travelers',
    icon: Users,
  },
]

export function TrustBar() {
  return (
    <div id="mice" className="pt-home__trust" role="presentation">
      {ITEMS.map((item) => (
        <div key={item.title} className="pt-home__trustItem">
          <div className="pt-home__trustIconWrap" aria-hidden>
            <AppIcon icon={item.icon} size={22} className="pt-icon pt-icon--trust" />
          </div>
          <div>
            <p className="pt-home__trustTitle">{item.title}</p>
            <p className="pt-home__trustSub">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
