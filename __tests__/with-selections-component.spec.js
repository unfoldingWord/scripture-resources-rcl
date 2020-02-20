import { ScriptureTable } from "../src/";
import usfmJS from 'usfm-js';
import { selectionsFromQuote } from '../src/components/selections/helpers';
import ugnt_tit from './__mocks__/ugnt_tit.js';
import { mount } from 'enzyme';
import React from 'react';

describe('Checking highlights from rendered component', () => {
  it('should have all words highlighted', () => {
    const reference = {
      bookId: 'tit',
      chapter: 1,
      verse: 1,
    };
    const quote = `τῆς κατ’ εὐσέβειαν`;
    const occurrence = 1;
    const UGNT = usfmJS.toJSON(ugnt_tit);
    const books = [
      UGNT
    ];
    const { verseObjects } = UGNT.chapters[reference.chapter][reference.verse];
    const highlightedWordsFromVerseComponent = getHighlightedWordsFromVerseComponent(reference, occurrence, quote, books);
    const expectedHighlightedWords = selectionsFromQuote({ verseObjects, occurrence, quote });
    expectedHighlightedWords.forEach((selectionStringified) => {
      const { text } = JSON.parse(selectionStringified);
      expect(highlightedWordsFromVerseComponent).toContain(text);
    })
  })
})

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

