import React, { Fragment } from 'react';

const PkStatus = function (props) {
     return <Fragment>
        <div>Package Version: {props.pk.packageVersion()}</div>
        <div>N DocSets: {props.pk.nDocSets()}</div>
        <div>N Documents: {Object.keys(props.pk.documents).length}</div>
    </Fragment>
}

export default PkStatus;