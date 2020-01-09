
```js
import {TextField} from '@material-ui/core';
import {ParallelScripture, withResources} from "scripture-resources-rcl";

const ParallelScriptureWithResources = withResources(ParallelScripture);

function Component({
  config,
  reference,
  resourceLinks,
}) {
  const [quote, setQuote] = React.useState("λόγος");
  const [occurrence, setOccurrence] = React.useState(1);
  return (
    <>
      <p>Quote: {quote}</p>
      <p>Occurrence: {occurrence}</p>
      <ParallelScriptureWithResources
        resourceLinks={resourceLinks}
        config={config}
        reference={reference}
        quote={quote}
        onQuote={setQuote}
        occurrence={occurrence}
        height='250px'
      />
      <form noValidate autoComplete="off">
        <TextField
          id="quote"
          label="Quote"
          variant="outlined"
          defaultValue={quote}
          onChange={(event) => {
            setQuote(event.target.value);
          }}
        />
        <TextField
          id="occurrence"
          label="Occurrence"
          variant="outlined"
          defaultValue={occurrence}
          onChange={(event) => {
            setOccurrence(parseInt(event.target.value));
          }}
        />
      </form>
    </>
  );
}
const config = {server: 'https://git.door43.org'};
// const reference = {bookId: 'jhn', chapter: 1, verse: 1};
// const resourceLinks = [
//   'unfoldingWord/el-x-koine/ugnt/v0.8',
//   'unfoldingWord/en/ult/v5',
//   'unfoldingWord/en/ust/v5',
// ];
const reference = {bookId: 'rut', chapter: 1, verse: 1};
const resourceLinks = [
  'unfoldingWord/hbo/uhb/master',
  'unfoldingWord/en/ult/master',
  'unfoldingWord/en/ust/master',
];

<Component config={config} reference={reference} resourceLinks={resourceLinks} />
```
