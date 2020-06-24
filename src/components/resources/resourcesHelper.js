import { useCallback } from 'react';

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
