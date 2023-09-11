"use client";

import { Suspense, useState, useEffect } from 'react'
import styles from './page.module.css'
import Computers from './components/Computers'
import Overlay from './components/Overlay'

export default function Home() {
  const [width] = useState(window.innerWidth);

  return (
    <main className={styles.main}>
        <Suspense fallback={null}>
          <Computers count={Math.floor(width / 25)} />
        </Suspense>
        <Overlay />
    </main>
  )
}
