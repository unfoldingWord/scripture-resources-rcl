### Using Contexts

To see highlighting appear, change the `-1` occurrence to 1;
then click or tab out of field.

```js
import { TextField } from '@material-ui/core';
import {
  ParallelScripture,
  ResourcesContext,
  ResourcesContextProvider,
} from 'scripture-resources-rcl';
import useEffect from 'use-deep-compare-effect';

function Component() {
  const [bookId, setBookId] = React.useState('act');
  const [chapter, setChapter] = React.useState(1);
  const [verse, setVerse] = React.useState(24);
  const [quote, setQuote] = React.useState('καὶ…Κύριε');
  const [occurrence, setOccurrence] = React.useState(-1);

  const form = React.useMemo(
    () => (
      <form noValidate autoComplete='off'>
        <div style={{ padding: '1em 0' }}>
          <TextField
            id='bookId'
            label='BookId'
            variant='outlined'
            defaultValue={bookId}
            onBlur={(event) => setBookId(event.target.value)}
          />
          <TextField
            id='chapter'
            label='Chapter'
            variant='outlined'
            defaultValue={chapter}
            onBlur={(event) => setChapter(parseInt(event.target.value))}
          />
          <TextField
            id='verse'
            label='Verse'
            variant='outlined'
            defaultValue={verse}
            onBlur={(event) => setVerse(parseInt(event.target.value))}
          />
        </div>
        <div style={{ padding: '1em 0' }}>
          <TextField
            id='quote'
            label='Quote'
            variant='outlined'
            defaultValue={quote}
            onBlur={(event) => setQuote(event.target.value)}
          />
          <TextField
            id='occurrence'
            label='Occurrence'
            variant='outlined'
            defaultValue={occurrence}
            onBlur={(event) => setOccurrence(parseInt(event.target.value))}
          />
        </div>
      </form>
    ),
    [bookId, chapter, verse, quote, occurrence]
  );

  const component = React.useMemo(() => {
    const reference = { bookId, chapter, verse };
    return (
      <ParallelScripture
        reference={reference}
        quote={quote}
        onQuote={setQuote}
        occurrence={occurrence}
        height='250px'
      />
    );
  }, [bookId, chapter, verse, quote, occurrence]);

  return (
    <>
      {form}
      {component}
      <p>Quote: {quote}</p>
      <p>Occurrence: {occurrence}</p>
    </>
  );
}
const config = { server: 'https://git.door43.org' };
const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/master/act',
  'unfoldingWord/en/ult/v5/act',
  'unfoldingWord/en/ust/v5/act',
];
const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
// const reference = {bookId: 'rut', chapter: 1, verse: 1};
// const resourceLinks = [
//   'unfoldingWord/hbo/uhb/master',
//   'unfoldingWord/en/ult/master',
//   'unfoldingWord/en/ust/master',
// ];
const [resources, setResources] = React.useState([]);

<ResourcesContextProvider
  resourceLinks={resourceLinks}
  onResourceLinks={setResourceLinks}
  resources={resources}
  onResources={setResources}
  config={config}
>
  <Component />
</ResourcesContextProvider>;
```
