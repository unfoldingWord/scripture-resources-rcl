Test H

### Psalm 27:13: לׅׄוּלֵׅׄ֗אׅׄ

In this example, each of the tokens should match, producing a highlighted selection in the aligned texts. **NOTE**: the third example requires lossy normalization.

```js
import { ParallelScriptureMock } from './mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'לׅׄוּלֵׅׄ֗אׅׄ',
  // Orthographically equivalent; but requires unicode normalization.
  'לׅׄוּלֵׅ֗ׄאׅׄ',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'לוּלֵא',
];

<ParallelScriptureMock
  bookId='psa'
  testament='old'
  chapter={27}
  verse={13}
  selections={quoteVariations}
/>;
```
