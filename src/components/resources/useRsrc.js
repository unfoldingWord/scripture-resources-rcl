import { useState } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';
import { resourceFromResourceLink } from '../../core';
import tsvToJson from '../../core/tsvToJson';
import { rangeFromVerseAndVerseKeys } from '../parallel-scripture/helpers';

function useRsrc({
  config, reference, resourceLink, options = {},
}) {
  const [bibleRef, setBibleRef] = useState({});
  const [resource, setResource] = useState({});
  const [content, setContent] = useState(null);
  const { bibleJson, matchedVerse } = bibleRef || {};

  useEffect(() => {
    resourceFromResourceLink({
      resourceLink,
      reference,
      config,
    }).then((_resource) => {
      let __resource = _resource && deepFreeze(_resource);
      __resource = __resource || {}; //TRICKY prevents 'use-deep-compare-effect' from crashing when resource not found
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

  useEffect(() => {
    if (resource && resource.project && options.getBibleJson) {
      let matchedVerse_;

      const parseUsfm = async () => {
        const { chapter, verse } = reference;
        const { project } = resource;
        const bibleJson = await project.parseUsfm();

        if (chapter) {
          try {
            const chapterJson = bibleJson.chapters[chapter];

            if (verse) {
              let verseJson = chapterJson[verse];

              if (!verseJson) { // if verse not found, check verse spans
                const verseKey = rangeFromVerseAndVerseKeys({ verseKeys: Object.keys(chapterJson), verseKey:verse });

                if (verseKey) {
                  verseJson = chapterJson[verseKey];
                }
                matchedVerse_ = verseKey;
              } else {
                matchedVerse_ = verse;
              }
              return verseJson;
            } else {
              return chapterJson;
            }
          } catch (e) {
            return null; // return null if chapter missing or error
          }
        } else {
          return bibleJson;
        }
      };

      parseUsfm().then(function (ref) {
        setBibleRef({ bibleJson: ref, matchedVerse: matchedVerse_ });
      });
    }
  }, [options.getBibleJson, resource]);

  return {
    state: {
      content,
      resource,
      bibleJson,
      matchedVerse,
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
