```js
import {Verses} from "../../";
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_tit.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {chapters} = usfmJSON;
const chapterKey = '1';
const verses = chapters[chapterKey];

<Verses verses={verses} paragraphs showUnsupported />
```