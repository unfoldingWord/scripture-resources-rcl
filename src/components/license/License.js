import React, { useCallback } from 'react';
import { Info } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

export const License = ({
  rights,
  licenseLink,
}) => {

  const classes = useStyles();
  const openLink = useCallback((link) => window.open(link, '_blank'), []);
  const onClickLicense = () => { openLink(licenseLink); }

  let iconProps = {
    color: "primary",
    onClick: onClickLicense,
  };

  let rightsIcon = <Tooltip title={rights} arrow><Info {...iconProps} /></Tooltip> ; 

  return (
    <div className={classes.root}>
      {rightsIcon}
    </div>
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
