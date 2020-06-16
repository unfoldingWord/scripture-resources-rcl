import React from 'react';
import { Menu, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';

function ColumnsMenu({ columns, onColumns, anchorEl, onAnchorEl }) {
  const toggleColumn = (index) => {
    const _columns = [...columns];
    _columns[index].hidden = !columns[index].hidden;
    onColumns(_columns);
  };

  const menuItems = columns.map((col, index) => (
    <MenuItem key={col.id} onClick={() => toggleColumn(index)}>
      <FormControlLabel
        label={col.label}
        control={<Checkbox checked={!col.hidden} />}
      />
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

export default ColumnsMenu;
