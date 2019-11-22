
```js
import {TextField} from '@material-ui/core';
import {ParallelScripture, withResources} from "scripture-resources-rcl";

const ParallelScriptureWithResources = withResources(ParallelScripture);

function Component({
  config,
  reference,
  resourceLinks,
}) {
  const [quote, setQuote] = React.useState("");
  return (
    <>
      <p>Quote: {quote}</p>
      <ParallelScriptureWithResources
        resourceLinks={resourceLinks}
        config={config}
        reference={reference}
        quote={quote}
        onQuote={setQuote}
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
      </form>
    </>
  );
}
const config = {server: 'https://git.door43.org'};
const reference = {bookId: 'jhn', chapter: 1, verse: 1};
const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/v0.8',
  'unfoldingWord/en/ult/v5',
  'unfoldingWord/en/ust/v5',
];

<Component config={config} reference={reference} resourceLinks={resourceLinks} />
```
