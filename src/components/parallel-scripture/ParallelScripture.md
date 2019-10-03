```js
import {ParallelScripture} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';

import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import en_aligned_tit from '../mocks/en_aligned_tit.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import hi_aligned_tit from '../mocks/hi_aligned_tit.usfm.js';
import bhd_tit from '../mocks/bhd_tit.usfm.js';

const titles = [
  'UGNT - Greek',
  'English - ULT',
  'Hindi - ULB',
  'Hindi - IRV',
  'Bhadrawahi - ULB',
];

const books = [
  usfmJS.toJSON(ugnt_tit),
  usfmJS.toJSON(en_aligned_tit),
  usfmJS.toJSON(hi_tit),
  usfmJS.toJSON(hi_aligned_tit),
  usfmJS.toJSON(bhd_tit),
];


<ParallelScripture titles={titles} books={books} height='250px' title='Titus' disableWordPopover />
```