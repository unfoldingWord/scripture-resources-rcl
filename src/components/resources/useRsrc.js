import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';

import { resourceFromResourceLink } from '../../core';
import tsvToJson from '../../core/tsvToJson';

function useRsrc({
  config, reference, resourceLink,
}) {
  const [resource, setResource] = useState({});
  const [content, setContent] = useState(null);
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

  useEffect(() => {
    async function getFile() {
      let file = await resource.project?.file();
      const isTSV = resource?.project?.path.includes('.tsv');

      if (isTSV) {
        file = tsvToJson(file);
      }

      setContent(file);
    }

    getFile();
  }, [config, resource]);

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
    state: {
      content,
      resource,
      usfm: usfmJson,
    },
    actions: { parseUsfm },
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
