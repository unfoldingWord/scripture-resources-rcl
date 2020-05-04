```js
import ReactJson from 'react-json-view';
import { SelectionsContext, SelectionsContextProvider } from "scripture-resources-rcl";

function Component () {
  const selectionsContext = React.useContext(SelectionsContext);

  return (
    <div>
      <ReactJson src={selectionsContext} />
    </div>
  );
};


const quote = "ὁ λόγος,";
//const onSelections = () => console.log("hello");
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

const props = {
  quote,
  occurrence,
  verseObjects,
};


<div style={{height: '250px', overflow: 'auto'}}>
  <SelectionsContextProvider value={{...props}}>
    <Component />
  </SelectionsContextProvider>
</div>
```
