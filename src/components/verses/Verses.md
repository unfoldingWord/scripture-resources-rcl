```js
import {Verses} from "scripture-resources-rcl";
import ReferenceSelectedContextProvider from '../reference/ReferenceSelectedContext';
import usfmJS from 'usfm-js';
import usfm from '../mocks/hi_tit.usfm.js';
import useEffect from 'use-deep-compare-effect';
import useBcvQuery from '../resources/useBcvQuery.js';

const query = {
  title: "unfoldingWord® Simplified Text",
  version: "38",
  resourceLink: "unfoldingWord/en/ust/master",
  server: "https://git.door43.org",
  owner: "unfoldingWord",
  languageId: "en",
  projectId: "ust",
  branch: "master",
  book: {
    tit: {
      ch: {
        2: { v: { 15: { verseObjects: [] } } },
        3: { v: { 1: { verseObjects: [] } } },
      },
    },
  },
}

const options = {
  cache: {
    maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
  },
}
const result3 = useBcvQuery(query,options);
const bookResult = result3.state && result3.state.resultTree && result3.state.resultTree.book;
const vObjArray = [];
if (bookResult) {
  Object.entries(bookResult).forEach(([bookKey, { ch }]) => {
    Object.entries(ch).forEach(([chNum, { v }]) => {
      Object.entries(v).forEach(([vNum, { verseObjects }]) => {
        if (verseObjects && verseObjects.length>0) {
          vObjArray.push({ bookKey, chNum, vNum, verseObjects });
        }
      })
    })
  })
}
console.log(vObjArray)



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