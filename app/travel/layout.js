import Link from 'next/link';
import styles from './travel.module.css'

export default function TravelLayout({ children }) {
    return (
      <div>
        <nav className={styles.navbar_container}>
          <h1>Jarrod Travels</h1>
          <div className={styles.navbar_section}>
            <p>01.</p>
            <Link href="/" className={styles.navbar_link}>Home</Link>
          </div>
          <div className={styles.navbar_section}>
            <p>02.</p>
            <Link href="/travel" className={styles.navbar_link}>Travel Home</Link>
          </div>
        </nav>
        {children}
      </div>
    )
  }