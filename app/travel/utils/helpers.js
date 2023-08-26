export const capitalizeWords = (tagName) => {
    // capitalize all words in the string
    const words = tagName.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

export const splitWords = (tagName) => {
  // take a tagName in kebab-case and return a string with spaces
  const words = tagName.split('_');
  return words.join(' ');
}

export const cleanTagName = (tagName) => {
  // an example filename is 'united_states-3_169.jpg'
  const location = tagName.split('-')[0];
  const split = splitWords(location);
  const capitalized = capitalizeWords(split);

  return capitalized;
}

const cleanImageData = (rawImages) => {
  return rawImages.map(image => ({
    name: cleanTagName(image.filename),
    url: image.variants[0],
    slug: cleanTagName(image.filename).replace(/ /g,''),
    id: image.id
  }));
};

const organizeImageData = (cleanedImages) => {
  return cleanedImages.reduce((acc, image) => {
    if (!acc[image.name]) {
      acc[image.name] = [image];
    } else {
      acc[image.name].push(image);
    }
    return { ...acc }
  }, {})
}

export const cleanData = (data) => {
  const rawImages = data.images.result.images;
  const cleanedImages = cleanImageData(rawImages);

  return organizeImageData(cleanedImages);
}