import { ScriptureTable } from "../src";
import usfmJS from 'usfm-js';
import { selectionsFromQuote } from '../src/components/selections/helpers';
import ugnt_tit from './__mocks__/ugnt_tit.js';
import { mount } from 'enzyme';
import React from 'react';
import path from 'path';

describe('Checking highlights from rendered component', () => {
  it('should have all words highlighted Titus 1:1', () => {
    generateTest('tit-1-1');
  })
  it('should have all words highlighted Titus 1:2', () => {
    generateTest('tit-1-2');
  })
  it('should have all words highlighted Titus 1:3', () => {
    generateTest('tit-1-3');
  })
  it('should have all words highlighted Titus 1:4', () => {
    generateTest('tit-1-4');
  })
  it('should have all words highlighted Titus 1:5', () => {
    generateTest('tit-1-5');
  })
  it('should have all words highlighted Titus 1:9', () => {
    generateTest('tit-1-9');
  })
  it('should have all words highlighted Titus 1:12', () => {
    generateTest('tit-1-12');
  })
  it('should have all words highlighted Titus 2:2', () => {
    generateTest('tit-2-2');
  })
  it('should have all words highlighted Titus 2:10', () => {
    generateTest('tit-2-10');
  })
  it('should have all words highlighted Titus 2:13', () => {
    generateTest('tit-2-13');
  })
  it('should have all words highlighted Titus 3:4', () => {
    generateTest('tit-3-4');
  })
  it('should have all words highlighted Titus 3:6', () => {
    generateTest('tit-3-6');
  })
  it('should have all words highlighted Titus 3:6 (2)', () => {
    generateTest('tit-3-6-2');
  })
  it('should have all words highlighted Titus 3:7', () => {
    generateTest('tit-3-7');
  })
  it('should have all words highlighted Titus 3:13', () => {
    generateTest('tit-3-13');
  })
})

function generateTest(fileName) {
  const { book, chapter, verse, quote } = require(path.join(__dirname, './fixtures/highlighting', `${fileName}.js`));
  const reference = {
    bookId: book,
    chapter,
    verse,
  };
  const occurrence = 1;
  const UGNT = usfmJS.toJSON(ugnt_tit);
  const books = [
    UGNT
  ];
  const { verseObjects } = UGNT.chapters[reference.chapter][reference.verse];
  const highlightedWordsFromVerseComponent = getHighlightedWordsFromVerseComponent(reference, occurrence, quote, books);
  const expectedHighlightedWords = selectionsFromQuote({ verseObjects, occurrence, quote });
  expectedHighlightedWords.forEach((selectionStringified, index) => {
    const { text } = JSON.parse(selectionStringified);    
    expect(highlightedWordsFromVerseComponent[index]).toBe(text);
  })
}

function getHighlightedWordsFromVerseComponent(reference, occurrence, quote, books) {
  const words = [];
  const titles = [
    'UGNT - Greek',
  ];
  const wrapper = mount(<ScriptureTable
    renderOffscreen={{
      [`${reference.chapter}:${reference.verse}`]: true
    }}
    titles={titles}
    books={books}
    title='Titus'
    reference={reference}
    quote={quote}
    occurrence={occurrence}
    height='250px'
  />);
  const verseComponent = wrapper.find(`[data-test="verse-${reference.chapter}-${reference.verse}"]`).first();
  verseComponent.find('[data-test="aligned-word-object"]').forEach((wordObject) => {
    const className = wordObject.prop('className');
    if (className && className.match(/selected/)) {
      words.push(wordObject.text())
    }
  })
  return words;
}