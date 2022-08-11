## useRsrc

A custom hook to retrieve resources from DCS. Unlike useResource it allows to retrieve files that are in a subfolder trhough the filePath value.

```jsx
import React, { useEffect, useState } from "react";
import { BlockEditable } from "markdown-translatable";
import useRsrc from "./useRsrc";
const reference = {
  projectId: "tit",
  chapter: 1,
  verse: 1,
};
const resourceLink = "unfoldingWord/en/ult/master";
const config = {
  server: "https://git.door43.org",
  cache: {
    maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
  },
};
function Component() {
  const {
    state: { content, bibleJson },
    actions,
  } = useRsrc({
    resourceLink,
    reference,
    config,
    options: {
      getBibleJson: true,
    },
  });
// The BlockEditable needs a string - not json content
  // so we just stringify the first characters here
  // - as a stop-gap measure
  return (
    <BlockEditable
      markdown={(content && JSON.stringify(content).slice(0, 1000)) || ""}
    />
    //  return <BlockEditable markdown={content || ""} />;
  );
}

<Component />;
```
