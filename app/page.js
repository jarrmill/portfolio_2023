import Image from 'next/image'
import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <h1>
          <span className={styles.title}>Jarrod</span>
          <span className={styles.secondary_title}>Codes</span>
        </h1>
        <Image src="/construction.gif" width={250} height={250} />
        <Link
          href={`/travel/`}
          >Click to go to Jarrod Travels</Link>
    </main>
  )
}
