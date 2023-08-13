import 'server-only'

import Image from 'next/image';
import { getContent } from '../utils/get-content';
import styles from './location.module.css'

const filterPosts = function(posts, location) {
    return posts.filter(post => post.primary_tag.name === location);
};

const generateImages = function(posts) {
    return posts.map(post => (
        <Image
        key={post.id}
        src={post.feature_image}
        width={500}
        height={500}
        alt="Picture of the author"
      />
    ))
}
export default async function Page({ params }) {
  const content = await getContent();
  const posts = filterPosts(content.posts, params.location);
  return (
    <div className={styles.main}>
        {generateImages(posts)}
    </div>)
}