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
        width={500}
        height={500}
        priority={true}
        className={`${styles.gallery_image} .gallery-image`}
        alt="Picture of the author"
      />
    ))
}
export default function Page({ posts, location }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
      const url = `${pathname}?${searchParams}`
      console.log(url)
      const images = document.querySelectorAll(".gallery-image");
      console.log(images);
      gsap.fromTo(".gallery-image", {opacity: 0}, {opacity: 1, duration: 1});
  }, [pathname, searchParams])
  return (
    <div className={styles.main}>
        {generateImages(posts)}
    </div>)
}