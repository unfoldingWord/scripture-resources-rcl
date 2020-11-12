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
            '  docSets(\n' +
            '    withBook:"TIT"\n' +
            '    withSelectors:[{key:"lang", value:"en"}]\n' +
            '  ) {\n' +
            '    org: selector(id:"org")\n' +
            '    lang: selector(id:"lang")\n' +
            '    abbr: selector(id:"abbr")\n' +
            '    document(bookCode:"TIT") {\n' +
            '      book: header(id:"bookCode")\n' +
            '      sequence: mainSequence {\n' +
            '        blocks(\n' +
            '          withScriptureCV:"1:1"\n' +
            '          attSpecs:[\n' +
            '            [\n' +
            '              {attType:"spanWithAtts", tagName:"w", attKey:"strong", valueN:0},\n' +
            '              {attType:"spanWithAtts", tagName:"w", attKey:"strongs", valueN:0},\n' +
            '              {attType:"milestone", tagName:"zaln", attKey:"x-strong", valueN:0}\n' +
            '            ],\n' +
            '            [\n' +
            '              {attType:"spanWithAtts", tagName:"w", attKey:"strong", valueN:0},\n' +
            '              {attType:"spanWithAtts", tagName:"w", attKey:"strongs", valueN:0},\n' +
            '              {attType:"milestone", tagName:"zaln", attKey:"x-strong", valueN:0}\n' +
            '            ]\n' +
            '          ]\n' +
            '          attValues:[["G39720"], ["G14010"]]\n' +
            '          allAtts:false\n' +
            '        ) {\n' +
            '          bs { label }\n' +
            '          bg { subType }\n' +
            '          items(withScriptureCV:"1:1") {\n' +
            '            ... on Token { itemType subType chars }\n' +
            '            ... on Scope { itemType label }\n' +
            '            ... on Graft { itemType subType}\n' +
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
                        style={{padding:"10px", "backgroundColor":"#EEF", fontSize: "small"}}
                        rows="40"
                        cols="100"
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