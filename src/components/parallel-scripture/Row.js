import React, {useState, useEffect} from 'react';
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
    <div id={props.data.referenceId}>
      <Waypoint onEnter={onVisibility} />
      <Skeleton height={110} width='100%' />
      <Waypoint onEnter={onVisibility} />
    </div>
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

export default Row