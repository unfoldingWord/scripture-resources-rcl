import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';
import { getResponseData, resourceFromResourceLink } from '../../core';
import tsvToJson from '../../core/tsvToJson';
import { rangeFromVerseAndVerseKeys } from '../parallel-scripture/helpers';

function useRsrc({
  config, reference, resourceLink, options = {},
}) {
  const [bibleRef, setBibleRef] = useState({});
  const [resource, _setResource] = useState({});
  const [content, setContent] = useState(null);
  const [loadingResource, setLoadingResource] = useState(null); // flag for when loading resource
  const [loadingContent, setLoadingContent] = useState(null); // flag for when loading content from resource
  const { bibleJson, matchedVerse } = bibleRef || {};
  const [fetchResponse, setFetchResponse] = useState(null);
  const [triggeredReloadCount, setReloadCount] = useState(0);

  /**
   * use returned resource if resource link has not changed after fetch
   * @param {object} resource
   * @param {string} _resourceLink - requested resource link
   * @param {string} resourceTag - identifier for resource fetched
   */
  function setResource(resource, _resourceLink, resourceTag) {
    if (resourceLink !== _resourceLink) {
      console.log(`useRsrc - fetched resource link changed from ${_resourceLink} to ${resourceLink} - ignoring`);
    } else {
      if (resource) { // if successful loading resource, we move to getting content
        setLoadingContent(resourceTag);
      }
      _setResource(resource);
      setLoadingResource(null); // done
    }
  }
  
  useEffect(() => {
    if (resourceLink) {
      const resourceTag = JSON.stringify({
        resourceLink, reference, config,
      });
      const requestResourceLink = resourceLink;
      setLoadingResource(resourceTag);
      setLoadingContent(null);
      setFetchResponse(null);
      _setResource({});
      console.log(`useRsrc() - fetching resource for: ${resourceTag}`);
      resourceFromResourceLink({
        resourceLink,
        reference,
        config,
      }).then((_resource) => {
        let __resource = _resource && deepFreeze(_resource);
        __resource = __resource || {}; //TRICKY prevents 'use-deep-compare-effect' from crashing when resource not found (is null)
        setResource(__resource, requestResourceLink, resourceTag);
      }).catch(error => {
        console.warn(`useRsrc() - error fetching resource for: ${resourceTag}`, error);
        setLoadingResource(null); // done
      });
    }
  }, [resourceLink, reference, config, triggeredReloadCount]);

  useEffect(() => {
    async function getFile() {
      const response = await resource?.project?.file();
      setFetchResponse(response);
      let file = getResponseData(response);
      const isTSV = resource?.project?.path?.includes('.tsv');

      if (isTSV) {
        file = tsvToJson(file);
      }

      setContent(file);
      setLoadingContent(null); // done
    }

    // if resource loaded, then get file only if we are not fetching bible json data
    if (Object.keys(resource).length && !options.getBibleJson) {
      getFile();
    }
  }, [config, options.getBibleJson, resource]);

  useEffect(() => {
    if (options.getBibleJson) {
      let matchedVerse_;

      const parseUsfm = async () => {
        if (!resource?.project?.parseUsfm) { // if no project found or no usfm
          setContent(null);
          return null;
        }

        const { chapter, verse } = reference;
        const { project } = resource;
        const { json: bibleJson, response } = await project.parseUsfm();
        setContent(bibleJson);
        setFetchResponse(response);

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
              } else { // verse found
                matchedVerse_ = verse;
              }
              return verseJson;
            } else { // didn't specify verse, so return whole chapter
              return chapterJson;
            }
          } catch (e) {
            return null; // return null if chapter missing or error
          }
        } else { // didn't specify chapter, so return whole book
          return bibleJson;
        }
      };

      parseUsfm().then(function (ref) {
        setBibleRef({ bibleJson: ref, matchedVerse: matchedVerse_ });
        setLoadingContent(null); // done
      });
    }
  }, [options.getBibleJson, reference, resource]);

  const reloadResource = useCallback(() => {
    setReloadCount(triggeredReloadCount + 1);
  }, [triggeredReloadCount]);

  return {
    state: {
      content,
      resource,
      bibleJson,
      matchedVerse,
      loadingResource,
      loadingContent,
      fetchResponse,
    },
    actions: { reloadResource },
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
