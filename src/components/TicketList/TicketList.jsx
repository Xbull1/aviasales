import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button } from 'antd'
import {
  fetchTickets,
  selectLoadingState,
  selectError,
  selectDisplayedTickets,
} from '../../features/Ticket/TicketsSlice'
import Ticket from '../Ticket/Ticket'
import styles from './TicketList.module.scss'

function TicketList() {
  const dispatch = useDispatch()
  const tickets = useSelector(selectDisplayedTickets)
  const loading = useSelector(selectLoadingState)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  if (loading === 'pending' && tickets.length === 0) {
    return <div>Получение билетов...</div>
  }

  if (error && tickets.length === 0) {
    return (
      <div>
        <Alert message={error} type="error" showIcon />
        <Button color="primary" variant="outlined" onClick={() => dispatch(fetchTickets())}>
          Повторить
        </Button>
      </div>
    )
  }

  if (tickets.length === 0) {
    return <Alert message="Билеты не найдены" type="error" showIcon closable />
  }

  return (
    <div className={styles.container}>
      <ul className={styles['ticket-list']}>
        {tickets.map((ticket, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Ticket key={`${ticket.price}-${ticket.carrier}-${index}`} ticket={ticket} />
        ))}
      </ul>
    </div>
  )
}

export default TicketList
