import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';

import { resourcesFromResourceLinks } from '../../core';

function useResources({
  resources,
  resourceLinks,
  reference,
  config,
  onResources,
  onResourceLinks = () => {},
}) {
  useEffect(() => {
    resourcesFromResourceLinks({ resourceLinks, reference, config }).then(
      (_resources) => {
        update(_resources);
      }
    );
  }, [resourceLinks, reference, config]);

  const update = useCallback(
    (_resources) => {
      const __resources = _resources && deepFreeze(_resources);
      onResources(__resources);
    },
    [onResources]
  );

  const addResourceLink = useCallback(
    (newResourceLink) => {
      const _resourceLinks = [...resourceLinks, newResourceLink];
      onResourceLinks(_resourceLinks);
    },
    [resourcesFromResourceLinks, resourceLinks]
  );

  return {
    state: resources,
    actions: {
      addResourceLink,
      update,
      updateResourceLinks: onResourceLinks,
    },
  };
}

useResources.propTypes = {
  /** the resources  */
  resources: PropTypes.arrayOf(PropTypes.object),
  /** references: chapter and verse */
  reference: PropTypes.object,
  /** The link to parse and fetch the resource manifest */
  resourceLinks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  /** The configuration of the server, and fetching */
  config: PropTypes.shape({
    server: PropTypes.string.isRequired,
    /** the overriding cache settings */
    cache: PropTypes.shape({
      /** cache age in ms */
      maxAge: PropTypes.number,
    }),
  }),
  /** action taken after a resource is acquired */
  onResources: PropTypes.func.isRequired,
};

export default useResources;
