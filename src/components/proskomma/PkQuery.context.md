```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import en_psa from '../mocks/en_psa.usfm.js';
import hi_rev from '../mocks/hi_aligned_rev.usfm.js';
import hi_tit from '../mocks/hi_aligned_tit.usfm.js';
import { ProsKomma } from 'proskomma';
import PkQuery from './PkQuery.context';

// We create an instance of Proskomma
const pk = new ProsKomma();

// We give it some USFM
[
    ["en", "ust", en_psa],
    ["hi", "hiv", hi_rev],
    ["hi", "hiv", hi_tit]
].map(rec => {
    const [lang, abbr, content] = rec;
    pk.importDocument(
      lang,
      abbr,
      "usfm",
      content,
      {}
    )
  }
);

// We use GraphQL to query it
<div>
  <PkQuery pk={pk} />
</div>

// Try
// { documents { sequences { blocks { bs { label } text } } } }
// and
// { documents { sequences { blocks { c { ... on Token { itemType subType chars } ... on Scope { itemType label } ... on Graft { itemType subType sequenceId } } } } } }
// and
// { documents { usfmId: header(id:"id") mainSequence { blocksForScopes(scopes:["chapter/150", "verse/1"]){ text } } } }

```