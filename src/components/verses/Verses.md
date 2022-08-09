```js
import {Verses} from "scripture-resources-rcl";
import ReferenceSelectedContextProvider from '../reference/ReferenceSelectedContext';
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_tit.usfm.js';
import useEffect from 'use-deep-compare-effect';

const usfmJSON = usfmJS.toJSON(usfm);
const {chapters} = usfmJSON;
const chapterKey = '1';
const testMoreVerses = chapters["2"];
const adaptedKeysObj = {}
Object.keys(testMoreVerses).forEach( key => {
  const newKey = "2:"+key
  adaptedKeysObj[newKey] = testMoreVerses[key]
})
const verses = {...chapters[chapterKey], ...adaptedKeysObj};

console.log(verses)
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