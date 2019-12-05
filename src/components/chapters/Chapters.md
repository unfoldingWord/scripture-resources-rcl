```js
import {Chapters} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_tit.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {chapters} = usfmJSON;

<Chapters chapters={chapters} paragraphs showUnsupported />
```