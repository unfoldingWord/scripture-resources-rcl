```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/en_psa.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {headers, chapters} = usfmJSON;

<Book headers={headers} chapters={chapters} inline={true} />
```