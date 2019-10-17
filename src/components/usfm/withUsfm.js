import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import usfmJS from 'usfm-js';

function withUsfm(Component){
  function UsfmComponent({
    usfm,
    ...props
  }) {
    const [usfmJson, setUsfmJson] = useState({});

    useEffect(() => {
      const _usfmJson = deepFreeze(usfmJS.toJSON(usfm));
      setUsfmJson(_usfmJson);
    }, [usfm]);

    return (
      <Component usfm={usfm} usfmJson={usfmJson} {...props} />
    );
  }

  UsfmComponent.propTypes = withUsfm.propTypes;

  return UsfmComponent;
}

withUsfm.propTypes = {
  /** The usfm string to parse */
  usfm: PropTypes.string.isRequired,
  /** The url of the usfm string to parse */
  onParse: PropTypes.func,
};

export default withUsfm;
