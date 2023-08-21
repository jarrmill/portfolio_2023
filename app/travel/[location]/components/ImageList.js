'use client'

import Image from 'next/image';
import styles from '../location.module.css'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import gsap from "gsap";

const generateImages = function(posts) {
    return posts.map(post => (
        <Image
        key={post.id}
        src={post.feature_image}
        style={{opacity: 0 }}
        fill
        priority={true}
        className={`${styles.gallery_image} gallery-image`}
        alt="Picture of the author"
      />
    ))
}
export default function Page({ posts, location }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
      gsap.to(".gallery-image", {opacity: 1, duration: 1, stagger: .3});
  }, [])
  return (
    <div className={styles.gallery_container}>
        {generateImages(posts)}
    </div>)
}