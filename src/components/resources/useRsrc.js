import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';

import { resourceFromResourceLink } from '../../core';
import tsvToJson from '../../core/tsvToJson';

function useRsrc({
  config, reference, resourceLink, options = {},
}) {
  const [usfm, setUsfm] = useState(null);
  const [resource, setResource] = useState({});
  const [content, setContent] = useState(null);

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
    const { chapter, verse } = reference;
    const { project } = resource;
    const usfm = await project.parseUsfm();

    if (chapter) {
      if (verse) {
        return usfm.chapters[chapter][verse];
      } else {
        return usfm.chapters[chapter];
      }
    } else {
      return usfm;
    }
  }, [reference, resource]);

  useEffect(() => {
    if (resource && resource.project && options.usfm) {
      parseUsfm().then(setUsfm);
    }
  }, [options.usfm, parseUsfm, resource]);

  return {
    state: {
      content,
      resource,
      usfm,
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
