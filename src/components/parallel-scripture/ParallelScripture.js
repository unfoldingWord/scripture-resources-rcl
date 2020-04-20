import React, { useState, useEffect, useCallback } from 'react';
import { Tooltip, Chip, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { ScriptureTable } from "../../";

function ParallelScripture({
  resources,
  reference,
  quote,
  onQuote,
  occurrence,
  height,
  buttons,
}) {
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState([]);
  const [books, setBooks] = useState([]);
  const openLink = useCallback((link) => window.open(link, '_blank'), []);

  useEffect(() => {
    if (resources.length > 0) {
      console.log("Resources:",resources);
      const { title: _title } = resources[0].project;
      let ref = '';
      if (reference) {
        if (reference.chapter && reference.verse) ref = reference.chapter + ':' + reference.verse;
        else if (reference.chapter) ref = reference.chapter;
      }
      const __title = _title + ' ' + ref;
      setTitle(__title);
      const _titles = resources.map((resource) => {
        let _title = `Error: ${resource.resourceLink}`;
  
        if (resource.manifest) { 
          const { manifest: { dublin_core: { title, version, rights } } } = resource;
          const onClickLicense = () => {
            const resourceUrl = resource.config.server + '/' +
              resource.username + '/' +
              resource.repository;
            openLink(resourceUrl);
          }
          let rightsIcon = <Tooltip title={rights} arrow><Info onClick={onClickLicense} fontSize='small' color='action' /></Tooltip>
          //_title = `${title} v${version} ${rights} ${ {rightsIcon} }`;
          _title = (
            <Typography variant='caption'>
              {title} v{version} {rightsIcon}
            </Typography>
          )
        }
        return _title;
      });
      setTitles(_titles);
      const promises = resources.map((resource, index) => resource.project.json());
      Promise.all(promises).then(setBooks);
    }
  }, [resources, reference]);

  return (
    <ScriptureTable
      titles={titles}
      books={books}
      title={title}
      reference={reference}
      height={height}
      quote={quote}
      // onQuote={onQuote} // disable until round trip is working
      occurrence={occurrence}
      buttons={buttons}
    />
  );
};

ParallelScripture.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      resourceLink: PropTypes.string.isRequired,
      manifest: PropTypes.object.isRequired,
      project: PropTypes.object.isRequired,
    })
  ).isRequired,
  /** the reference to scroll into view */
  reference: PropTypes.shape({
    bookId: PropTypes.string,
    chapter: PropTypes.number,
    verse: PropTypes.number,
  }),
  /** pass the quote in */
  quote: PropTypes.string.isRequired,
  /** callback to return the quote when selections made */
  onQuote: PropTypes.func,
  /** set the height to ensure rendering work properly   */
  height: PropTypes.string.isRequired,
};

export default ParallelScripture;