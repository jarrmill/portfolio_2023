import 'server-only'

import { getContent } from '../utils/get-content';
import ImageList from  './components/ImageList';
import styles from './location.module.css'

const filterPosts = function(posts, location) {
    return posts.filter(post => post.primary_tag.name === location);
};

export default async function Page({ params }) {
  const content = await getContent();
  const posts = filterPosts(content.posts, params.location);
  return (
    <div className={styles.main}>
        <ImageList posts={posts} location={ params.location } />
    </div>)
}