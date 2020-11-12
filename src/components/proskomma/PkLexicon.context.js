import React from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkLexicon = class extends PkBase {

    constructor(props) {
        super(props);
        this.queryTemplate = `{
        docSets {
            org: selector(id:"org")
            lang: selector(id:"lang")
            abbr: selector(id:"abbr")
            documents {
                sequence: mainSequence {
                    blocks(withScopes:["blockTag/zlex%displayField%", "%searchScope%"]) {
                        scopeLabels
                        text
                    }
                }
            }
        }
    }`;
        this.state = {
            displayField: "orth",
            search: ""
        };
    }

    substitutedQuery() {
        let searchScope="XXX";
        if (this.state.search.trim().length > 0) {
            if (this.state.search.includes("G")) {
                searchScope=`attribute/milestone/zlexentry/x-strongs/0/${this.state.search.trim()}`;
            } else {
                searchScope=`attribute/milestone/zlexentry/x-lemma/0/${this.state.search.trim()}`;
            }
        }
        return this.queryTemplate
            .replace(/%displayField%/g, this.state.displayField)
            .replace(/%searchScope%/g, searchScope);
    }

    render() {
        const labelStyle = {display: "inline-block", width: "7em", "fontWeight": "bold"};
        const inputStyle = {"backgroundColor": "#EEF", "padding": "5px", "marginTop": "5px"};
        return (
            <div>
                <div>
                    <form>
                        <h3>Lexicon</h3>
                        <div>
                            <span style={labelStyle}>Search</span>
                            <input
                                name="search"
                                type="text"
                                value={this.state.search}
                                style={inputStyle}
                                onChange={
                                    async (event) =>
                                        await this.handleChange(event, "search")
                                }
                            />
                        </div>
                        <div>
                            <span style={labelStyle}>Display Field</span>
                            {
                                ["orth", "brief", "full"].map(
                                    b => <span>
                                    <input
                                        type="radio"
                                        name="displayField"
                                        value={b}
                                        checked={b === this.state.displayField}
                                        onChange={
                                            async (event) =>
                                                await this.handleChange(event, "displayField")
                                        }
                                    />
                                        {b}
                                </span>
                                )
                            }
                        </div>
                    </form>
                </div>
                {this.rawQueryHTML()}
            </div>
        );
    };

}

PkLexicon.propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.object.isRequired,
};

export default PkLexicon;