import type { ReactNode } from 'react'

type Props = {
  id?: string
  headingId: string
  title: string
  lead: string
  muted?: boolean
  children: ReactNode
  className?: string
}

export function SectionShell({ id, headingId, title, lead, muted, children, className = '' }: Props) {
  return (
    <section
      id={id}
      className={`darshan__section darshan__section--post${muted ? ' darshan__section--muted' : ''}${className ? ` ${className}` : ''}`}
      aria-labelledby={headingId}
    >
      <div className="darshan__container">
        <div className="darshan__section-head darshan__section-head--center">
          <h2 id={headingId} className="darshan__h2">
            {title}
          </h2>
          <p className="darshan__lead">{lead}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
