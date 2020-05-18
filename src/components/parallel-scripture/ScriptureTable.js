import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  ShortText,
  Subject,
  ViewColumn,
} from '@material-ui/icons';
import {
  Table,
  TableBody,
} from '@material-ui/core';
import { localString } from '../../core/localStrings';

import {
  Row,
  Headers,
  Toolbar,
  ColumnsMenu,
} from '..';
import {
  referenceIdsFromBooks,
  referenceIdFromReference,
  versesFromReferenceIdAndBooks,
} from './helpers';

//** DEBUG REMOVE LATER */
import SelectionsContext from '../selections/Selections.context';
import ResourcesContext from '../resources/Resources.context';

function ScriptureTable ({
  title,
  titles,
  books,
  height,
  reference,
  buttons,
  renderOffscreen = {}
}) {

  //** DEBUG REMOVE LATER */
  const selectionsContext = React.useContext(SelectionsContext);
  console.log("ScriptureTable() selectionsContext=",selectionsContext)
  const resourcesContext = React.useContext(ResourcesContext);
  console.log("ScriptureTable() resourcesContext=",resourcesContext)


  const classes = useStyles();
  const [filter, setFilter] = useState(!!reference);
  const [referenceIds, setReferenceIds] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnsMenuAnchorEl, setColumnsMenuAnchorEl] = useState();


  useEffect(() => {
    const _columns = titles.map((title, index) => ({id: index, label: title}));
    setColumns(_columns);
  }, [titles]);

  useEffect(() => {
    const _referenceIds = referenceIdsFromBooks({books});
    setReferenceIds(_referenceIds);
  }, [books]);

  const actions = [
    {
      icon: <ViewColumn fontSize='small' />,
      tooltip: localString('ViewVersions'),
      onClick: (event) => setColumnsMenuAnchorEl(event.currentTarget),
      menu: (
        <ColumnsMenu
          columns={columns}
          onColumns={setColumns}
          anchorEl={columnsMenuAnchorEl}
          onAnchorEl={setColumnsMenuAnchorEl}
        />
      ),
    },
    {
      icon: ( filter ? <ShortText fontSize='small' /> : <Subject fontSize='small' /> ),
      tooltip: filter ? localString('ExpandChapter') : localString('CollapseChapter'),
      onClick: (event) => setFilter(!filter),
    },
  ];

  let _referenceIds = referenceIds;
  if (filter && reference.chapter && reference.verse) _referenceIds = [referenceIdFromReference(reference)];

  useEffect(() => {
    const scrollReferenceId = referenceIdFromReference(reference);
    if (!filter) {
      const element = document.getElementById(scrollReferenceId);
      if (element) {
        element.scrollIntoView(true);
        document.getElementById('wrapY').scrollTop -= 30;
      }
    }
  }, [filter, reference]);

  return (
    <div>
      <Toolbar title={title} actions={actions} buttons={buttons} />
      <div id='wrapY' className={classes.wrapY} style={{maxHeight: height}} >
        <Table className={classes.table}>
          <Headers columns={columns} />
          <TableBody className={classes.tableBody}>
            { 
              _referenceIds.map(referenceId => {
                const verses = versesFromReferenceIdAndBooks({referenceId, books});
                const row = (
                  <Row
                    renderOffscreen={renderOffscreen[referenceId]}
                    key={referenceId}
                    verses={verses}
                    referenceId={referenceId}
                    reference={reference}
                    filter={filter}
                    columns={columns}
                  />
                );
                return row;
              })
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

ScriptureTable.propTypes = {
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
  renderOffscreen: PropTypes.object,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
  /** override text direction detection */
  direction: PropTypes.string,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
  /** filter the view to the reference */
  filter: PropTypes.bool,
  /** pass the quote in from parent state */
  quote: PropTypes.string,
  /** callback to return the quote when selections made */
  onQuote: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
  },
  wrapY: {
    overflowY: 'auto',
    overflowX: 'auto',
  },
  table: {
  },
  tableBody:{
  }
}));

export default ScriptureTable;