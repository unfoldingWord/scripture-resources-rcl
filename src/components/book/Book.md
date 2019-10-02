## Large Book for testing performance

```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/en_psa.usfm.js';

const book = usfmJS.toJSON(usfm);

let element;
<div style={{height: '300px', overflow: 'scroll'}}>
  <Book book={book} containmentElement={element} paragraphs showUnsupported />
</div>
```

## Aligned Example

```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/en_rev.usfm.js';

const book = usfmJS.toJSON(usfm);

<div style={{height: '300px', overflow: 'scroll'}}>
  <Book book={book} paragraphs showUnsupported />
</div>
```

## Hebrew Example

```js
var usfmJS = require('usfm-js');
import usfm from '../mocks/uhb_rut.usfm.js';

const book = usfmJS.toJSON(usfm);
const direction = 'rtl';

<div style={{height: '300px', overflow: 'scroll'}}>
  <Book book={book} showUnsupported direction={direction} />
</div>
```