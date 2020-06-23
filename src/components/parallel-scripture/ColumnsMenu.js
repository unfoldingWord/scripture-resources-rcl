import React from 'react';
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Grid,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HighlightOff } from '@material-ui/icons';

import { ResourcesContext } from '../resources/Resources.context';

function ColumnsMenu({ columns, onColumns, anchorEl, onAnchorEl }) {
  const { state: resources, actions } = React.useContext(ResourcesContext);

  const toggleColumn = (index) => {
    const column = { ...columns[index] };
    column.hidden = !column.hidden;
    const _columns = [...columns];
    _columns[index] = column;
    onColumns(_columns);
  };

  const removeResource = (index) => {
    let _resources = [];
    if (index > 0) {
      let head = resources.slice(0, index);
      let tail = [];
      if (index + 1 >= resources.length - 1) {
        tail = resources.slice(index + 1);
      }

      _resources = [...head, ...tail];
    } else {
      _resources = resources.slice(1);
    }

    actions.update(_resources);
  };

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
        <Grid item>
          <div>
            <Tooltip title='Remove' arrow>
              <IconButton
                aria-label='Remove'
                onClick={() => removeResource(index)}
                className={classes.action}
                size='small'
              >
                <HighlightOff />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </MenuItem>
  ));

  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => onAnchorEl()}>
      <MenuItem
        key={'text'}
        disabled
        style={{ opacity: 1, fontWeight: 600, fontSize: 12 }}
      >
        View Versions
      </MenuItem>
      {menuItems}
    </Menu>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    padding: '8px',
  },
}));

export default ColumnsMenu;
