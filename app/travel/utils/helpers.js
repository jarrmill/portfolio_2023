export const capitalizeWords = (tagName) => {
    // capitalize all words in the string
    const words = tagName.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

export const splitWords = (tagName) => {
  // take a tagName in kebab-case and return a string with spaces
  const words = tagName.split('-');
  return words.join(' ');
}

export const cleanTagName = (tagName) => {
  const split = splitWords(tagName);
  const capitalized = capitalizeWords(split);

  return capitalized;
}