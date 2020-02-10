import { ScriptureTable } from "../src/";
import usfmJS from 'usfm-js';
import { selectionsFromQuote } from '../src/components/selections/helpers';
import ugnt_tit from './__mocks__/ugnt_tit.js';
import { mount } from 'enzyme';
import React from 'react';

describe('Checking highlights from rendered component', () => {
  it('should have all words highlighted', () => {
    const titles = [
      'UGNT - Greek',
    ];

    const UGNT = usfmJS.toJSON(ugnt_tit);
    const books = [
      UGNT
    ];

    const reference = {
      bookId: 'tit',
      chapter: 1,
      verse: 1,
    };
    const words = [];
    const quote = `τῆς κατ’ εὐσέβειαν`
    const occurrence = 1;

    const wrapper = mount(<ScriptureTable
      renderOffscreen={{
        '1:1': true
      }}
      titles={titles}
      books={books}
      title='Titus'
      reference={reference}
      quote={quote}
      occurrence={occurrence}
      height='250px'
    />);
    const {verseObjects} = UGNT.chapters[1][1];
    const selections = selectionsFromQuote({ quote, verseObjects, occurrence });
    const verseComponent = wrapper.find('[data-test="verse-1-1"]').first();
    verseComponent.find('[data-test="aligned-word-object"]').forEach((wordObject) => {
      const className = wordObject.prop('className');
      if (className && className.match(/selected/)) {
        words.push(wordObject.text())
      }
    })
    selections.forEach((selectionStringified) => {
      const {text} = JSON.parse(selectionStringified);
      expect(words).toContain(text);
    })
  })
})

