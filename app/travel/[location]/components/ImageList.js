'use client'

import Image from 'next/image';
import styles from '../location.module.css'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import gsap from "gsap";

const generateImages = function(images) {
    return images.map(image => (
        <Image
        key={image.id}
        src={image.url}
        style={{opacity: 0 }}
        fill
        className={`${styles.gallery_image} gallery-image`}
        alt="Picture of the author"
      />
    ))
}
export default function Page({ images, location }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
      gsap.to(".gallery-image", {opacity: 1, duration: 1, stagger: .3});
  }, [])
  return (
    <div className={styles.gallery_container}>
        {generateImages(images)}
    </div>)
}