```js
import {Paper} from '@material-ui/core';
import ReactJson from 'react-json-view';
import {withResource} from '../../';

function Component ({resource}) {
  const [file, setFile] = React.useState();
  const [json, setJson] = React.useState();

  React.useEffect(() => {
    if (resource && resource.project) {
      resource.project.file().then(_file => {
        setFile(_file);
      });
      resource.project.json().then(_json => {
        setJson(_json);
      });
    }
  }, [resource]);

  return (
    <>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em',  overflow: 'scroll'}}>
        <ReactJson src={resource} />
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <pre>
          {file}
        </pre>
      </Paper>
      <Paper style={{maxHeight: '250px', margin: '1em', padding: '1em', overflow: 'scroll'}}>
        <pre>
          <ReactJson src={json} />
        </pre>
      </Paper>
    </>
  );
};
const ResourceComponent = withResource(Component);

// const resourceLink = 'unfoldingWord/en/ust/v5/tit';
// const resourceLink = 'unfoldingWord/en/ult/v5/tit';
const resourceLink = 'unfoldingWord/el-x-koine/ugnt/v0.8/tit';

const config = {
  server: 'https://git.door43.org',
  cache: {
    maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
  },
};

<ResourceComponent resourceLink={resourceLink} config={config} />
```