import { selectionsFromQuote } from '../src/components/selections/helpers';
import usfmJS from 'usfm-js';
import fs from 'fs-extra';
import hi_tit from '../src/components/mocks/ugnt_tit.usfm';

describe('Selections From Quote', () => {
  const output = [];
  it('should output', () => {
    const bookName = 'titus';
    const book = usfmJS.toJSON(hi_tit);
    const { chapters } = book;
    const chaptersNumber = Object.keys(chapters).length - 1;
    for (let i = 1; i <= chaptersNumber; i++) {
      const versesNumber = Object.keys(chapters[i]).length - 1;
      for (let j = 1; j <= versesNumber; j++) {
        const { verseObjects } = chapters[i][j];
        const quote = verseObjects.map(({ text }) => text).join('');
        const occurrence = 1;
        const selections = selectionsFromQuote({ quote, verseObjects, occurrence });
        const selectionsString = selections.map((string) => {
          const selection = JSON.parse(string);
          return selection.text;
        }).join(' ');
        if (selectionsString !== quote) {
          output.push({
            book: bookName,
            chapter: i,
            verse: j,
            quote,
            highlight: selectionsString
          })
        }
      }
    }
    fs.writeJSONSync(`./${bookName}-expected-highlights.json`, output, { spaces: '\t' });
  })
})