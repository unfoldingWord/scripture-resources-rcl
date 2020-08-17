### Example 1: from SBL Hebrew Font User Manual 1.51 (1 Ch. 13:13)

https://www.sbl-site.org/Fonts/SBLHebrewUserManual1.5x.pdf

Each of these _characters_ have the same orthography,
but each are, in fact, a different combintation of _glphys_:

```js
import { charactersExample1 } from './mocks.js';

<ul>
  {charactersExample1.map((character) => (
    <li>{character}</li>
  ))}
</ul>;
```

Here, we loop, comparing each of the strings to element `[0]`.
**NOTE:**: none of the strings are `===` to each other.

```js
import { charactersExample1 } from './mocks.js';

<ul>
  {charactersExample1.map((character) => (
    <li>{charactersExample1[0] === character ? 'Match' : 'No match!'}</li>
  ))}
</ul>;
```

Here we loop and compare _normalized_ strings.
Use the built-in Javascript `String::normalize()` method with `form`=`'NFKC'` (_Compatibility Decomposition, followed by Canonical Composition_). The end result is a _composition_ of the Unicode glyphs.

**NOTE:** In this example, each of the normalized strings are `===` to the other normalized strings.

See: Docs for `String::normalize()`:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize

See: `@klappy`'s `tack` project.

```js
import { charactersExample1 } from './mocks.js';

const normalizationForm = 'NFKC';
<ul>
  {charactersExample1.map((character) => (
    <li>
      {charactersExample1[0].normalize(normalizationForm) ==
      character.normalize(normalizationForm)
        ? 'Match'
        : 'No match!'}
    </li>
  ))}
</ul>;
```
