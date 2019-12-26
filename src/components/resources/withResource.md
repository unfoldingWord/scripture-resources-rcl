### Fetch Project File and Parse USFM

```js
import React, {useState} from 'react';
import {Paper} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResource} from "scripture-resources-rcl";

function Component ({resource}) {
  const [file, setFile] = useState();
  const [json, setJson] = useState();

  React.useEffect(() => {
    if (resource && resource.project) {
      resource.project.file().then(setFile);
      resource.project.json().then(setJson);
    }
  }, [resource]);

  return (
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em',  overflow: 'scroll'}}>
        <h4>Resource</h4>
        <ReactJson src={resource} />
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <h4>Project File</h4>
        <pre>
          {file}
        </pre>
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <h4>Json</h4>
        <ReactJson src={json} />
      </Paper>
    </>
  );
};
const ResourceComponent = withResource(Component);

// const resourceLink = 'unfoldingWord/en/ust/v5/tit';
// const resourceLink = 'unfoldingWord/en/ult/v5/tit';
const resourceLink = 'unfoldingWord/el-x-koine/ugnt/master/tit';

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 60 * 60 * 1000, // override cache to 1 minute
  },
};

<ResourceComponent resourceLink={resourceLink} config={config} />
```

### Get Tree and first blob

```js
import React, {useState} from 'react';
import {Paper} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResource} from "scripture-resources-rcl";

function Component ({resource}) {
  const [tree, setTree] = useState();
  const [blob, setBlob] = useState();

  React.useEffect(() => {
    if (resource) resource.getTree().then(setTree);
  }, [resource]);

  React.useEffect(() => {
    if (tree && tree.length > 0) {
      tree[0].getBlob().then(setBlob);
    }
  }, [tree]);

  return (
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em',  overflow: 'scroll'}}>
        <h4>Resource</h4>
        <ReactJson src={resource} />
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <h4>Tree</h4>
        <ReactJson src={tree} />
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <h4>First Blob in tree's decoded content</h4>
        <pre>
          {blob ? blob.decoded : ''}
        </pre>
      </Paper>
    </>
  );
};
const ResourceComponent = withResource(Component);

// const resourceLink = 'unfoldingWord/en/ust/v5/tit';
// const resourceLink = 'unfoldingWord/en/ult/v5/tit';
const resourceLink = 'unfoldingWord/el-x-koine/ugnt/master/tit';

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 60 * 60 * 1000, // override cache to 1 minute
  },
};

<ResourceComponent resourceLink={resourceLink} config={config} />
```

# Find Book Order based on fewest new UTA articles
```js
import {Paper, TextField} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResource} from "scripture-resources-rcl";

function Component ({resource, seed}) {
  const [files, setFiles] = React.useState([]);
  const [bookOrder, setBookOrder] = React.useState([]);

  const articlesByProject = React.useCallback(async (project) => {
    let _project = {...project};
    const file = await project.file();
    const rows = file.split('\n');
    const _articles = rows.map(row => row.split('\t')[4]).filter(article => article);
    const articles = new Set(_articles);
    _project.articles = articles;
    return _project;
  }, []);

  const lowestBookIdAndArticles = React.useCallback(bookIndex => {
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
    if (resource && resource.projects) {
      const promises = resource.projects
      // .filter(p => p.categories.includes('bible-nt'))
      .map(articlesByProject);
      Promise.all(promises).then(projects => {
        const bookIndex = {};
        projects.forEach(project => bookIndex[project.identifier] = Array.from(project.articles));
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
  }, [resource]);

  return (
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <ReactJson src={bookOrder} />
      </Paper>
    </>
  );
};
const ResourceComponent = withResource(Component);

// const resourceLink = 'unfoldingWord/en/ust/v5/tit';
// const resourceLink = 'unfoldingWord/en/ult/v5/tit';
const resourceLink = 'unfoldingWord/en/tn/master';

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 60 * 60 * 1000, // override cache to 1 hour
  },
};

const _seed = '3jn, tit, jon, rut'.split(/,\s*/);
const [seed, setSeed] = React.useState(_seed);
const updateSeed = (e) => {
  const _seed = e.target.value.split(/,\s*/).filter(string => string !== '');
  setSeed(_seed);
};

<>
  <TextField id="seed" defaultValue={seed.join(', ')} variant='outlined' label='seed' onBlur={updateSeed} />
  <ResourceComponent resourceLink={resourceLink} seed={seed} config={config} />
</>
```