import styles from './App.module.scss'
import Header from './components/Header/Header'
import FlightFilter from './components/FlightFilter/FlightFilter'
import FeatureFilter from './components/FeatureFilter/FeatureFilter'
import TicketList from './components/TicketList/TicketList'
import ShowMore from './components/ShowMore/ShowMore'

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.container}>
        <FlightFilter />
        <div className={styles.content}>
          <FeatureFilter />
          <TicketList />
          <ShowMore />
        </div>
      </div>
    </div>
  )
}

export default App
