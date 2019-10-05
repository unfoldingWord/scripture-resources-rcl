import React, {forwardRef} from 'react';
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export const referenceIdsFromBooks = ({books}) => {
  const referenceIds = new Set([]);
  books.forEach((book) => {
    const bookIndex = {};
    Object.keys(book.chapters).forEach(chapterKey => {
      const chapter = book.chapters[chapterKey];
      Object.keys(chapter).forEach(verseKey => {
        const verse = chapter[verseKey];
        const referenceId = chapterKey + ':' + verseKey;
        bookIndex[referenceId] = verse;
        referenceIds.add(referenceId);
      });
    });
  });
  return [...referenceIds];
};

export const dataFromBooks = ({books}) => {
  const referenceIds = referenceIdsFromBooks({books});
  const data = referenceIds.map(referenceId => {
    let row = {referenceId};
    books.forEach((_, index) => {
      const [chapterKey, verseKey] = referenceId.split(':');
      const verse = books[index].chapters[chapterKey][verseKey];
      if (verse) row[index] = JSON.stringify({referenceId, ...verse});
    });
    return row;
  });
  return data;
};

export const dataFromReference = ({books, reference}) => {
  const referenceId = referenceIdFromReference(reference);
  let row = {referenceId};
  books.forEach((_, index) => {
    const verse = books[index].chapters[reference.chapter][reference.verse];
    if (verse) row[index] = JSON.stringify({referenceId, ...verse});
  });
  const data = [row];
  return data;
};

export const referenceIdFromReference = (reference) => reference.chapter + ':' + reference.verse;

export const referenceFromReferenceId = (referenceId) => {
  const [chapter, verse] = referenceId.split(':');
  return {chapter, verse};
};

