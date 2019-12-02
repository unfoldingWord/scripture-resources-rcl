withSelections example:

```js
import ReactJson from 'react-json-view';
function Component ({
  value,
}) {
  return (
    <ReactJson src={value.selections} />
  )
}
const ComponentWithSelections = WithSelections(Component);

const quote = "ὁ λόγος,";
const occurrence = 1;
const verseObjects = [
  {
    "text": "ἐν",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ἀρχῇ",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ἦν",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ὁ",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "λόγος",
    "type": "word",
  },
  {
    "type": "text",
    "text": ", "
  },
  {
    "text": "καὶ",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ὁ",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "λόγος",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ἦν",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "πρὸς",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "τὸν",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "Θεόν",
    "type": "word",
  },
  {
    "type": "text",
    "text": ", "
  },
  {
    "text": "καὶ",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "Θεὸς",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ἦν",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "ὁ",
    "type": "word",
  },
  {
    "type": "text",
    "text": " "
  },
  {
    "text": "λόγος",
    "type": "word",
  },
  {
    "type": "text",
    "text": ".\n\n"
  }
];
<ComponentWithSelections quote={quote} occurrence={occurrence} verseObjects={verseObjects} />
```