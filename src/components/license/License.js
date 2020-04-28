import React, { useCallback } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

export const License = ({
  rights,
  licenseLink,
  style,
  iconProps,
}) => {

  const classes = useStyles();
  const openLink = useCallback((link) => window.open(link, '_blank'), []);
  const onClickLicense = () => { openLink(licenseLink); }

  let _iconProps = {
    color: "primary",
    fontSize: "small",
    onClick: onClickLicense,
    style: {
      fontSize: '1em'
    },
    ...iconProps,
  };

  let rightsIcon = <Tooltip title={rights} arrow><InfoOutlinedIcon {..._iconProps} /></Tooltip> ; 

  return (
    <>{rightsIcon}</>
  );
};

License.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  /** rights string from manifest, such as "CC BY-SA 4.0" */
  rights: PropTypes.string.isRequired,
  /** number of iterations before timing out */
  licenseLink: PropTypes.string.isRequired,
  /** The overriding CSS for this component */
  style: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

export default License;
