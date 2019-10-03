import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import MaterialTable, {MTableToolbar} from 'material-table';

import {Verse} from '..';
import {dataFromBooks, tableIcons} from './helpers';

function ParallelScripture ({
  title,
  titles,
  books,
  height,
  ...props
}) {
  const classes = useStyles();
  const data = dataFromBooks(books);

  const columns = titles.map((title, index) => ({
    title,
    field: `${index}`,
    cellStyle: {
      borderBottom: 'none',
      verticalAlign: 'top',
      padding: '4px 8px',
      minWidth: '15em',
    },
    render: (rowData) => {
      const [chapterKey, verseKey] = rowData.referenceId.split(':');
      const verse = books[index].chapters[chapterKey][verseKey];
      let row = <></>;
      if (verse) {
        const {verseObjects} = verse;
        row = <Verse verseObjects={verseObjects} verseKey={rowData.referenceId} {...props} />;
      }
      return row;
    },
  }));

  return (
    <MaterialTable
      title={title || 'Parallel Scripture'}
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        search: true,
        sorting: false,
        paging: false,
        headerStyle: { position: 'sticky', top: 0, padding: '4px 8px' },
        maxBodyHeight: height,
      }}
      style={{}}
      components={{
        Toolbar: props => (
          <MTableToolbar {...props} classes={{ root: classes.toolbar }} />
        ),
        Container: props => <div {...props} />,
      }}
    />
  );
}

ParallelScripture.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      headers: PropTypes.array.isRequired,
      chapters: PropTypes.object.isRequired,
    })  
  ).isRequired,
  /** the reference to scroll into view */
  reference: PropTypes.shape({
    book: PropTypes.string,
    chapter: PropTypes.number,
    verse: PropTypes.number,
  }),
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
  /** override text direction detection */
  direction: PropTypes.string,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 'unset',
    paddingTop: theme.spacing(0.5),
  },
}));

export default ParallelScripture;