```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import hi_rev from '../mocks/hi_aligned_rev.usfm.js';
import hi_tit from '../mocks/hi_aligned_tit.usfm.js';
import { UWProsKomma } from 'uw-proskomma';
import PkBase from './PkBase';

// PkBase provides basic (async) query functionality.
// It should be subclassed to do something more useful.

// We create an instance of Proskomma using the uW-adapted subClass
const pk = new UWProsKomma();

// We give it some USFM
[
    ["unfoldingWord", "en", "ust", en_psa],
    ["unfoldingWord", "hi", "hiv", hi_rev],
    ["unfoldingWord", "hi", "hiv", hi_tit]
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

// We display basic status information by introspection
<div>
    <PkBase pk={pk} />
</div>
```