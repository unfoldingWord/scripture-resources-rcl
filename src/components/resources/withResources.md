```js
import {Paper} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResources} from 'scripture-resources-rcl';

function Component ({resources}) {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    const promises = resources.map((resource, index) => resource.project.file() );
    Promise.all(promises).then(_files => setFiles(_files));
  }, [resources]);

  const component = resources.map((resource, index) => (
    <div key={index}>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em',  overflow: 'scroll'}}>
        <ReactJson src={resource} />
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
const ResourcesComponent = withResources(Component);

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

<ResourcesComponent resourceLinks={resourceLinks} reference={reference} config={config} />
```

# Find Book Order based on fewest new UTW articles
```js
import {Paper, TextField} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResources} from 'scripture-resources-rcl';

function Component ({resources, seed}) {
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
const ResourceComponent = withResources(Component);

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

const [seed, setSeed] = React.useState(['tit','rut','jon']);
const updateSeed = (e) => {
  const _seed = e.target.value.split(/,\s*/);

  debugger
  setSeed(_seed);
};

<>
  <TextField id="seed" defaultValue={seed.join(',')} variant='outlined' label='seed' onBlur={updateSeed} />
  <ResourceComponent resourceLinks={resourceLinks} seed={seed} config={config} />
</>
```