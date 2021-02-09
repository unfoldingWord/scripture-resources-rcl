```js
import ReferenceSelectedContextProvider from '../reference/ReferenceSelectedContext';
import useEffect from 'use-deep-compare-effect';

const verseKey = '9';
const verseObjects = [
  {
    "text": "It is better to live on a corner of the roof\n",
    "type": "text"
  },
  {
    "tag": "q",
    "type": "quote",
    "text": " than in a house shared with a quarrelsome wife.\n"
  },
  {
    "tag": "q",
    "type": "quote",
    "nextChar": "\n"
  }
];

const reference = {
  bookId: 'prov',
  chapter: 21,
};

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
  <Verse verseKey={verseKey} verseObjects={verseObjects} reference={reference} showUnsupported />
</ReferenceSelectedContextProvider>
```