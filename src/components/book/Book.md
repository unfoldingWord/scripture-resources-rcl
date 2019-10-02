## Large Book for testing performance

```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/en_psa.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {headers, chapters} = usfmJSON;

let element;
<div style={{height: '300px', overflow: 'scroll'}}>
  <Book headers={headers} chapters={chapters} containmentElement={element} paragraphs showUnsupported />
</div>
```

## Aligned Example

```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/en_rev.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {headers, chapters} = usfmJSON;

<div style={{height: '300px', overflow: 'scroll'}}>
  <Book headers={headers} chapters={chapters} paragraphs showUnsupported />
</div>
```

## Hebrew Example

```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/uhb_rut.usfm.js';

const usfmJSON = usfmJS.toJSON(usfm);
const {headers, chapters} = usfmJSON;
const direction = 'rtl';

<div style={{height: '300px', overflow: 'scroll'}}>
  <Book headers={headers} chapters={chapters} paragraphs showUnsupported direction={direction} />
</div>
```