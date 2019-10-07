import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from '@material-ui/lab';
import {MTableBodyRow} from 'material-table';
import {Waypoint} from 'react-waypoint';

function Row ({
  renderOffscreen,
  reference,
  filter,
  ...props
}) {
  const onVisibility = (isVisible) => {
    if (isVisible) setViewed(true);
  };
  const [viewed, setViewed] = useState(renderOffscreen);
  const skeleton = (
    <tr id={props.data.referenceId}>
      <td>
        <Waypoint onEnter={onVisibility} />
        <Skeleton height={110} width='100%' />
        <Waypoint onEnter={onVisibility} />
      </td>
    </tr>
  );
  const [row, setRow] = useState(skeleton);
  const {referenceId} = props.data;

  useEffect(() => {
    if (!viewed) {
      setRow(<MTableBodyRow {...props} />);
      setViewed(true);
    }
  }, [props, viewed]);

  useEffect(() => {
    if (!filter && reference && referenceId) {
      const id = reference.chapter + ':' + reference.verse;
      const element = document.getElementById(id);
      if (element) element.scrollIntoView(true);
    }
  }, [reference, referenceId, viewed, filter]);

  return (
    <>
      <tr id={referenceId} />
      {row}
    </>
  );
}

Row.propTypes = {
    /** the reference to scroll into view */
    reference: PropTypes.shape({
      bookId: PropTypes.string,
      chapter: PropTypes.number,
      verse: PropTypes.number,
    }),
    /** bypass rendering only when visible */
    renderOffscreen: PropTypes.bool,
    /** filter the view to the reference */
    filter: PropTypes.bool,
};

export default Row