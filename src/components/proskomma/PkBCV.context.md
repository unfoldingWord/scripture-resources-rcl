```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import hi_rev from '../mocks/hi_aligned_rev.usfm.js';
import bhd_tit from '../mocks/bhd_tit.usfm.js';
import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import eng_tit from '../mocks/en_aligned_tit.usfm.js';
import { ProsKomma } from 'proskomma';
import PkQuery from './PkQuery.context';

// We create an instance of Proskomma
const pk = new ProsKomma();

// We give it some USFM
[
    ["en", "ust", en_psa],
    ["hi", "hiv", hi_rev],
    ["hi", "hiv", hi_tit],
    ["ell", "ugnt", ugnt_tit],
    ["eng", "ult", eng_tit]
].map(rec => {
    const [lang, abbr, content] = rec;
    pk.importDocument(
      lang,
      abbr,
      "usfm",
      content,
      {includeScopes:["chapter", "verse/"]}
    )
  }
);

// We use GraphQL to query it
<div>
  <PkQuery pk={pk} />
</div>

```