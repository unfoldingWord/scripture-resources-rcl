```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import hi_rev from '../mocks/hi_aligned_rev.usfm.js';
import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import eng_tit from '../mocks/en_aligned_tit.usfm.js';
import { ProsKomma } from 'proskomma';
import PkBCV from './PkBCV.context';

// We create an instance of Proskomma
const pk = new ProsKomma();

// We give it some USFM
[
    ["eng", "ust", en_psa],
    ["hin", "hiv", hi_rev],
    ["hin", "hiv", hi_tit],
    ["ell", "ugnt", ugnt_tit],
    ["eng", "ult", eng_tit]
].map(rec => {
    const [lang, abbr, content] = rec;
    pk.importDocument(
      {
        lang: lang,
        abbr: abbr
      },
      "usfm",
      content,
      {
        includeScopes:["chapter", "verse/"],
        includeGrafts:[]
      }
    )
  }
);

// We use GraphQL to query it
<div>
  <PkBCV pk={pk} />
</div>

```