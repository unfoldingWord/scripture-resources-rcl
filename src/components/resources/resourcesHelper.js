import { useCallback } from 'react';

import { resourceFromResourceLink } from '../../core';

// array.slice + re-join for resourceLinks array.
export const removeResourceLink = (resourceLinks, index) => {
  let _resourceLinks = [];

  if (index > 0) {
    let head = resourceLinks.slice(0, index);
    let tail = [];
    if (index + 1 >= resourceLinks.length - 1) {
      tail = resourceLinks.slice(index + 1);
    }

    _resourceLinks = [...head, ...tail];
  } else {
    _resourceLinks = resourceLinks.slice(1);
  }

  return _resourceLinks;
};

export const tryAddResourceLink = (
  resourceLinks,
  newResourceLink,
  reference,
  config,
  onResourceLinks
) => {
  resourceFromResourceLink({
    resourceLink: newResourceLink,
    reference,
    config,
  }).then((_parsedResource) => {
    if (_parsedResource != null) {
      onResourceLinks([...resourceLinks, newResourceLink]);
    }
  });
};
