import 'server-only'

import { getContent } from './utils/get-content';
import LocationList from './components/LocationList';

import styles from './travel.module.css'
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function Home() {
  const content = await getContent()

  return (
    <main className={styles.main}>
        <LocationList content={content} />
    </main>
  )
}
