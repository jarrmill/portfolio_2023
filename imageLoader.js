const normalizeSrc = src => {
  let url = src.startsWith('/') ? src.slice(1) : src;
  return url.replace('/public', '');
};

export default function cloudflareLoader ({ src, width, quality }) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `${normalizeSrc(src)}/${paramsString}`;
};
