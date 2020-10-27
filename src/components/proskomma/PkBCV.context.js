import React from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkBCV = class extends PkBase {

    constructor(props) {
        super(props);
        this.queryTemplate = '{ docSets: docSetsWithBook(bookCode:"%book%") {\n' +
            '  lang: selector(id:"lang") abbr: selector(id:"abbr") document: documentWithBook(bookCode:"%book%") {\n' +
            '    book: header(id:"bookCode") \n' +
            '    sequence: mainSequence {\n' +
            '      blocks: blocksForScopes(scopes:["chapter/%chapter%", "verse/%verse%"]) {\n' +
            '        items: prunedItems(requiredScopes:["chapter/%chapter%", "verse/%verse%"]) {\n' +
            '          ... on Token { itemType subType chars }\n' +
            '          ... on Scope { itemType label }\n' +
            '          ... on Graft { itemType } } } } } } }';
        this.state = {
            ...super.state,
            book: "TIT",
            chapter: "3",
            verse: "5"
        };
    }

    substitutedQuery() {
        return this.queryTemplate.replace(/%book%/g, this.state.book)
            .replace(/%chapter%/g, this.state.chapter)
            .replace(/%verse%/g, this.state.verse);
    }

    formHTML() {
        const labelStyle = {display: "inline-block", width: "5em", "fontWeight": "bold"};
        const inputStyle = {"backgroundColor": "#EEF", "padding": "5px", "marginTop": "5px"};
        return (
                <div>
                    <form>
                        <h3>Verse Reference</h3>
                        <div>
                            <span style={labelStyle}>Book</span>
                            <input
                                name="book"
                                type="text"
                                value={this.state.book}
                                style={inputStyle}
                                onChange={async (event) => await this.handleChange(event, "book")}/>
                        </div>
                        <div>
                            <span style={labelStyle}>Chapter</span>
                            <input
                                name="chapter"
                                type="text"
                                value={this.state.chapter}
                                style={inputStyle}
                                onChange={async (event) => await this.handleChange(event, "chapter")}/>
                        </div>
                        <div>
                            <span style={labelStyle}>Verse</span>
                            <input
                                name="verse"
                                type="text"
                                value={this.state.verse}
                                style={inputStyle}
                                onChange={async (event) => await this.handleChange(event, "verse")}/>
                        </div>
                    </form>
                </div>
        );
    }

    versesText() {
        const verseText = blocks => {
            return blocks.map(
                b => b.items.map(
                    i => i.itemType === "token" ? i.chars : ""
                ).map(
                    t => t.replace(/[ \n\r\t]+/, " ")
                ).join("")
            ).join(" ")
                .trim();

        };
        if ("data" in this.jsonResult) {
            let count = 0;
            return this.jsonResult.data.docSets.map(ds => {
                return (
                    <div key={`n${count++}`}>
                        <h4>{`${ds.lang}/${ds.abbr}`}</h4>
                        <p>{verseText(ds.document.sequence.blocks)}</p>
                    </div>
                );
            });
        } else {
            return (<div>Calculating...</div>);
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

PkBCV.propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.string.isRequired,
};

export default PkBCV;