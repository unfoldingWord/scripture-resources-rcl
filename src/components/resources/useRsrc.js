import { useState } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';

import { resourceFromResourceLink } from '../../core';
import tsvToJson from '../../core/tsvToJson';

function useRsrc({
  config, reference, resourceLink, options = {},
}) {
  const [bibleJson, setBibleJson] = useState(null);
  const [resource, setResource] = useState({});
  const [content, setContent] = useState(null);
  const resource_ = resource || {}; // TRICKY - prevents crash in recent `use-deep-compare-effect` module when resource is not found

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
      let file = await resource_.project?.file();
      const isTSV = resource_.project?.path.includes('.tsv');

      if (isTSV) {
        file = tsvToJson(file);
      }

      setContent(file);
    }

    getFile();
  }, [config, resource_]);

  useEffect(() => {
    if (resource_ && resource_.project && options.getBibleJson) {
      const parseUsfm = async () => {
        const { chapter, verse } = reference;
        const { project } = resource_;
        const bibleJson = await project.parseUsfm();

        if (chapter) {
          try {
            if (verse) {
              return bibleJson.chapters[chapter][verse];
            } else {
              return bibleJson.chapters[chapter];
            }
          } catch (e) {
            return null; // return null if chapter or verse missing
          }
        } else {
          return bibleJson;
        }
      };

      parseUsfm().then(setBibleJson);
    }
  }, [options.getBibleJson, resource_]);

  return {
    state: {
      content,
      resource,
      bibleJson,
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
