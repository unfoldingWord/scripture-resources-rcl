```js
import ReactJson from 'react-json-view';
import { useUsfm } from "scripture-resources-rcl";

import bhd_tit from '../mocks/bhd_tit.usfm.js';

function Component ({
  usfm,
}) {
  const usfmJson = useUsfm({usfm});

  return (
    <ReactJson src={usfmJson} />
  );
};

<div style={{height: '250px', overflow: 'auto'}}>
  <Component usfm={bhd_tit} />
</div>
```
