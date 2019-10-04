import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import MaterialTable, {MTableToolbar} from 'material-table';

import {Verse, Row} from '..';
import {dataFromBooks, tableIcons} from './helpers';

function ParallelScripture ({
  title,
  titles,
  books,
  height,
  reference,
}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const _data = dataFromBooks(books);

    const _columns = titles.map((title, index) => ({
      title,
      field: `${index}`,
      cellStyle: {
        borderBottom: 'none',
        verticalAlign: 'top',
        padding: '4px 8px',
        minWidth: '15em',
      },
      render: (rowData) => {
        const {referenceId} = rowData;
        const [chapterKey, verseKey] = referenceId.split(':');
        const verse = books[index].chapters[chapterKey][verseKey];
        let cell = <></>;
        if (verse) {
          const {verseObjects} = verse;
          cell = (
            <Verse
              verseObjects={verseObjects}
              verseKey={referenceId}
              renderOffscreen
              disableWordPopover
            />
          );
        }
        return cell;
      },
    }));

    setData(_data);
    setColumns(_columns);
  }, [titles, books]);

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
        Toolbar: props => <MTableToolbar {...props} classes={{root: classes.toolbar}} />,
        Container: props => <div {...props} />,
        Row: props => <Row {...props} reference={reference} />,
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
    bookId: PropTypes.string,
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