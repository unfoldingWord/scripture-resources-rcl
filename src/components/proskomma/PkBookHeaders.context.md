```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import hi_rev from '../mocks/hi_aligned_rev.usfm.js';
import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import eng_tit from '../mocks/en_aligned_tit.usfm.js';
import { UWProsKomma } from 'uw-proskomma';
import PkBookHeaders from './PkBookHeaders.context';

// We create an instance of Proskomma using the uW-adapted subClass
const pk = new UWProsKomma();

// We give it some USFM
[
    ["unfoldingWord", "eng", "ust", en_psa],
    ["unfoldingWord", "hin", "hiv", hi_rev],
    ["unfoldingWord", "hin", "hiv", hi_tit],
    ["unfoldingWord", "ell", "ugnt", ugnt_tit],
    ["unfoldingWord", "eng", "ult", eng_tit]
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
      {
        includeScopes:["chapter", "verse/"],
        includeGrafts:[]
      }
    )
  }
);

// We use GraphQL to query it
<div>
  <PkBookHeaders
    pk={pk}
    selectorKeys={["org"]}
    selectorValues={["unfoldingWord"]}
    bookCode="TIT"
  />
</div>

```