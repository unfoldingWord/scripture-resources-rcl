```js
import {BookHeaders} from "../../";
import usfmJS from 'usfm-js';
import usfm from '../mocks/en_psa.usfm.js';

const {headers} = usfmJS.toJSON(usfm);

<BookHeaders headers={headers} showUnsupported />
```