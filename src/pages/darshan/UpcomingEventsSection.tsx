import { useState } from 'react'

type EventItem = {
  id: string
  name: string
  datetime: string
  attendees: string
  badge: 'special' | 'current'
}

const EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'Brahmotsavam — Garuda Seva',
    datetime: 'Sat 14 Jun · 6:00 AM',
    attendees: '~45,000 expected',
    badge: 'special',
  },
  {
    id: 'e2',
    name: 'Vaikunta Ekadasi Special Entry',
    datetime: 'Fri 10 Jan · 4:00 AM – 12:00 PM',
    attendees: '~28,000 expected',
    badge: 'special',
  },
  {
    id: 'e3',
    name: 'Weekly Sarva Darshan — Tirumala',
    datetime: 'Every Sunday · 5:00 AM onwards',
    attendees: '~12,000 expected',
    badge: 'current',
  },
]

export function UpcomingEventsSection() {
  const [reminders, setReminders] = useState<Set<string>>(new Set())

  const toggleReminder = (id: string) => {
    setReminders((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="events" className="pil-section" aria-labelledby="events-heading">
      <div className="pil-section__inner">
        <div className="pil-section__head">
          <div>
            <h2 id="events-heading" className="pil-section__title">
              Upcoming Events
            </h2>
            <p className="pil-section__lead">Festivals and special darshan windows — set a reminder</p>
          </div>
        </div>
        <div className="pil-scroll-x">
          {EVENTS.map((e) => (
            <article key={e.id} className="pil-event-card pil-card">
              <div className="pil-event-card__badges">
                <span className={`pil-badge pil-badge--${e.badge === 'special' ? 'gold' : 'green'}`}>
                  {e.badge === 'special' ? 'Special Entry' : 'Current'}
                </span>
              </div>
              <h3 className="pil-event-card__title">{e.name}</h3>
              <p className="pil-event-card__datetime">{e.datetime}</p>
              <p className="pil-event-card__attendees">{e.attendees}</p>
              <button
                type="button"
                className={`pil-toggle${reminders.has(e.id) ? ' pil-toggle--on' : ''}`}
                onClick={() => toggleReminder(e.id)}
                aria-pressed={reminders.has(e.id)}
              >
                {reminders.has(e.id) ? '✓ Reminder set' : 'Remind Me'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
