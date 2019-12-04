```js
import {ParallelScripture, withUsfm} from "../../";

import bhd_tit from '../mocks/bhd_tit.usfm.js';

function Component ({
  usfmJson,
}) {
  const json = JSON.stringify(usfmJson, null, 2);
  return (
    <pre>
      {json}
    </pre>
  );
};

const UsfmComponent = withUsfm(Component);

<div style={{height: '250px', overflow: 'auto'}}>
  <UsfmComponent usfm={bhd_tit} />
</div>
```
