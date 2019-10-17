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
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em',  overflow: 'scroll'}}>
        <ReactJson src={resource} />
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <pre>
          {files[index]}
        </pre>
      </Paper>
    </>
  ));

  return component;
};
const ResourcesComponent = withResources(Component);

const resourceLinks = [
  'unfoldingWord/el-x-koine/ugnt/v0.8/tit',
  'unfoldingWord/en/ult/v5/tit',
  'unfoldingWord/en/ust/v5/tit',
];

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
  },
};

<ResourcesComponent resourceLinks={resourceLinks} config={config} />
```