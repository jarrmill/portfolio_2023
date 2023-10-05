export const getImages = async function() {
    const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`;
    const res = await fetch(url, {
        next: { revalidate: 3600 },
        headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
        }
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json();
}

export const getContent = async function() {
    const imageData = await getImages();
    return { images: imageData }
}