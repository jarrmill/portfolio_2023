"use client"

import Link from 'next/link';
import gsap from "gsap";
import styles from '../travel.module.css'
import { useRef, useState } from 'react';
import { cleanTagName } from '../utils/helpers';
import Image from 'next/image';


export default function LocationList({ content }) { 
    const itemsRef = useRef(null);
    const imagesRef = useRef(null);
    const [hoveredTag, setHoveredTag] = useState(null);

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

        handleImageEnter(itemId, idx);
        setHoveredTag(itemId);
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
        gsap.fromTo(node, from, to);
    }

    const handleMouseLeave = (itemId, idx) => {
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

    const generateTags = function({ tags, posts }) {
        return tags.map((tag, i) => (
          <li
            key={tag.id}
            onMouseEnter={e => handleMouseEnter(tag.id, i)} 
            onMouseLeave={e => handleMouseLeave(tag.id, i)}
            >
            <span
                className={styles.location}
                />
            <span className={styles.location_ghost}>
                {cleanTagName(tag.name)}
            </span>
            <Link
              href={`/travel/${tag.name}`}
              ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(tag.id, node);
                  } else {
                    map.delete(tag.id);
                  }
                }}
            >{cleanTagName(tag.name)}</Link>
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
        <ul>
        {generateTags(content)}
        <div className={styles.image_container}>
            {generateImages(content)}
        </div>
        </ul>
    )
  }