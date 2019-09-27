```js
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

<Verse verseKey={verseKey} verseObjects={verseObjects} />
```