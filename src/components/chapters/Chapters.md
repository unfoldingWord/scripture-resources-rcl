```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/hi_tit.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {chapters} = usfmJSON;

<Chapters chapters={chapters} paragraphs showUnsupported />
```