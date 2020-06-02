```js
import ReactJson from 'react-json-view';
import { UsfmContext, UsfmContextProvider } from "scripture-resources-rcl";

import bhd_tit from '../mocks/bhd_tit.usfm.js';

function Component () {
  const usfmJson = React.useContext(UsfmContext);

  return (
    <ReactJson src={usfmJson} />
  );
};

<div style={{height: '250px', overflow: 'auto'}}>
  <UsfmContextProvider usfm={bhd_tit}>
    <Component />
  </UsfmContextProvider>
</div>
```
