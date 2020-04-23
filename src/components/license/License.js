import React, { useCallback } from 'react';
import { Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import ByNcNdIcon from '../../Icons/ByNcNd';
import ByNcSaIcon from '../../Icons/ByNcSa';
import ByNcIcon from '../../Icons/ByNc';
import ByNdIcon from '../../Icons/ByNd';
import BySaIcon from '../../Icons/BySa';
import ByIcon from '../../Icons/By';
import CcZeroIcon from '../../Icons/CcZero';
import PublicdomainIcon from '../../Icons/Publicdomain';

export const License = ({
  rights,
  licenseLink,
  width,
  height,
}) => {

  const classes = useStyles();
  const openLink = useCallback((link) => window.open(link, '_blank'), []);
  const onClickLicense = () => { openLink(licenseLink); }

  const w = width ? width : 80;
  const h = height ? height : 15;

  let iconProps = {
    width: w,
    height: h,
    onClick: onClickLicense,
  };

  let rightsIcon = <BySaIcon {...iconProps} />
  if ( rights.toUpperCase().match(/BY-SA/) ) {
    // the default
  } else if ( rights.toUpperCase().match(/BY-NC-ND/) ) {
    rightsIcon = <ByNcNdIcon {...iconProps} />
  } else if ( rights.toUpperCase().match(/BY-NC-SA/) ) {
    rightsIcon = <ByNcSaIcon {...iconProps} />
  } else if ( rights.toUpperCase().match(/BY-NC/) ) {
    rightsIcon = <ByNcIcon {...iconProps} />
  } else if ( rights.toUpperCase().match(/BY-ND/) ) {
    rightsIcon = <ByNdIcon {...iconProps} />
  } else if ( rights.toUpperCase().match(/BY/) ) {
    rightsIcon = <ByIcon {...iconProps} />
  } else if ( rights.toUpperCase().match(/CC0/) ) {
    rightsIcon = <CcZeroIcon {...iconProps} />
  } else if ( rights.toUpperCase().match(/PUBLIC DOMAIN/) ) {
    rightsIcon = <PublicdomainIcon {...iconProps} />
  }
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

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

export default License;
