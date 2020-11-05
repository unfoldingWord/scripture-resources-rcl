import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';

import { resourceFromResourceLink } from '../../core';

function useRsrc({
  config,
  reference,
  resourceLink,
}) {
  const [resource, setResource] = useState({});
  const [usfmJson, setUsfmJson] = useState(null);
  const [projectIdentifier, setProjectIdentifier] = useState('');

  useEffect(() => {
    resourceFromResourceLink({
      resourceLink, reference, config,
    }).then(
      (_resource) => {
        // TODO:
        console.log('_resource', _resource);
        const __resource = _resource && deepFreeze(_resource);
        setResource(__resource);
      },
    );
  }, [resourceLink, reference, config, update]);

  const update = useCallback(

  );

  const parseUsfm = useCallback(async () => {
    if (resource && resource.project) {
      const { project } = resource;

      if (project.identifier !== projectIdentifier || !usfmJson) {
        const json = await project.parseUsfm();
        setUsfmJson(json);
        setProjectIdentifier(project.identifier);
      }
    }
  }, [projectIdentifier, resource, usfmJson]);

  return {
    state: resource,
    actions: {
      parseUsfm,
      getFile: resource.project?.file,
    },
  };
}

useRsrc.propTypes = {
  /** the resource content */
  resource: PropTypes.object,
  /** reference: chapter and verse */
  reference: PropTypes.object,
  /** The link to parse and fetch the resource manifest */
  resourceLink: PropTypes.string.isRequired,
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
  onResource: PropTypes.func.isRequired,
};

export default useRsrc;
