# useRsrc

A custom hook to retrieve resources from DCS.

```jsx
import React, { useEffect, useState } from 'react';
import useRsrc from './useRsrc';

function Component() {
  const [markdown, setMarkdown] = useState('');
  const reference = {
    bookId: 'bible',
    chapter: 1,
    verse: 1,
    filePath: 'kt/jesus.md',
  };
  const resourceLink = 'unfoldingWord/en/tw/master';
  const config = {
    server: 'https://git.door43.org',
    cache: {
      maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
    },
  };

  const { state, actions } = useRsrc({
    resourceLink,
    reference,
    config,
  });

  useEffect(async () => {
    async function getFile() {
      const file = await actions.getFile();
      setMarkdown(file || '');
    }

    if (actions.getFile) {
      getFile();
    }
  });

  console.log('state', state);
  console.log('actions', actions);

  return <div>{markdown}</div>;
}

<Component />;
```
