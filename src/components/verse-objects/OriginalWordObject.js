import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
} from '@material-ui/core';

import * as lexicon from '../../core/lexicon';

function OriginalWordObject ({
  verseObject,
  verseObject: {
    strong,
  }
}) {
  const [senses, setSenses] = useState([]);

  useEffect(()=> {
    lexicon.senses({strong})
    .then(senses => {
      setSenses(senses);
    }).catch(console.log);
  }, [strong]);

  return (
    <div>
      <Typography>
        <><strong>{verseObject.text || verseObject.content}</strong> -</>
        <> <em>lemma:</em> {verseObject.lemma}</>
        <> <em>strong:</em> {verseObject.strong}</>
        <br/>
        <> <em>morph:</em> {verseObject.morph}</>
      </Typography>
      {
        senses.map((sense, index) =>
          <Typography key={index}>
            <sup>{index + 1}</sup>
            {
              sense.gloss ?
              <> <em>Gloss:</em> {sense.gloss}</>
              : ''
            }
            {
              sense.definition ?
              <> <em>Definition:</em> {sense.definition}</>
              : ''
            }
          </Typography>
        )
      }
    </div>
  );
};

OriginalWordObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    strong: PropTypes.string,
    lemma: PropTypes.string,
    morph: PropTypes.string,
    occurrence: PropTypes.number,
    occurrences: PropTypes.number,
  }).isRequired,
};

export default OriginalWordObject;
