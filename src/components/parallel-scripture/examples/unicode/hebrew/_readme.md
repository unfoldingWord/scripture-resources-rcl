In these examples, each of the tokens should match, producing a highlighted selection in the aligned texts. **NOTE**: the third token in each example requires lossy normalization.

### Cantillation Marks: Psalm 27:13: לׅׄוּלֵׅׄ֗אׅׄ

According to SBL (2008), the "most complex" example of cantillation marks.

```js
import { ParallelScriptureMock } from '../mocks.js';

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

### Cantillation Marks: Job 7:11

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'אֲֽ֭דַבְּרָה',
  // Orthographically equivalent; but requires unicode normalization.
  'אֲֽ֭דַבְּרָה',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'אֲדַבְּרָה',
];

<ParallelScriptureMock
  bookId='job'
  testament='old'
  chapter={7}
  verse={11}
  selections={quoteVariations}
/>;
```

### Cantillation Marks: 1 Chronicles 13:13

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'וַ⁠יַּטֵּ֕⁠הוּ',
  // Orthographically equivalent; but requires unicode normalization.
  'וַ⁠יַּטֵּ֕⁠הוּ',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'וַ⁠יַּטֵּ⁠הוּ',
];

<ParallelScriptureMock
  bookId='1ch'
  testament='old'
  chapter={13}
  verse={13}
  selections={quoteVariations}
/>;
```

### Meteg: 1 Kings 1:3:

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'וַֽ⁠יִּמְצְא֗וּ',
  // Orthographically equivalent; but requires unicode normalization.
  'וַֽ⁠יִּמְצְא֗וּ',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'וַ⁠יִּמְצְאוּ',
];

<ParallelScriptureMock
  bookId='1ki'
  testament='old'
  chapter={1}
  verse={3}
  selections={quoteVariations}
/>;
```

### Meteg: Left of Vowel: Exodus 20:2

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'עֲבָדִֽים',
  // Orthographically equivalent; but requires unicode normalization.
  'עֲבָדִֽים',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'עֲבָדִים',
];

<ParallelScriptureMock
  bookId='exo'
  testament='old'
  chapter={20}
  verse={2}
  selections={quoteVariations}
/>;
```

### Meteg: Right of Vowel: First Consonant: Exodus 20:4

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'תַֽעֲשֶׂ֨ה־לְ⁠ךָ֥',
  // Orthographically equivalent; but requires unicode normalization.
  'תַֽעֲשֶׂ֨ה־לְךָ֥֣',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'תַעֲשֶׂה־לְ⁠ךָ',
];

<ParallelScriptureMock
  bookId='exo'
  testament='old'
  chapter={20}
  verse={4}
  selections={quoteVariations}
/>;
```

### Meteg: Right of Vowel: Middle of Word: Deuteronomy 22:26

_Note: I'm not sure what the BHS4 reads here, but BHQ reads וְלַֽנַּעֲרָ֙ with preferred reading וְלַנַּעֲרָה._

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'וְלַֽנַּעֲרָה֙',
  // Orthographically equivalent; but requires unicode normalization.
  'וְלַֽנַּעֲרָה֙',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'וְלַנַּעֲרָה',
];

<ParallelScriptureMock
  bookId='deu'
  testament='old'
  chapter={22}
  verse={26}
  selections={quoteVariations}
/>;
```

### Meteg: With _hataf_ Vowel: Psalm 85:7 (EN 85:6)

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'הֲֽ⁠לֹא־אַ֭תָּה',
  // Orthographically equivalent; but requires unicode normalization.
  'הֲֽלֹא־אַ֭תָּה',
  // Omitting the [non-semantic] cantillation requires lossy normalization.
  'הֲלֹא־אַתָּה',
];

<ParallelScriptureMock
  bookId='psa'
  testament='old'
  chapter={85}
  verse={6}
  selections={quoteVariations}
/>;
```

### Masora: Numbers 32:24

**NOTE**: UHB does not currently include Masora.

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'וּ⁠גְדֵרֹ֖ת',
  // Orthographically equivalent; but requires unicode normalization.
  'וּ⁠גְדֵ֯רֹ֖ת',
  // Omitting the [non-semantic] masora & accents requires lossy normalization.
  'וְלַנַּעֲרָ',
];

<ParallelScriptureMock
  bookId='num'
  testament='old'
  chapter={32}
  verse={24}
  selections={quoteVariations}
/>;
```

### Masora: End of Word: Genesis 1:28

```js
import { ParallelScriptureMock } from '../mocks.js';

let quoteVariations = [
  // This encoding matches uhb token. Aligns ok.
  'וַ⁠יְבָ֣רֶךְ',
  // Orthographically equivalent; but requires unicode normalization.
  'וַ⁠יְבָ֣רֶךְ֯',
  // Omitting the [non-semantic] masora & accents requires lossy normalization.
  'וַ⁠יְבָרֶךְ',
];

<ParallelScriptureMock
  bookId='gen'
  testament='old'
  chapter={1}
  verse={28}
  selections={quoteVariations}
/>;
```
