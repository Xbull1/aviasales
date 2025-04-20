import { useDispatch } from 'react-redux'
import { loadMoreTicket } from '../../features/Ticket/TicketsSlice'
import styles from './ShowMore.module.scss'

export default function ShowMore() {
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      className={styles['show-more-button']}
      onClick={() => {
        dispatch(loadMoreTicket())
      }}
    >
      показать еще 5 билетов!
    </button>
  )
}
