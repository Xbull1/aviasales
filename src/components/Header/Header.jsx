import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { SelectGlobalLoading } from '../../features/Ticket/TicketsSlice'
import Logo from '../../assets/Logo.svg'
import styles from './Header.module.scss'

export default function Header() {
  const isLoading = useSelector(SelectGlobalLoading)
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo" className={styles.logo} />
      {isLoading && (
        <div className={styles.spinner}>
          <Spin indicator={<LoadingOutlined spin />} />
          <div className={styles.spinner__text}>загрузка билетов</div>
        </div>
      )}
    </header>
  )
}
