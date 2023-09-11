'use client'

import Image from 'next/image';
import styles from '../location.module.css'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import getSkeletonDataUrl from '../../utils/getSkeletonDataUrl';
import gsap from "gsap";

const generateImages = function(images) {
    const dataUrl = `data:image/svg+xml;base64,${getSkeletonDataUrl(480, 480)}`;
    console.log(dataUrl);
    return images.map(image => (
        <Image
        key={image.id}
        src={image.url}
        style={{opacity: 0 }}
        sizes="(max-width: 480px) 480px, (max-width: 780px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${getSkeletonDataUrl(720, 720)}`}
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
        <h2 className={styles.location_text}>{location}</h2>
    </div>)
}