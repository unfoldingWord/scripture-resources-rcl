### Manually providing files

```js
import {ParallelScripture} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';

import ugnt_tit from '../mocks/ugnt_tit.usfm.js';
import en_aligned_tit from '../mocks/en_aligned_tit.usfm.js';
import hi_aligned_tit from '../mocks/hi_aligned_tit.usfm.js';
import hi_tit from '../mocks/hi_tit.usfm.js';
import bhd_tit from '../mocks/bhd_tit.usfm.js';

const titles = [
  'UGNT - Greek',
  'English - ULT (aligned)',
  'Hindi - IRV (aligned)',
  'Hindi - ULB',
  'Bhadrawahi - ULB',
];

const books = [
  usfmJS.toJSON(ugnt_tit),
  usfmJS.toJSON(en_aligned_tit),
  usfmJS.toJSON(hi_aligned_tit),
  usfmJS.toJSON(hi_tit),
  usfmJS.toJSON(bhd_tit),
];

const reference = {
  bookId: 'tit',
  chapter: 1,
  verse: 2,
};

const [component, setComponent] = React.useState(<></>)
const [quote, setQuote] = React.useState();

React.useEffect(() => {
  setComponent(
    <ParallelScripture
      titles={titles}
      books={books}
      title='Titus'
      reference={reference}
      onQuote={setQuote}
      height='250px'
    />
  );
}, []);

<>
  <p>Quote: {quote}</p>
  <div style={{border: '1px #ebf1f3 solid'}}>
    {component}
  </div>
</>
```

### withResources

```js
import {ParallelScripture, withResources} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';

function Component ({resources, reference}) {
  const [books, setBooks] = React.useState([]);
  const [quote, setQuote] = React.useState();

  React.useEffect(() => {
    const promises = resources.map((resource, index) => resource.project.file() );
    Promise.all(promises).then(files => {
      const _books = files.map(file => usfmJS.toJSON(file));
      setBooks(_books);
    });
  }, [resources]);

  const titles = resources.map((resource) => {
    let _title = `${resource.languageId}_${resource.resourceId}_${resource.tag}`;
    if (resource.manifest) {
      const { manifest: { dublin_core: {title, version} } } = resource;
      _title =`${title} v${version}`;
    }
    return _title;
  });

  return (
    <>
      <p>Quote: {quote}</p>
      <div style={{border: '1px #ebf1f3 solid'}}>
        <ParallelScripture
          titles={titles}
          books={books}
          title='Titus'
          reference={reference}
          onQuote={setQuote}
          height='250px'
        />
      </div>
    </>
  );
}

const Resources = withResources(Component);

const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/v0.8/tit',
  'unfoldingWord/en/ult/v5/tit',
  'unfoldingWord/en/ust/v5/tit',
];

const config = {server: 'https://git.door43.org'};

const reference = {bookId: 'tit', chapter: 2, verse: 5};

<Resources resourceLinks={resourceLinks} config={config} reference={reference} />
```
