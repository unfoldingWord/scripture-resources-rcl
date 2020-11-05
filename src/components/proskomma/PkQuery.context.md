```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import hi_rev from '../mocks/hi_aligned_rev.usfm.js';
import bhd_tit from '../mocks/bhd_tit.usfm.js';
import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import eng_tit from '../mocks/en_aligned_tit.usfm.js';
import { UWProsKomma } from 'uw-proskomma';
import PkQuery from './PkQuery.context';

// We create an instance of Proskomma using the uW-adapted subClass
const pk = new UWProsKomma();

// We give it some USFM
[
    ["unfoldingWord", "en", "ust", en_psa],
    ["unfoldingWord", "hi", "hiv", hi_rev],
    ["unfoldingWord", "hi", "hiv", hi_tit],
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
      {includeScopes:["chapter", "verse/"]}
    )
  }
);

// We use GraphQL to query it
<div>
  <PkQuery pk={pk} />
</div>

// The default query finds chapter/verse using scopes directly.
// See below for an easier and more flexible way to do this...

```