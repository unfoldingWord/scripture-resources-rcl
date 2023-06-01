### Using Contexts

To see highlighting appear, change the `-1` occurrence to 1;
then click or tab out of field.

To add resources to the RCL, please see the following sample paths:  
`Door43-Catalog/hi/ulb/master/php`  
`STR/hi/irv/master/php`  
To add resources to the app, please omit bookId from the end:  
`Door43-Catalog/hi/ulb/master`  
`STR/hi/irv/master`

```js
import { TextField } from '@material-ui/core';
import {
  ParallelScripture,
  ResourcesContext,
  ResourcesContextProvider,
} from 'scripture-resources-rcl';
import useEffect from 'use-deep-compare-effect';

const bcvQuery = {
  book: {
    "psa": {
      ch: {
        6: { 
          v: { 
            8: { },
            9: { },
          }
        }
      },
    },
  },
}
const _bookId = "psa"

function Component() {
  const [bookId, setBookId] = React.useState(_bookId);
  const [quote, setQuote] = React.useState("יְ֝הוָ֗ה & יְ֭הוָה & יְ֝הוָ֗ה");
  const [occurrence, setOccurrence] = React.useState(-1);

  const form = React.useMemo(
    () => (
      <form noValidate autoComplete="off">
        <div style={{ padding: '1em 0' }}>
          <TextField
            id="bookId"
            label="BookId"
            variant="outlined"
            defaultValue={bookId}
            onBlur={(event) => setBookId(event.target.value)}
          />
        </div>
        <div style={{ padding: '1em 0' }}>
          <TextField
            id="quote"
            label="Quote"
            variant="outlined"
            defaultValue={quote}
            onBlur={(event) => setQuote(event.target.value)}
          />
          <TextField
            id="occurrence"
            label="Occurrence"
            variant="outlined"
            defaultValue={occurrence}
            onBlur={(event) => setOccurrence(parseInt(event.target.value))}
          />
        </div>
      </form>
    ),
    [bookId, quote, occurrence]
  );

  const component = React.useMemo(() => {
    const reference = { bookId, chapter: 6, verse: "8-9", bcvQuery };
    return (
      <ParallelScripture
        reference={reference}
        quote={quote}
        onQuote={setQuote}
        occurrence={occurrence}
        height="250px"
      />
    );
  }, [bookId, quote, occurrence]);

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

const defaultResourceLinks = [
  'unfoldingWord/hbo/uhb/master/psa',
  'unfoldingWord/en/ult/v5/psa',
  'unfoldingWord/en/ust/v5/psa',
  'https://git.door43.org/unfoldingWord/en_ust/src/branch/master',
];

const _resourceLinks = [...defaultResourceLinks];


const reference = { bookId: 'psa', chapter: 6, verse: "8-9", bcvQuery };

const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
const [resources, setResources] = React.useState([]);
<ResourcesContextProvider
  reference={reference}
  resourceLinks={resourceLinks}
  defaultResourceLinks={defaultResourceLinks}
  onResourceLinks={setResourceLinks}
  resources={resources}
  onResources={setResources}
  config={config}
>
  <Component />
</ResourcesContextProvider>;
```

```js
import { TextField } from "@material-ui/core";
import {
  ParallelScripture,
  ResourcesContext,
  ResourcesContextProvider,
} from "scripture-resources-rcl";
import useEffect from "use-deep-compare-effect";

function Component() {
  const [bookId, setBookId] = React.useState("psa");
  const [quote, setQuote] = React.useState("יְ֝הוָ֗ה & יְ֭הוָה & יְ֝הוָ֗ה");
  const [occurrence, setOccurrence] = React.useState(-1);

  const form = React.useMemo(
    () => (
      <form noValidate autoComplete="off">
        <div style={{ padding: "1em 0" }}>
          <TextField
            id="bookId"
            label="BookId"
            variant="outlined"
            defaultValue={bookId}
            onBlur={(event) => setBookId(event.target.value)}
          />
        </div>
        <div style={{ padding: "1em 0" }}>
          <TextField
            id="quote"
            label="Quote"
            variant="outlined"
            defaultValue={quote}
            onBlur={(event) => setQuote(event.target.value)}
          />
          <TextField
            id="occurrence"
            label="Occurrence"
            variant="outlined"
            defaultValue={occurrence}
            onBlur={(event) => setOccurrence(parseInt(event.target.value))}
          />
        </div>
      </form>
    ),
    [bookId, quote, occurrence]
  );

  const bcvQuery = {
    book: {
      "psa": {
        ch: {
          6: { 
            v: { 
                8: {},
                9: {},
              }
            },
        },
      },
    },
  }

  const component = React.useMemo(() => {
    const reference = { bookId, chapter: 6, verse: "8-9", bcvQuery };
    return (
      <ParallelScripture
        reference={reference}
        quote={quote}
        onQuote={setQuote}
        occurrence={occurrence}
        height="250px"
      />
    );
  }, [bookId, quote, occurrence]);

  return (
    <>
      {form}
      {component}
      <p>Quote: {quote}</p>
      <p>Occurrence: {occurrence}</p>
    </>
  );
}
const config = { server: "https://git.door43.org" };

const defaultResourceLinks = [
  "unfoldingWord/el-x-koine/ugnt/master/psa",
  "unfoldingWord/en/ult/v5/psa",
  "unfoldingWord/en/ust/v5/psa",
  "ru_gl/ru/rlob/master/psa",
  "https://git.door43.org/unfoldingWord/en_ust/src/branch/master",
];

const _resourceLinks = [...defaultResourceLinks];

const bcvQuery = {
  book: {
    "psa": {
      ch: {
        6: { 
          v: { 
              8: {},
              9: {}
            }
          },
      },
    },
  },
}

const reference = { bookId: "psa", chapter: 6, verse: "8-9", bcvQuery };
// const resourceLinks = [
//   'unfoldingWord/hbo/uhb/master',
//   'unfoldingWord/en/ult/master',
//   'unfoldingWord/en/ust/master',
// ];

const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
const [resources, setResources] = React.useState([]);
<ResourcesContextProvider
  reference={reference}
  resourceLinks={resourceLinks}
  defaultResourceLinks={defaultResourceLinks}
  onResourceLinks={setResourceLinks}
  resources={resources}
  onResources={setResources}
  config={config}
>
  <Component />
</ResourcesContextProvider>;
```
