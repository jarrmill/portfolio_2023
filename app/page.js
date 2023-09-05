"use client";

import {Suspense, useState } from 'react'
import styles from './page.module.css'
import Computers from './Computers'

export default function Home() {
  return (
    <main className={styles.main}>
        <Suspense fallback={null}>
          <Computers />
        </Suspense>
    </main>
  )
}
