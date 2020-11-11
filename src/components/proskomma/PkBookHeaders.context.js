import React from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkBookHeaders = class extends PkBase {

    constructor(props) {
        super(props);
        this.queryTemplate = '{ ' +
            '  docSets (' +
            '    selectorKeys:%selectorKeys%' +
            '    selectorValues:%selectorValues%' +
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
        const stringifyArray = a => '[' + a.map(i => `"${i}"`).join(", ") + ']';

        return this.queryTemplate
            .replace(/%selectorKeys%/g, stringifyArray(this.props.selectorKeys))
            .replace(/%selectorValues%/g, stringifyArray(this.props.selectorValues))
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