import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {ShortText, Subject} from '@material-ui/icons';
import MaterialTable, {MTableToolbar} from 'material-table';

import {Verse, Row} from '..';
import {dataFromBooks, dataFromReference, tableIcons} from './helpers';
import withSelections from './withSelections';
import {SelectionsProvider} from './Selections.context';

const Selectionable = withSelections(SelectionsProvider);

function ParallelScripture ({
  title,
  titles,
  books,
  height,
  reference,
  onQuote,
  quoteVerseObjects,
}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [referenceData, setReferenceData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState(!!reference);
  const [components, setComponents] = useState({});
  const [options, setOptions] = useState({});
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const _referenceData = dataFromReference({books, reference});
    setReferenceData(_referenceData);
    const _bookData = dataFromBooks({books});
    setBookData(_bookData);
  }, [books, reference]);

  useEffect(() => {
    const _data = filter ? referenceData : bookData;
    setData(_data);
  }, [filter, referenceData, bookData]);

  useEffect(() => {
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
    setColumns(_columns);
  }, [titles, books]);

  useEffect(() => {
    const _components = {
      Toolbar: props => <MTableToolbar {...props} classes={{root: classes.toolbar}} />,
      Container: props => <div {...props} />,
      Row: props => (
        <Row {...props} reference={reference} filter={filter} />
      ),
    };
    setComponents(_components);
  }, [classes, reference, filter, columns]);

  useEffect(() => {
    const _options = {
      columnsButton: true,
      search: !filter,
      sorting: false,
      paging: false,
      headerStyle: { position: 'sticky', top: 0, padding: '4px 8px' },
      maxBodyHeight: height,
    }
    setOptions(_options);

    const _actions = [
      {
        icon: () => filter ? <ShortText /> : <Subject/>,
        tooltip: 'Toggle Reference View',
        isFreeAction: true,
        onClick: (event) => setFilter(!filter),
      }
    ];
    setActions(_actions);
  }, [filter, height]);

  const onChangeColumnHidden = useCallback((column, hidden) => {
    const _columns = [...columns];
    const index = parseInt(column.field);
    _columns[index].hidden = hidden;
    setColumns(_columns);
  }, [columns]);

  return (
    <Selectionable
      onQuote={onQuote}
      quoteVerseObjects={quoteVerseObjects}
    >
      <MaterialTable
        title={title || 'Parallel Scripture'}
        columns={columns}
        onChangeColumnHidden={onChangeColumnHidden}
        data={data}
        icons={tableIcons}
        options={options}
        components={components}
        actions={actions}
      />
    </Selectionable>
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
  /** filter the view to the reference */
  filter: PropTypes.bool,
  /** the verseObjects of the verse to get the quote from */
  quoteVerseObjects: PropTypes.array,
  /** callback to return the quote when selections made */
  onQuote: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 'unset',
  },
}));

export default ParallelScripture;