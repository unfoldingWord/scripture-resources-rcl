import {occurrenceInjectVerseObjects} from '../../core/selections/verseObjects';

export const referenceIdsFromBooks = ({books}) => {
  const start = performance.now();
  const referenceIds = new Set([]);
  books.forEach((book) => {
    Object.keys(book.chapters).forEach(chapterKey => {
      const chapter = book.chapters[chapterKey];
      Object.keys(chapter).forEach(verseKey => {
        const referenceId = chapterKey + ':' + verseKey;
        referenceIds.add(referenceId);
      });
    });
  });
  const done = performance.now();
  console.log('ParallelScripture referenceId indexing: ' + (done - start).toFixed(3) + 'ms');
  return [...referenceIds];
};

export const versesFromReferenceIdAndBooks = ({referenceId, books}) => {
  const verses = books.map((book, index) => {
    const _reference = referenceFromReferenceId(referenceId);
    let verse = book.chapters[_reference.chapter][_reference.verse];
    if (index === 0 && verse.verseObjects && verse.verseObjects.length) {
      verse.verseObjects = occurrenceInjectVerseObjects(verse.verseObjects);
    }
    return verse;
  });
  return verses;
}

export const dataFromBooks = ({books}) => {
  const referenceIds = referenceIdsFromBooks({books});
  const data = referenceIds.map(referenceId => {
    let row = {referenceId};
    books.forEach((_, index) => {
      const [chapterKey, verseKey] = referenceId.split(':');
      const verse = books[index].chapters[chapterKey][verseKey];
      if (verse) row[index] = JSON.stringify({referenceId, ...verse});
    });
    return row;
  });
  return data;
};

export const dataFromReference = ({books, reference}) => {
  const referenceId = referenceIdFromReference(reference);
  let row = {referenceId};
  books.forEach((_, index) => {
    const verse = books[index].chapters[reference.chapter][reference.verse];
    if (verse) row[index] = JSON.stringify({referenceId, ...verse});
  });
  const data = [row];
  return data;
};

export const referenceIdFromReference = (reference) => reference.chapter + ':' + reference.verse;

export const referenceFromReferenceId = (referenceId) => {
  const [chapter, verse] = referenceId.split(':');
  return {chapter, verse};
};

