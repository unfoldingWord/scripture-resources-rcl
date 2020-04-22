import React, { useCallback } from 'react';
import { Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import CcIcon from '../../Icons/Cc';

export const License = ({
  rights,
  licenseLink,
  width,
  height,
}) => {

  const classes = useStyles();
  const openLink = useCallback((link) => window.open(link, '_blank'), []);
  const onClickLicense = () => { openLink(licenseLink); }

  const w = width ? width : 20;
  const h = height ? height : 20;
  //const CcIcon = React.forwardRef((props, ref) => <div><CcIcon onClick={onClickLicense} width={w} height={h} {...props} ref={ref}/></div>);
  let iconProps = {
    width: w,
    height: h,
    title: rights,
    onClick: onClickLicense,
  };

  let rightsIcon = <CcIcon {...iconProps} />

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
