"use client"

import gsap from "gsap";
import styles from '../travel.module.css'
import { useRef, useState, useEffect } from 'react';
import { cleanTagName } from '../utils/helpers';
import { useRouter } from 'next/navigation'
import Image from 'next/image';


export default function LocationList({ content }) { 
    const itemsRef = useRef(null);
    const imagesRef = useRef(null);
    const router = useRouter()
    const [hoveredTag, setHoveredTag] = useState(null);

    useEffect(() => {
      gsap.to('.location_container', {
        opacity: 1,
        duration: 2,
        stagger: .3
      })
    }, []);
  
    // because items is a dynamic list, we need to use this function to keep track of the correct ref
    function getMap() {
        if (!itemsRef.current) {
        // Initialize the Map on first usage.
        itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    function getImagesMap() {
        if (!imagesRef.current) {
        // Initialize the Map on first usage.
        imagesRef.current = new Map();
        }
        return imagesRef.current;
    }

    const handleImageEnter = (itemId, idx) => {
        if (!itemId) {
            return;
        }

        const imageMap = getImagesMap();

        // get the old image ref and change the opacity to 0
        const oldNode = imageMap.get(hoveredTag);
        gsap.to(oldNode, { opacity: 0, y: 10 * idx, duration: .6 });

        // get the new image ref and change the opacity to 1
        const newNode = imageMap.get(itemId);
        gsap.to(newNode, { opacity: 1, y: 10 * idx, duration: .6 });
    }

    const handleImageLeave = (itemId) => {
        if (!itemId) {
            return;
        }

        const imageMap = getImagesMap();
        const node = imageMap.get(hoveredTag);

        gsap.to(node, { opacity: 0, duration: .6 });
    }

    const handleMouseEnter = (itemId, idx) => {
        if (!itemId) {
            return;
        }

        // when the user leaves the tag list, this function will be called without an idx
        // we don't want an image to appear in this case
        if(idx !== undefined) {
            handleImageEnter(itemId, idx);
            setHoveredTag(itemId);
        }

        const map = getMap();
        const node = map.get(itemId);

        if (!node) { 
            return;
        }
        const from = {
            'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            'opacity': .2
        };
        const to = {
            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'opacity': 1,
            'duration': 1
        }
        if(idx !== undefined) {
            gsap.fromTo(node, from, to);
        } else {
            gsap.to(node, to);
        }
    }

    const handleMouseLeave = (itemId) => {
        if (!itemId) {
            return;
        }
        const map = getMap();
        const node = map.get(itemId);

        const from = {
            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'opacity': 1
        };
        const to = {
            'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            'opacity': .2,
            'duration': 1
        }
        handleImageLeave(itemId);
        if (hoveredTag == itemId) {
            setHoveredTag(null);
        }
        gsap.fromTo(node, from, to);
    }

    const handleContainerLeave = () => {
        // get all the inactive nodes and trigger the handleMouseLeave event on them
        const map = getMap();
        map.forEach((node, key) => {
            handleMouseEnter(key);
        });
    }

    const handleRoute = (e, route) => {
        e.preventDefault();
        handleImageLeave(hoveredTag);
        gsap.to('.location_container', {
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: .3,
          onComplete: () => {
            router.push(`/travel/${route}`);
          }
        });
    }

    const generateTags = function({ tags }) {
        return tags.map((tag, i) => (
          <li
            className='location_container'
            style={{'opacity': 0}}
            key={tag.id}
            onMouseEnter={e => handleMouseEnter(tag.id, i)} 
            onMouseLeave={e => handleMouseLeave(tag.id, i)}
            >
            <span className={styles.location} />
            <a
                className={styles.location_ghost}
                href={`/travel/${tag.name}`}
                onClick={(e) => handleRoute(e, tag.name)}
                >
                {cleanTagName(tag.name)}
            </a>
            <a
              href={`/travel/${tag.name}`}
              onClick={(e) => handleRoute(e, tag.name)}
              ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(tag.id, node);
                  } else {
                    map.delete(tag.id);
                  }
                }}
            >{cleanTagName(tag.name)}</a>
          </li>
        ))
    }

    const generateImages = function({ posts }) {
        // filter posts so we only show the first post for each location
        const postsMap = new Map();
        posts.forEach(post => {
            if (!postsMap.has(post.primary_tag.name)) {
                postsMap.set(post.primary_tag.name, post);
            }
        });
        return Array.from(postsMap).map(([key, post]) => (
            <Image
            key={key}
            src={post.feature_image}
            className={`${styles.tag_image}`}
            width={500}
            height={500}
            ref={(node) => {
                const map = getImagesMap();
                if (node) {
                  map.set(post.primary_tag.id, node);
                } else {
                  map.delete(post.primary_tag.id);
                }
              }}
            alt={post.title}
          />
        ))
    }

    return (
        <ul onMouseLeave={e => handleContainerLeave()}>
        {generateTags(content)}
        <div className={styles.image_container}>
            {generateImages(content)}
        </div>
        </ul>
    )
  }