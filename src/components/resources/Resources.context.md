### useResources

*What is a custom hook?*  Here are some common characteristics based
on how this package uses them.

1. A custom hook will be named beginning with `use`, following normal hook naming conventions.
1. A custom hook will take a number of properties, which are used to initialize one or more
built-in React `useEffect()` hooks.
1. Additional processing may also be performed.
1. Finally the funtion will return an object with two properties:
- state
- actions
1. `actions` will be one or more ways to delete, modify, or add to the state value(s).
1. Once an actions updates the state, then the `useEffect()` hooks inside the custom hook
will cause an update to data. These updates are made by `useState()` functions. Thus, 
managing the life cycle of the application data.

A custom hook is used inside a React Context. This will make the data updates 
available to all components below the context in the component tree. These lower
level components may subscribe to the context data in order update UI data (using stil
more `useState()` and `useEffect()` hooks).

This technique ensures that data is only stored and maintained in one place, but yet 
made available to any rendering component that requires it. *Note that rendering component
may udpate the data using the actions available via the context which is managing the data.*


```js
import { useContext } from 'react';
import { Paper } from '@material-ui/core';
import ReactJson from 'react-json-view';

import { useResources, ResourcesContextProvider, ResourcesContext } from 'scripture-resources-rcl';

function Component( { stateActions }) {
  return (
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <pre>
          <ReactJson src={stateActions} />
        </pre>
      </Paper>
    </>
  );
};



const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
  },
};

const reference = {bookId: 'jhn', chapter: 1, verse: 1};
const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/v0.8',
  'unfoldingWord/en/ult/v5',
  'unfoldingWord/en/ust/v5',
];
const [ resources, setResources ] = React.useState([]);

const resourceStateActions = useResources({
    resources: resources,
    resourceLinks: resourceLinks,
    reference: reference,
    config: config,
    onResources: setResources,
});

<div style={{height: '250px', overflow: 'auto'}}>
    <Component stateActions={resourceStateActions} />
</div>

```

### Resources Context Provider - A Simple Example

```js
import {Paper} from '@material-ui/core';
import ReactJson from 'react-json-view';
import { ResourcesContext, ResourcesContextProvider } from "scripture-resources-rcl";
import useEffect from 'use-deep-compare-effect';

function Component () {
  // - Note how this component is able to access data that is not
  // directly provided to it. The data is stored elsewhere in an
  // enclosing component -- the "context". This component might
  // have multiple contexts. 
  // - Note further that the data is NOT copied to this component; it 
  // is only stored once and when it changes all enclosed components
  // are able to respond, re-render, etc.
  const resourcesContext = React.useContext(ResourcesContext);
  let resources = resourcesContext.state;

  const [files, setFiles] = React.useState([]);

  useEffect(() => {
    const promises = resources.map(
      (resource, index) => resource.project.file() 
    );
    Promise.all(promises).then(_files => setFiles(_files));
  }, [resources]);

  const component = resources.map((resource, index) => (
    <div key={index}>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em',  overflow: 'scroll'}}>
        <ReactJson src={resource.project} />
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <pre>
          {files[index]}
        </pre>
      </Paper>
    </div>
  ));

  return component;
};

const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/v0.8',
  'unfoldingWord/en/ult/v5',
  'unfoldingWord/en/ust/v5',
];

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
  },
};

const reference = {bookId: 'jhn', chapter: 1, verse: 1};
const [ resources, setResources ] = React.useState([]);

<div style={{height: '250px', overflow: 'auto'}}>
  <ResourcesContextProvider
    reference={reference}
    resources={resources}
    resourceLinks={resourceLinks} 
    onResources={setResources}
    config={config}
  >
    <Component />
  </ResourcesContextProvider>
</div>
```

### Complex Example: Find Book Order based on fewest new UTW articles
```js
import {Paper, TextField} from '@material-ui/core';
import ReactJson from 'react-json-view';
import useEffect from 'use-deep-compare-effect';

import { ResourcesContext, ResourcesContextProvider } from "scripture-resources-rcl";

function Component ({seed}) {

  const resourcesContext = React.useContext(ResourcesContext);

  const [files, setFiles] = React.useState([]);
  const [bookOrder, setBookOrder] = React.useState([]);

  const wordArticlesByProject = React.useCallback(async (project) => {
    const file = await project.file();
    const _wordArticles = file.match(/x-tw="(.*)"/ug).map(m => m.match(/x-tw="(.*)"/u)[1]); //x-tw="rc://*/tw/dict/bible/names/paul"
    const wordArticles = new Set(_wordArticles);
    const _project = {...project, wordArticles};
    return _project;
  }, []);

  const lowestBookIdAndArticles = React.useCallback((bookIndex) => {
    const bookArticles = Object.keys(bookIndex).map(bookId => {
      const count = bookIndex[bookId] ? bookIndex[bookId].length : 0;
      const item = [bookId, count];
      return item;
    })
    .sort((a,b) => a[1] - b[1]);
    const lowestBookArticles = bookArticles[0];
    const bookId = lowestBookArticles[0];
    const articles = bookIndex[bookId];
    return [bookId, articles];
  },[]);

  React.useEffect(() => {
    if (resources) {
      const projects = resources.map(resource => resource.projects).flat();
      const promises = projects.map(wordArticlesByProject);
      Promise.all(promises).then(projects => {
        const bookIndex = {};
        projects.forEach(project => {
          bookIndex[project.identifier] = Array.from(project.wordArticles);
        });
        let _bookOrder = [];
        let _bookIndex = {...bookIndex};
        let _seed = [...seed];
        Object.keys(_bookIndex).forEach(_ => {
          let bookId, articles;
          if (_seed.length > 0) {
            bookId = _seed.shift();
            articles = _bookIndex[bookId];
          } else {
            // find list book with least articles
            _lowestBookIdAndArticles = lowestBookIdAndArticles(_bookIndex);
            bookId = _lowestBookIdAndArticles[0];
            articles = _lowestBookIdAndArticles[1];
          }
          delete _bookIndex[bookId]; // remove book from index
          _bookOrder.push({bookId, new: articles.length, total_unique: bookIndex[bookId].length});
          Object.keys(_bookIndex).forEach(bookId => { // remove completed articles from index
            _bookIndex[bookId] = _bookIndex[bookId].filter(article => !articles.includes(article));
          });
        });
        setBookOrder(_bookOrder);
      });
    }
  }, [resources]);

  return (
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <pre>
          <ReactJson src={bookOrder} />
        </pre>
      </Paper>
    </>
  );
};

// const resourceLink = 'unfoldingWord/en/ust/v5/tit';
// const resourceLink = 'unfoldingWord/en/ult/v5/tit';
const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/master',
  'unfoldingWord/hbo/uhb/master',
];

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 60 * 60 * 1000, // override cache to 1 minute
  },
};

const _seed = '3jn, tit, jon, rut'.split(/,\s*/);
const [seed, setSeed] = React.useState(_seed);
const updateSeed = (e) => {
  const _seed = e.target.value.split(/,\s*/).filter(string => string !== '');
  setSeed(_seed);
};
const [ resources, setResources ] = React.useState( [] );

<>
  <TextField id="seed" defaultValue={seed.join(', ')} variant='outlined' label='seed' onBlur={updateSeed} />
  <ResourcesContextProvider
    resources={resources}
    resourceLinks={resourceLinks} 
    onResources={setResources}
    config={config}
  >
  <Component seed={seed} />
  </ResourcesContextProvider>
</>
```