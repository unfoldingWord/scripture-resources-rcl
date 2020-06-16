import React from 'react';
import {
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  colors,
} from '@material-ui/core';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { PlaylistAdd } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { ResourcesContext } from '../resources/Resources.context';
import { TextField } from '@material-ui/core';

function AddResourceMenu({ columns, onColumns, anchorEl, onAnchorEl }) {
  const { state: resources, actions } = React.useContext(ResourcesContext);

  const onResourceAddClick = () => {
    actions.addResourceLink(resourceUrl.value);
  };

  const useStyles = makeStyles((theme) => ({
    menuIconButton: {
      margin: '12pt',
      borderWidth: '2px',
      borderColor: 'black',
      color: 'black',
    },
  }));

  const classes = useStyles();

  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => onAnchorEl()}>
      <MenuItem
        key={'text'}
        disabled
        style={{ opacity: 1, fontWeight: 600, fontSize: 12 }}
      >
        Add Resource
      </MenuItem>

      <MenuItem>
        <TextField
          id='resourceUrl'
          label='Resource Path'
          variant='outlined'
          defaultValue=''
          style={{ valign: 'middle' }}
        />
        <Tooltip title='Add Resource' arrow>
          <IconButton
            aria-label='Add Resource'
            onClick={onResourceAddClick}
            className={(classes.action, classes.menuIconButton)}
            size='small'
          >
            <PlaylistAdd fontSize='small' />
          </IconButton>
        </Tooltip>
      </MenuItem>
    </Menu>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    padding: '8px',
  },
}));

export default AddResourceMenu;
