```js
import {Paper} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResources} from '../../';

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