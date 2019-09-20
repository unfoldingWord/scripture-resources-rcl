
The VerseObject can accept any type of VerseObject and then renders the appropriate component.

The Types are:

- `text`: renders as TextObject
- `quote`: renders as TextObject
- `milestone`: renders as MilestoneObject
- `word`: renders as WordObject or AlignedWordsObject
- `section`: renders as an empty span
- `paragraph`: renders as an empty span
- `footnote`: renders as `<sup>f</sup>`

### Minimal Example

```js
const verseObject = {type:'text', text: 'Jesus'};
<VerseObject verseObject={verseObject} />
```

### Original Languages

```js
const verseObject = {
  "text":"ἰδὼν",
  "tag":"w",
  "type":"word",
  "lemma":"ὁράω",
  "strong":"G37080",
  "morph":"Gr,V,PAA,NMS,"
};
<VerseObject verseObject={verseObject} />
```