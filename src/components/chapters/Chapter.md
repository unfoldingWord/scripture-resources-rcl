```js
import {Chapter} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_tit.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {chapters} = usfmJSON;
const chapterKey = '1';
const chapter = chapters[chapterKey];

<Chapter chapterKey={chapterKey} chapter={chapter} paragraphs showUnsupported />
```