import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';

import { resourceFromResourceLink } from '../../core';

function useRsrc({
  config, reference, resourceLink,
}) {
  const [resource, setResource] = useState({});
  const [usfmJson, setUsfmJson] = useState(null);
  const [projectIdentifier, setProjectIdentifier] = useState('');

  useEffect(() => {
    resourceFromResourceLink({
      resourceLink,
      reference,
      config,
    }).then((_resource) => {
      const __resource = _resource && deepFreeze(_resource);
      setResource(__resource);
    });
  }, [resourceLink, reference, config]);

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

  const getFile = useCallback(async () => {
    const file = await resource.project?.file();
    return file;
  }, [resource]);

  return {
    state: resource,
    actions: {
      getFile,
      parseUsfm,
    },
  };
}

useRsrc.propTypes = {
  props: PropTypes.shape({
    /** The configuration of the server, and fetching */
    config: PropTypes.shape({
      server: PropTypes.string.isRequired,
      /** the overriding cache settings */
      cache: PropTypes.shape({
        /** cache age in ms */
        maxAge: PropTypes.number,
      }),
    }),
    /** reference: chapter and verse */
    reference: PropTypes.object,
    /** The link to parse and fetch the resource manifest */
    resourceLink: PropTypes.string.isRequired,
  }),
};

export default useRsrc;
