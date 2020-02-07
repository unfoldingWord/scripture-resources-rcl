
```js
import {TextField} from '@material-ui/core';
import {ParallelScripture, withResources} from "scripture-resources-rcl";

const ParallelScriptureWithResources = withResources(ParallelScripture);

function Component({
  config,
  resourceLinks,
}) {
  const [bookId, setBookId] = React.useState("3jn");
  const [chapter, setChapter] = React.useState(1);
  const [verse, setVerse] = React.useState(10);
  const [quote, setQuote] = React.useState("καὶ");
  const [occurrence, setOccurrence] = React.useState(-1);
  const reference = { bookId, chapter, verse };
  return (
    <>
      <form noValidate autoComplete="off">
        <div style={{padding: '1em 0'}}>
          <TextField
            id="bookId"
            label="BookId"
            variant="outlined"
            defaultValue={bookId}
            onChange={(event) => setBookId(event.target.value)}
          />
          <TextField
            id="chapter"
            label="Chapter"
            variant="outlined"
            defaultValue={chapter}
            onChange={(event) => setChapter(parseInt(event.target.value))}
          />
          <TextField
            id="verse"
            label="Verse"
            variant="outlined"
            defaultValue={verse}
            onChange={(event) => setVerse(parseInt(event.target.value))}
          />
        </div><div style={{padding: '1em 0'}}>
          <TextField
            id="quote"
            label="Quote"
            variant="outlined"
            defaultValue={quote}
            onChange={(event) => setQuote(event.target.value)}
          />
          <TextField
            id="occurrence"
            label="Occurrence"
            variant="outlined"
            defaultValue={occurrence}
            onChange={(event) => setOccurrence(parseInt(event.target.value))}
          />
        </div>
      </form>
      <ParallelScriptureWithResources
        resourceLinks={resourceLinks}
        config={config}
        reference={reference}
        quote={quote}
        onQuote={setQuote}
        occurrence={occurrence}
        height='250px'
      />
      <p>Quote: {quote}</p>
      <p>Occurrence: {occurrence}</p>
    </>
  );
}
const config = {server: 'https://git.door43.org'};
const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/master',
  'unfoldingWord/en/ult/v5',
  'unfoldingWord/en/ust/v5',
];
// const reference = {bookId: 'rut', chapter: 1, verse: 1};
// const resourceLinks = [
//   'unfoldingWord/hbo/uhb/master',
//   'unfoldingWord/en/ult/master',
//   'unfoldingWord/en/ust/master',
// ];

<Component config={config} resourceLinks={resourceLinks} />
```
