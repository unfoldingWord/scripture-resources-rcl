
### Greek Accent Marks

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches ugt token. Aligns ok.
  'καὶ μὴ',
  // Stripping accents matches only after destructive normalization:
  'και μη',
  // Different (incorrect) accents matches only after destructive normalization:
  'καί μή',
];

<ParallelScriptureMock
  bookId='3jn'
  testament='new'
  chapter={1}
  verse={10}
  selections={quoteVariations}
/>;
```