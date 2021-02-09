## Large Book for testing performance

```js
import useEffect from 'use-deep-compare-effect';

import {Book} from "scripture-resources-rcl";

import {ReferenceSelectedContextProvider} from '../reference/ReferenceSelectedContext';

import usfmJS from 'usfm-js';
import usfm from '../mocks/en_psa.usfm.js';

const book = usfmJS.toJSON(usfm);

const reference = {
  bookId: 'psa',
};

const [referenceSelected, setReferenceSelected] = React.useState({});

useEffect(
  () => {
    if (referenceSelected && referenceSelected.verse)
    {
      alert(JSON.stringify(referenceSelected))
    }
  }
,[referenceSelected]);

<div style={{height: '300px', overflow: 'scroll'}}>
  <ReferenceSelectedContextProvider referenceSelected={referenceSelected} onReferenceSelected={setReferenceSelected}>
    <Book book={book} paragraphs showUnsupported reference={reference} />
  </ReferenceSelectedContextProvider>
</div>
```

## Aligned Example

```js
import {Book} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_aligned_rev.usfm.js';

const book = usfmJS.toJSON(usfm);

<div style={{height: '300px', overflow: 'scroll'}}>
  <Book book={book} paragraphs showUnsupported />
</div>
```

## Hebrew Example

```js
import {Book} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';
import usfm from '../mocks/uhb_rut.usfm.js';

const book = usfmJS.toJSON(usfm);
const direction = 'rtl';

<div style={{height: '300px', overflow: 'scroll'}}>
  <Book book={book} showUnsupported direction={direction} reference={{bookId: 'rut'}} />
</div>
```