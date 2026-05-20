import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type Props = {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple = false }: Props) {
  const baseId = useId()
  const [open, setOpen] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="darshan__accordion">
      {items.map((item) => {
        const isOpen = open.has(item.id)
        const panelId = `${baseId}-${item.id}-panel`
        const btnId = `${baseId}-${item.id}-btn`
        return (
          <div key={item.id} className={`darshan__accordion-item${isOpen ? ' darshan__accordion-item--open' : ''}`}>
            <h3 className="darshan__accordion-heading">
              <button
                type="button"
                id={btnId}
                className="darshan__accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <ChevronDown className="darshan__accordion-chevron" aria-hidden size={20} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="darshan__accordion-panel">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
