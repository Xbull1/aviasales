import React from 'react'
import styles from './Ticket.module.scss'
import TicketSegment from './TicketSegment'

function Ticket({ ticket }) {
  const formatPrice = (price) => {
    return `${new Intl.NumberFormat('ru-RU').format(price)} Р`
  }

  return (
    <li className={styles.Ticket}>
      <div className={styles.header}>
        <span className={styles.price}>{formatPrice(ticket.price)}</span>
        <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt={`Логотип ${ticket.carrier}`} />
      </div>
      <div className={styles.content}>
        <TicketSegment segment={ticket.segments[0]} />
        <TicketSegment segment={ticket.segments[1]} />
      </div>
    </li>
  )
}

export default React.memo(Ticket)
