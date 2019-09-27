### Basic Example

```js
const verseObjects = [
  {
    "type": "text",
    "text": "\nBut I expect to see you soon, and we will speak face to face. "
  },
  {
    "type": "text",
    "text": "\nMay peace be with you.\nThe friends greet you.\n\nGreet the friends by name.\n"
  }
];

<VerseObjects verseObjects={verseObjects} />
```

### Aligned Example

```js
const verseObjects = [
  {
    "text": " ",
    "type": "text"
  },
  {
    "children": [
      {
        "occurrence": "2",
        "occurrences": "2",
        "tag": "w",
        "text": "his",
        "type": "word"
      }
    ],
    "content": "αὐτοῦ",
    "endTag": "zaln-e\\*",
    "lemma": "αὐτός",
    "morph": "Gr,RP,,,3GMS,",
    "occurrence": "2",
    "occurrences": "2",
    "strong": "G08460",
    "tag": "zaln",
    "type": "milestone"
  },
  {
    "text": " ",
    "type": "text"
  },
  {
    "children": [
      {
        "children": [
          {
            "occurrence": "1",
            "occurrences": "1",
            "tag": "w",
            "text": "position",
            "type": "word"
          },
          {
            "text": " ",
            "type": "text"
          },
          {
            "occurrence": "2",
            "occurrences": "2",
            "tag": "w",
            "text": "of",
            "type": "word"
          },
          {
            "text": " ",
            "type": "text"
          },
          {
            "occurrence": "1",
            "occurrences": "1",
            "tag": "w",
            "text": "leadership",
            "type": "word"
          }
        ],
        "content": "ἐπισκοπὴν",
        "endTag": "zaln-e\\*",
        "lemma": "ἐπισκοπή",
        "morph": "Gr,N,,,,,AFS,",
        "occurrence": "1",
        "occurrences": "1",
        "strong": "G19840",
        "tag": "zaln",
        "type": "milestone"
      }
    ],
    "content": "τὴν",
    "endTag": "zaln-e\\*",
    "lemma": "ὁ",
    "morph": "Gr,EA,,,,AFS,",
    "occurrence": "1",
    "occurrences": "1",
    "strong": "G35880",
    "tag": "zaln",
    "type": "milestone"
  },
  {
    "text": ".'\n",
    "type": "text"
  },
  {
    "nextChar": "\n",
    "tag": "m",
    "type": "paragraph"
  },
  {
    "text": "\n",
    "type": "text"
  },
  {
    "content": " \n",
    "tag": "s5",
    "type": "section"
  }
];

<VerseObjects verseObjects={verseObjects} />
```
