import React from 'react'
import { format, addMinutes } from 'date-fns'
import { ru } from 'date-fns/locale'
import styles from './Ticket.module.scss'

function TicketSegment({ segment }) {
  const departureTime = format(new Date(segment.date), 'HH:mm', { locale: ru })
  const arrivalTime = format(addMinutes(new Date(segment.date), segment.duration), 'HH:mm', { locale: ru })

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}ч ${mins}м`
  }

  const formatStops = (stops) => {
    if (stops.length === 0) return 'БЕЗ ПЕРЕСАДОК'
    if (stops.length === 1) return '1 ПЕРЕСАДКА'
    return `${stops.length} ПЕРЕСАДКИ`
  }

  const stopsText = segment.stops.length === 0 ? '-' : segment.stops.join(', ')

  return (
    <div className={styles['content-info']}>
      <div className={styles['content-info-text']}>
        <span className={styles['content-info__text-top']}>
          {segment.origin} – {segment.destination}
        </span>
        <span className={styles['content-info__text-bottom']}>
          {departureTime} – {arrivalTime}
        </span>
      </div>
      <div className={styles['content-info-text']}>
        <span className={styles['content-info__text-top']}>В ПУТИ</span>
        <span className={styles['content-info__text-bottom']}>{formatDuration(segment.duration)}</span>
      </div>
      <div className={styles['content-info-text']}>
        <span className={styles['content-info__text-top']}>{formatStops(segment.stops)}</span>
        <span className={styles['content-info__text-bottom']}>{stopsText}</span>
      </div>
    </div>
  )
}

export default React.memo(TicketSegment)
