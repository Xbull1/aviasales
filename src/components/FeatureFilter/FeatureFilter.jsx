/* eslint-disable */
import { useDispatch } from 'react-redux'
import { sortByFeature } from '../../features/Ticket/TicketsSlice'
import styles from './FeatureFilter.module.scss'

export default function FeatureFilter() {
  const dispatch = useDispatch()
  const handleSortType = (sortTypes) => {
    dispatch(sortByFeature(sortTypes))
  }
  return (
    <fieldset className={styles.container}>
      <label className={styles.label}>
        <input
          name="tickets"
          type="radio"
          defaultChecked
          className={styles.input}
          onChange={() => handleSortType('cheapest')}
        />
        <span className={styles.text}>Самый дешевый</span>
      </label>
      <label className={styles.label}>
        <input name="tickets" type="radio" className={styles.input} onChange={() => handleSortType('fastest')} />
        <span className={styles.text}>Самый быстрый</span>
      </label>
      <label className={styles.label}>
        <input name="tickets" type="radio" className={styles.input} onChange={() => handleSortType('optimal')} />
        <span className={styles.text}>Оптимальный</span>
      </label>
    </fieldset>
  )
}
