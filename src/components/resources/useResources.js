import React, { useState, useCallback } from 'react';
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
  const [projectIdentifier, setProjectIdentifier] = useState();
  const [usfmJsonArray, setUsfmJsonArray] = useState();

  const parseUsfm = useCallback(async () => {
    let response = usfmJsonArray;
    if (resources && resources[0] && resources[0].project) {
      const { project } = resources[0];
      if (project.identifier !== projectIdentifier || !usfmJsonArray) {
        console.log('useResource');
        console.log('Parsing [' + resources.length + ']...');
        const promises = resources.map((resource) =>
          resource.project.parseUsfm()
        );
        const jsonArray = await Promise.all(promises);
        setUsfmJsonArray(jsonArray);
        setProjectIdentifier(project.identifier);
        response = jsonArray;
      }
    }
    return response;
  }, [resources, projectIdentifier]);

  useEffect(() => {
    console.log('useEffect setProjectIdentifier');
    setProjectIdentifier();
  }, [resources]);

  useEffect(() => {
    console.log('resourcesFromResourceLinks [' + resourceLinks.length + ']...');
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
      console.log('addResourceLink: [' + _resourceLinks.length + '] resources');
      onResourceLinks(_resourceLinks);
    },
    [resourcesFromResourceLinks, resourceLinks]
  );

  return {
    state: resources,
    actions: {
      addResourceLink,
      update,
      parseUsfm,
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
