```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import eng_tit from '../mocks/en_aligned_tit.usfm.js';
import { UWProsKomma } from 'uw-proskomma';
import PkReferenceText from './PkReferenceText.context';

// We create an instance of Proskomma using the uW-adapted subClass
const pk = new UWProsKomma();

// We give it some USFM
[
    ["unfoldingWord", "en", "ust", en_psa],
    ["unfoldingWord", "grc", "ugnt", ugnt_tit],
    ["unfoldingWord", "en", "ult", eng_tit]
].map(rec => {
    const [org, lang, abbr, content] = rec;
    pk.importDocument(
      {
        org: org,
        lang: lang,
        abbr: abbr
      },
      "usfm",
      content,
      {}
    )
  }
);

// We use GraphQL to query it
<div>
  <PkReferenceText pk={pk} />
</div>

// Note that this implementation is vulnerable to injection attacks
// ie you should usually sanity-check user-supplied data before
// inserting it into queries
```