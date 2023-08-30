import 'server-only'

import { getContent } from './utils/get-content';
import { cleanData } from './utils/helpers';
import LocationList from './components/LocationList';
import NavBar from './components/NavBar';

import styles from './travel.module.css'
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function Home() {
  const data = await getContent();
  const images = cleanData(data);

  return (
    <main className={styles.main}>
        <NavBar />
        <LocationList content={images} />
    </main>
  )
}
