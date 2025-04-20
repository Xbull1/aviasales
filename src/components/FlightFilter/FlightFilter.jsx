import { useDispatch, useSelector } from 'react-redux'
import { toggleAll, toggleFilter } from '../../features/FlightFilter/FlightFilterSlice'
import { applyFilters } from '../../features/Ticket/TicketsSlice'
import styles from './FlightFilter.module.scss'

export default function FlightFilter() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)
  const handleFilterChange = (filterType) => {
    if (filterType === 'all') {
      const newAllState = !filters.all
      dispatch(toggleAll())
      dispatch(
        applyFilters({
          all: newAllState,
          noTransfers: newAllState,
          oneTransfer: newAllState,
          twoTransfers: newAllState,
          threeTransfers: newAllState,
        })
      )
    } else {
      const newValue = !filters[filterType]
      dispatch(toggleFilter(filterType))
      dispatch(
        applyFilters({
          ...filters,
          [filterType]: newValue,
          all: false,
        })
      )
    }
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Количество пересадок</h2>
      <ul className={styles['container-list']}>
        <li className={styles['container-item']}>
          <label htmlFor="container" className={styles['container-item__label']}>
            <input
              type="checkbox"
              className={styles['container-input']}
              checked={filters.all}
              onChange={() => handleFilterChange('all')}
            />
            все
          </label>
        </li>
        <li className={styles['container-item']}>
          <label htmlFor="container" className={styles['container-item__label']}>
            <input
              type="checkbox"
              className={styles['container-input']}
              checked={filters.noTransfers}
              onChange={() => handleFilterChange('noTransfers')}
            />
            Без пересадок
          </label>
        </li>
        <li className={styles['container-item']}>
          <label htmlFor="container" className={styles['container-item__label']}>
            <input
              type="checkbox"
              className={styles['container-input']}
              checked={filters.oneTransfer}
              onChange={() => handleFilterChange('oneTransfer')}
            />
            1 пересадка
          </label>
        </li>
        <li className={styles['container-item']}>
          <label htmlFor="container" className={styles['container-item__label']}>
            <input
              type="checkbox"
              className={styles['container-input']}
              checked={filters.twoTransfers}
              onChange={() => handleFilterChange('twoTransfers')}
            />
            2 пересадка
          </label>
        </li>
        <li className={styles['container-item']}>
          <label htmlFor="container" className={styles['container-item__label']}>
            <input
              type="checkbox"
              className={styles['container-input']}
              checked={filters.threeTransfers}
              onChange={() => handleFilterChange('threeTransfers')}
            />
            3 пересадка
          </label>
        </li>
      </ul>
    </div>
  )
}
