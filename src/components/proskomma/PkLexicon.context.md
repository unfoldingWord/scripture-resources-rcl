```
import React, {useState} from 'react';
import ReactJson from 'react-json-view';
import lexicon from './dodson_short.js';
import { UWProsKomma } from 'uw-proskomma';
import PkQuery from './PkQuery.context';

// We create an instance of Proskomma using the uW-adapted subClass
const pk = new UWProsKomma();

// We give it a lexicon document
// This one is abbreviated, use dodson.js for a complete NT lexicon
[
    ["proskomma", "en", "lexicon", lexicon]
].map(rec => {
    const [org, lang, abbr, content] = rec;
    pk.importDocument(
      {
        org: org,
        lang: lang,
        abbr: abbr
      },
      "lexicon",
      content,
      {}
    )
  }
);

// We use GraphQL to query it
<div>
  <PkLexicon pk={pk} />
</div>

```