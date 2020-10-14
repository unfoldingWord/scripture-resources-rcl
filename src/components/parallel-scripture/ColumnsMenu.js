import React, { useCallback } from 'react';
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HighlightOff, PlaylistAdd } from '@material-ui/icons';

import { localString } from '../../core/localStrings';
import { ResourcesContext } from '../resources/Resources.context';

function ColumnsMenu({
  columns, onColumns, anchorEl, onAnchorEl,
}) {
  const { state, actions } = React.useContext(ResourcesContext);
  const { resources } = state || {};

  const onResourceAddClick = () => {
    actions.addResourceLink(resourceUrl.value);
  };

  const removeResourceLink = (index) => {
    actions.remove(index);
  };

  const toggleColumn = (index) => {
    const column = { ...columns[index] };
    column.hidden = !column.hidden;
    const _columns = [...columns];
    _columns[index] = column;
    onColumns(_columns);
  };

  const isDefaultResourceLink = React.useCallback(
    (index) => (
      resources &&
      resources[index] &&
      actions.isDefaultResourceLink(resources[index].resourceLink)
    ),
    [actions, resources],
  );

  const classes = useStyles();

  const menuItems = columns.map((col, index) => (
    <MenuItem key={col.id}>
      <Grid container justify='space-between'>
        <Grid item>
          <div>
            <FormControlLabel
              label={col.label}
              control={<Checkbox checked={!col.hidden} />}
              onClick={() => toggleColumn(index)}
            />
          </div>
        </Grid>
        {!isDefaultResourceLink(index) && (
          <Grid item>
            <div>
              <Tooltip title={localString('Remove')} arrow>
                <IconButton
                  aria-label={localString('Remove')}
                  onClick={() => removeResourceLink(index)}
                  className={classes.action}
                  size='small'
                >
                  <HighlightOff />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        )}
      </Grid>
    </MenuItem>
  ));

  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => onAnchorEl()}>
      <MenuItem
        key={'text'}
        disabled
        style={{
          opacity: 1, fontWeight: 600, fontSize: 12,
        }}
      >
        {localString('ManageVersions')}
      </MenuItem>

      {menuItems}

      <MenuItem>
        <TextField
          id='resourceUrl'
          label={localString('ResourcePath')}
          variant='outlined'
          defaultValue=''
          style={{ valign: 'middle' }}
        />
        <Tooltip title={localString('AddResource')} arrow>
          <IconButton
            aria-label={localString('AddResource')}
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
  action: { padding: '8px' },
}));

export default ColumnsMenu;
