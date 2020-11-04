import React from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkQuery = class extends PkBase {

    // Query handling is a bit weird since it isn't normal to have user-editable queries

    constructor(props) {
        super(props);
        this.queryTemplate = '';
        this.state = {
            query: '{\n' +
                '  docSets(withBook:"TIT") {\n' +
                '    org: selector(id:"org")\n' +
                '    lang: selector(id:"lang")\n' +
                '    abbr: selector(id:"abbr")\n' +
                '    document: documentWithBook(bookCode:"TIT") {\n' +
                '      book: header(id:"bookCode") \n' +
                '      sequence: mainSequence {\n' +
                '        blocks(withScopes:["chapter/1", "verse/2"]) {\n' +
                '          items(withScopes:["chapter/1", "verse/2"]) {\n' +
                '            ... on Token { itemType subType chars }\n' +
                '            ... on Scope { itemType label }\n' +
                '            ... on Graft { itemType }\n' +
                '          }\n' +
                '        }\n' +
                '      }\n' +
                '    }\n' +
                '  }\n' +
                '}'
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
                        rows="20"
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
    "pk": PropTypes.object.isRequired,
};

export default PkQuery;