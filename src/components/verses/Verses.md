```js
import {Verses} from "./Verses.js";
import ReferenceSelectedContextProvider from '../reference/ReferenceSelectedContext';
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_tit.usfm.js';
import useEffect from 'use-deep-compare-effect';

const usfmJSON = usfmJS.toJSON(usfm);
const {chapters} = usfmJSON;
const chapterKey = '1';
const verses = chapters[chapterKey];

const [referenceSelected, setReferenceSelected] = React.useState({});

useEffect(
  () => {
    if (referenceSelected && referenceSelected.verse)
    {
      alert(JSON.stringify(referenceSelected))
    }
  }
,[referenceSelected]);

<ReferenceSelectedContextProvider referenceSelected={referenceSelected} onReferenceSelected={setReferenceSelected}>
    <Verses verses={verses} paragraphs showUnsupported />
</ReferenceSelectedContextProvider>
```