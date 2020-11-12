import React from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkBookHeaders = class extends PkBase {

    constructor(props) {
        super(props);
        this.queryTemplate = '{ ' +
            '  docSets (' +
            '    withSelectors:%withSelectors%' +
            '    withBook:"%bookCode%"' +
            '  ) {' +
            '    selectorString' +
            '    selectors { key value }' +
            '    document(bookCode:"%bookCode%") {' +
            '      headers { key value }' +
            '    }' +
            '  }' +
            '}';
    }

    substitutedQuery() {
        return this.queryTemplate
            .replace(/%withSelectors%/g, `[${this.props.withSelectors.map(s => `{key:"${s.key}", value:"${s.value}"}`)}]`)
            .replace(/%bookCode%/g, this.props.bookCode);
    }

    render() {
        return this.rawQueryHTML();
    }

};

PkBookHeaders.propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.object.isRequired,
    /** Selector filter keys (empty array for all docSets) */
    "selectorKeys": PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Selector filter values (empty array for all docSets) */
    "selectorValues": PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Book code (eg 'GEN') */
    "bookCode": PropTypes.string.isRequired
};

export default PkBookHeaders;