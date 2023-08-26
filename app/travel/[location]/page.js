import 'server-only'

import { getContent } from '../utils/get-content';
import { cleanData } from '../utils/helpers';
import ImageList from  './components/ImageList';
import styles from './location.module.css'

const filterPosts = function(posts, location) {
    return posts.filter(post => post.primary_tag.name === location);
};

export default async function Page({ params }) {
  const rawContent = await getContent();
  const content = cleanData(rawContent);

  const images = content[params.location];
  return (
    <div className={styles.main}>
        <ImageList images={images} location={ params.location } />
    </div>)
}