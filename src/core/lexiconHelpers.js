export function getLexiconResourceID(isNt) {
  const resourceId = isNt ? 'ugl' : 'uhl';
  return resourceId;
}

/**
 * iterate through word objects to get list of strongs numbers found
 * @param {object[]} wordObjects
 * @return {string[]}
 */
export function getStrongsList(wordObjects) {
  const strongs = wordObjects.map(word => (word.strongs || word.strong)).filter(word => word);
  return strongs;
}

/**
 * iterate through nested verse objects to get array of wordObjects
 * @param {object[]} verseObjects
 * @return {null|object[]}
 */
export const getWordObjects = (verseObjects) => {
  let words = [];

  if (! verseObjects || !verseObjects.length) {
    return null;
  }

  for (let i = 0, l = verseObjects.length; i < l; i++) {
    const verseObject = verseObjects[i];

    if (verseObject.type === 'word') {
      words.push(verseObject);
    }

    if (verseObject.type === 'milestone') {
      if (verseObject.children) {
        // Handle children of type milestone
        const subWords = getWordObjects(verseObject.children);
        words = words.concat(subWords);
      }
    }
  }

  return words;
};

