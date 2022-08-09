import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect from 'use-deep-compare-effect';
import { getResponseData, resourceFromResourceLink } from '../../core';
import tsvToJson from '../../core/tsvToJson';
import { rangeFromVerseAndVerseKeys } from '../parallel-scripture/helpers';

//   config, verseRefs, resourceLink
// the query parameter is a tree with four levels: root, book, ch (chapter) and v (verse)

function useBcvVerseObjects({query,options = {}}) {
  const [bibleRef, setBibleRef] = useState({});
  const [resource, setResource] = useState({});
  const [content, setContent] = useState(null);
  const [loadingResource, setLoadingResource] = useState(null); // flag for when loading resource
  const [loadingContent, setLoadingContent] = useState(null); // flag for when loading content from resource
  const { bibleJson, matchedVerse } = bibleRef || {};
  const [fetchResponse, setFetchResponse] = useState(null);
  const [triggeredReloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const resourceTag = JSON.stringify({
      query.resourceLink, reference, query.server,
    });
    setLoadingResource(resourceTag);
    setLoadingContent(null);
    setFetchResponse(null);
    setResource({});
    resourceFromResourceLink({
      resourceLink: query.resourceLink,
      reference,
      config: query.config,
    }).then((_resource) => {
      let __resource = _resource && deepFreeze(_resource);
      __resource = __resource || {}; //TRICKY prevents 'use-deep-compare-effect' from crashing when resource not found (is null)

      if (_resource) { // if successful loading resource, we move to getting content
        setLoadingContent(resourceTag);
      }
      setResource(__resource);
      setLoadingResource(null); // done
    }).catch(error => {
      console.warn(`useBcvVerseObjects() - error fetching resource for: ${resourceTag}`, error);
      setLoadingResource(null); // done
    });
  }, [query, triggeredReloadCount]);
 
  useEffect(() => {
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
      };

    }
    parseUsfm().then(function (ref) {
      setBibleRef({ bibleJson: ref, matchedVerse: matchedVerse_ });
      setLoadingContent(null); // done
    });

  }, [verseRefs, resource]);

  const reloadResource = useCallback(() => {
    setReloadCount(triggeredReloadCount + 1);
  }, [triggeredReloadCount]);

  return {
    state: {
      result,
      success,
      errorCode,
      loadingResource,
      loadingContent,
    },
    actions: { reloadResource },
  };
}


// @ts-ignore
import { useEffect, useState } from 'react'
import {
  core,
  useRsrc,
} from 'scripture-resources-rcl'
import {
  CONTENT_NOT_FOUND_ERROR,
  ERROR_STATE,
  INITIALIZED_STATE,
  INVALID_MANIFEST_ERROR,
  LOADING_STATE,
  MANIFEST_NOT_LOADED_ERROR,
  SCRIPTURE_NOT_LOADED_ERROR,
} from 'translation-helps-rcl'
import { getResourceLink } from '../utils'
import {
  ServerConfig,
  ScriptureResource,
  ScriptureReference,
} from '../types'
import { parseResourceManifest } from './parseResourceManifest'

interface Props {
  /** reference for scripture **/
  reference: ScriptureReference;
  /** where to get data **/
  config: ServerConfig;
  /** optional direct path to bible resource, in format ${owner}/${languageId}/${projectId}/${branch} **/
  resourceLink: string|undefined;
  /** optional resource object to use to build resourceLink **/
  resource: ScriptureResource|undefined;
}

export function useScripture({
  resource: resource_,
} : Props) {
  const [initialized, setInitialized] = useState(false)

  const {
    state: {
      bibleJson,
      matchedVerse,
      resource,
      content,
      loadingResource,
      loadingContent,
      fetchResponse,
    },
  } = useRsrc({
    config, reference, resourceLink 
  })

  const { title, version } = parseResourceManifest(resource)
  let { verseObjects } = bibleJson || {}

  useEffect(() => {
    if (!initialized) {
      if (loading) { // once first load has begun, we are initialized
        setInitialized(true)
      }
    }
  }, [loading])

  if (languageId === 'el-x-koine' || languageId === 'hbo') {
    verseObjects = core.occurrenceInjectVerseObjects(verseObjects)
  }

  return {
    reference,
    resourceLink,
    verseObjects,
    resourceStatus,
    fetchResponse,
  }
}

useBcvVerseObjects.propTypes = {
  props: PropTypes.shape({
    query: PropTypes.shape.isRequired({
      /** The server for fetching */
      server: PropTypes.string.isRequired,
      /** The link to parse and fetch the resource manifest */
      resourceLink: PropTypes.string.isRequired,
      book: PropTypes.objectOf.isRequired(
        PropTypes.shape.isRequired({
          ch: PropTypes.objectOf.isRequired(
            PropTypes.shape.isRequired({
              v: PropTypes.objectOf.isRequired(
                PropTypes.shape({})
              )
            })  
          )
        })
      )
    }),
  }),
};

/* optional (in options)
// the overriding cache settings 
cache: PropTypes.shape({
  // cache age in ms 
  maxAge: PropTypes.number,
}),
*/

export default useBcvVerseObjects;
