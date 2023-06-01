```js
import ReactJson from 'react-json-view';
import { SelectionsContext, SelectionsContextProvider } from "scripture-resources-rcl";

function Component () {
  // - Note how this component is able to access data that is not
  // directly provided to it. The data is stored elsewhere in an
  // enclosing component -- the "context". This component might
  // have multiple contexts. 
  // - Note further that the data is NOT copied to this component; it 
  // is only stored once and when it changes all enclosed components
  // are able to respond, re-render, etc.
  const selectionsContext = React.useContext(SelectionsContext);

  return (
    <div>
      <ReactJson src={selectionsContext} />
    </div>
  );
};


const quote = "אֵ֣לֶּה הַ⁠דְּבָרִ֗ים";
const occurrence = 1;

"1:1": [
    {
        "text": "אֵ֣לֶּה",
        "tag": "w",
        "type": "word",
        "lemma": "אֵלֶּה",
        "strong": "H0428",
        "morph": "He,Pdxcp"
    },
]

const bookObject = {
    "1": {
        "1": {
            "verseObjects": [
                {
                    "text": "אֵ֣לֶּה",
                    "tag": "w",
                    "type": "word",
                    "lemma": "אֵלֶּה",
                    "strong": "H0428",
                    "morph": "He,Pdxcp"
                },
                {
                    "type": "text",
                    "text": " "
                },
                {
                    "text": "הַ⁠דְּבָרִ֗ים",
                    "tag": "w",
                    "type": "word",
                    "lemma": "דָּבָר",
                    "strong": "d:H1697",
                    "morph": "He,Td:Ncmpa"
                },
                {
                    "type": "text",
                    "text": " "
                },
                {
                    "text": "אֲשֶׁ֨ר",
                    "tag": "w",
                    "type": "word",
                    "lemma": "אֲשֶׁר",
                    "strong": "H0834a",
                    "morph": "He,Tr"
                },
                {
                    "type": "text",
                    "text": " "
                },
                {
                    "text": "דִּבֶּ֤ר",
                    "tag": "w",
                    "type": "word",
                    "lemma": "דָבַר",
                    "strong": "H1696",
                    "morph": "He,Vpp3ms"
                },
                {
                    "type": "text",
                    "text": " "
                },
                {
                    "text": "מֹשֶׁה֙",
                    "tag": "w",
                    "type": "word",
                    "lemma": "מֹשֶׁה",
                    "strong": "H4872",
                    "morph": "He,Np"
                },
                {
                    "type": "text",
                    "text": " "
                },
                {
                    "text": "אֶל",
                    "tag": "w",
                    "type": "word",
                    "lemma": "אֵל",
                    "strong": "H0413",
                    "morph": "He,R"
                },
                {
                    "type": "text",
                    "text": "־"
                },
                {
                    "text": "כָּל",
                    "tag": "w",
                    "type": "word",
                    "lemma": "כֹּל",
                    "strong": "H3605",
                    "morph": "He,Ncmsc"
                },
                {
                    "type": "text",
                    "text": "־"
                },
                {
                    "text": "יִשְׂרָאֵ֔ל",
                    "tag": "w",
                    "type": "word",
                    "lemma": "יִשְׂרָאֵל",
                    "strong": "H3478",
                    "morph": "He,Np"
                }
            ]
        },
    },
}

const [ selections, setSelections ] = React.useState([]);

<div style={{height: '250px', overflow: 'auto'}}>
  <SelectionsContextProvider
    selections={selections}
    onSelections={setSelections}
    quote={quote}
    occurrence={occurrence}
    refString={`1:1`}
    bookObject={bookObject}
  >
    <Component />
  </SelectionsContextProvider>
</div>
```
