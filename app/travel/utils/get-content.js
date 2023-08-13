const getPosts = async function() {
    // get Posts
    const url = `${process.env.GHOST_URL}/ghost/api/content/posts?&include=tags&key=${process.env.GHOST_CONTENT_KEY}`
    const res = await fetch(url, {
        headers: {
            'Accept-Version': 'v5.0',
        }
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export const getTags = async function() {
    const url = `${process.env.GHOST_URL}/ghost/api/content/tags?key=${process.env.GHOST_CONTENT_KEY}`
    const res = await fetch(url, {
        headers: {
            'Accept-Version': 'v5.0',
        }
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
}

export const getContent = async function() {
    const postsData = await getPosts();
    const tagsData = await getTags()
    return { posts: postsData.posts, tags: tagsData.tags }
}