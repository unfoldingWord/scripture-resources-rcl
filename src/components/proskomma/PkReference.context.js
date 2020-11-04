import React from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkReference = class extends PkBase {

    constructor(props) {
        super(props);
        this.queryTemplate = '{ docSets(withBook:"%book%"%lang%) {\n' +
            '  org: selector(id:"org")' +
            '  lang: selector(id:"lang")' +
            '  abbr: selector(id:"abbr")' +
            '  document: documentWithBook(bookCode:"%book%") {\n' +
            '    book: header(id:"bookCode") \n' +
            '    sequence: mainSequence {\n' +
            '      blocks(withScriptureCV:"%cv%") {\n' +
            '        items(withScriptureCV:"%cv%") {\n' +
            '          ... on Token { itemType subType chars }\n' +
            '          ... on Scope { itemType label }\n' +
            '          ... on Graft { itemType } } } } } } }';
        this.state = {
            ...super.state,
            lang: "",
            book: "TIT",
            cv: "3:5",
            showBlocks: true
        };
    }

    substitutedQuery() {
        let langClause = "";
        if (this.state.lang !== "") {
            langClause = ` selectorKeys:["lang"] selectorValues:["${this.state.lang}"]`;
        }
        return this.queryTemplate
            .replace(/%book%/g, this.state.book)
            .replace(/%cv%/g, this.state.cv)
            .replace(/%lang%/g, langClause);
    }

    formHTML() {
        const labelStyle = {display: "inline-block", width: "7em", "fontWeight": "bold"};
        const inputStyle = {"backgroundColor": "#EEF", "padding": "5px", "marginTop": "5px"};
        return (
            <div>
                <form>
                    <h3>Chapter/Verse Reference</h3>
                    {
                        [["Lang", "lang"], ["Book", "book"], ["CV Spec", "cv"]]
                            .map(
                                rec =>
                                    <div>
                                        <span style={labelStyle}>{rec[0]}</span>
                                        <input
                                            name={rec[1]}
                                            type="text"
                                            value={this.state[rec[1]]}
                                            style={inputStyle}
                                            onChange={
                                                async (event) =>
                                                    await this.handleChange(event, rec[1])
                                            }
                                        />
                                    </div>
                            )
                    }
                    <div>
                        <span style={labelStyle}>Show Blocks</span>
                        <input
                            type="checkbox"
                            name="showBlocks"
                            checked={this.state.showBlocks}
                            onChange={
                                async (event) =>
                                    await this.handleCheckboxChange(event, "showBlocks")
                            }
                        />
                    </div>
                </form>
            </div>
        );
    }

    versesText() {
        const docHtml = blocks => {
            const blocksText = blocks.map(
                b => b.items.map(
                    i => i.itemType === "token" ? i.chars : ""
                ).map(
                    t => t.replace(/[ \n\r\t]+/, " ")
                ).join("")
            );
            if (this.state.showBlocks) {
                return (blocksText.map(b => <p>{b}</p>));
            } else {
                return (<p>{blocksText.join(" ").trim()}</p>);
            }
        };
        if ("errors" in this.jsonResult) {
            return (<div>{JSON.stringify(this.jsonResult.errors, null, 2)}</div>);
        } else if (!("data" in this.jsonResult)) {
            return (<div>Calculating...</div>);
        } else {
            console.log(JSON.stringify(this.jsonResult, null, 2));
            let count = 0;
            return this.jsonResult.data.docSets.map(ds => {
                return (
                    <div key={`n${count++}`}>
                        <h4>{`${ds.lang}/${ds.abbr}`}</h4>
                        {docHtml(ds.document.sequence.blocks)}
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                {this.formHTML()}
                <div>
                    <h3>Text for Verse</h3>
                    <div>{this.versesText()}</div>
                </div>
                {this.rawQueryHTML()}
            </div>
        );
    };

}

PkReference.propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.object.isRequired,
};

export default PkReference;
