import React, {Component} from 'react';
import PkBase from './PkBase';
import PropTypes from "prop-types";

const PkQuery = class extends PkBase {

    // Query handling is a bit weird since it isn't normal to have user-editable queries

    constructor(props) {
        super(props);
        this.queryTemplate = '';
        this.state = {
            query: '{ docSets: docSetsWithBook(bookCode:"TIT") {\n' +
                '  lang: selector(id:"lang") abbr: selector(id:"abbr") document: documentWithBook(bookCode:"TIT") {\n' +
                '    book: header(id:"bookCode") \n' +
                '    sequence: mainSequence {\n' +
                '      blocks: blocksForScopes(scopes:["chapter/1", "verse/2"]) {\n' +
                '        items: prunedItems(requiredScopes:["chapter/1", "verse/2"]) {\n' +
                '          ... on Token { itemType subType chars }\n' +
                '          ... on Scope { itemType label }\n' +
                '          ... on Graft { itemType } } } } } } }'
        };
    }

    substitutedQuery() {
        return this.state.query;
    }

    render() {
        return (
            <div>
                <div>
                    <form>
                        <h3>Query (editable)</h3>
                    <textarea
                        style={{padding:"10px", "backgroundColor":"#EEF"}}
                        rows="10"
                        cols="80"
                        type="text"
                        name="query"
                        value={this.state.query}
                        onChange={async (event) => await this.handleChange(event, "query")}
                    />
                    </form>
                </div>
                {this.rawQueryHTML()}
            </div>
        );
    };

}

PkQuery.propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.string.isRequired,
};

export default PkQuery;