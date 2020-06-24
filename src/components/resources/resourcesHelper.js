import { useCallback } from 'react';

export const removeResource = (resources, index, onResources) => {
  let _resources = [];
  if (index > 0) {
    let head = resources.slice(0, index);
    let tail = [];
    if (index + 1 >= resources.length - 1) {
      tail = resources.slice(index + 1);
    }

    _resources = [...head, ...tail];
  } else {
    _resources = resources.slice(1);
  }

  onResources(_resources);
};
