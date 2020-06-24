import React, { useCallback } from 'react';

import ResourcesContextProvider from '../../../../resources/Resources.context';
import ParallelScripture from '../../../../parallel-scripture/ParallelScripture';
import useEffect from 'use-deep-compare-effect';

// ALL application default resourceLinks:
const hebrewResourceLink = 'unfoldingWord/hbo/uhb/master';
const greekResourceLink = 'unfoldingWord/el-x-koine/ugnt/master';
const enUltResourceLink = 'unfoldingWord/en/ult/master';
const enUstResourceLink = 'unfoldingWord/en/ust/master';

const generateResourceLinks = ({ bookId, testament }) => {
  let originalLink =
    testament === 'old' ? hebrewResourceLink : greekResourceLink;

  // need to add reference bookId to resource links
  const allResourceLinks = [originalLink, enUltResourceLink, enUstResourceLink];

  // Add bookId to all resource paths:
  const allResourceLinksWithBookId = allResourceLinks.map((link) => {
    return link + '/' + bookId;
  });

  return allResourceLinksWithBookId;
};

export function ParallelScriptureMock({
  bookId,
  testament,
  chapter,
  verse,
  selections,
}) {
  const _defaultResourceLinks = generateResourceLinks({ bookId, testament });

  const [resourceLinks, setResourceLinks] = React.useState(
    _defaultResourceLinks
  );
  const [resources, setResources] = React.useState([]);

  const reference = { bookId, chapter, verse };

  const config = { server: 'https://git.door43.org' };

  return (
    <ResourcesContextProvider
      resourceLinks={resourceLinks}
      defaultResourceLinks={[...resourceLinks]}
      onResourceLinks={setResourceLinks}
      resources={resources}
      onResources={setResources}
      config={config}
    >
      {selections.map((currentSelection) => {
        return (
          <ParallelScripture
            reference={reference}
            quote={currentSelection}
            onQuote={() => {}}
            occurrence={1}
            height='250px'
          />
        );
      })}
    </ResourcesContextProvider>
  );
}
