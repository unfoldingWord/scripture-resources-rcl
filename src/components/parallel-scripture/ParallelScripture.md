```js
import {ParallelScripture} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';

import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import en_aligned_tit from '../mocks/en_aligned_tit.usfm.js';
import hi_aligned_tit from '../mocks/hi_aligned_tit.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import bhd_tit from '../mocks/bhd_tit.usfm.js';

const titles = [
  'UGNT - Greek',
  'English - ULT (aligned)',
  'Hindi - IRV (aligned)',
  'Hindi - ULB',
  'Bhadrawahi - ULB',
];

const books = [
  usfmJS.toJSON(ugnt_tit),
  usfmJS.toJSON(en_aligned_tit),
  usfmJS.toJSON(hi_aligned_tit),
  usfmJS.toJSON(hi_tit),
  usfmJS.toJSON(bhd_tit),
];

const reference = {
  bookId: 'tit',
  chapter: 1,
  verse: 2,
};

const [quote, setQuote] = React.useState();
const quoteVerseObjects = books[0].chapters[reference.chapter][reference.verse].verseObjects;

<>
  <p>Quote: {quote}</p>
  <div style={{border: '1px #ebf1f3 solid'}}>
    <ParallelScripture
      titles={titles}
      books={books}
      height='250px'
      title='Titus'
      reference={reference}
      quoteVerseObjects={quoteVerseObjects}
      onQuote={setQuote}
    />
  </div>
</>
```
