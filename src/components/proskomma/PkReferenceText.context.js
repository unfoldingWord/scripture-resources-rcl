import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import PkBase from './PkBase';

const PkReferenceText = class extends PkBase {

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
            '        bs { label }' +
            '        bg { subType }' +
            '        items(withScriptureCV:"%cv%") {\n' +
            '          ... on Token { itemType subType chars }\n' +
            '          ... on Scope { itemType label }\n' +
            '          ... on Graft { itemType subType} } } } } } }';
        this.state = {
            ...super.state,
            lang: "",
            book: "TIT",
            cv: "3:5",
            showFormatting: false
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
                    <h2>Chapter/Verse Reference</h2>
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
                    {
                        [["Format", "showFormatting"]].map(
                            rec =>
                                <div>
                                    <span style={labelStyle}>{rec[0]}</span>
                                    <input
                                        type="checkbox"
                                        name={rec[1]}
                                        checked={this.state[rec[1]]}
                                        onChange={
                                            async (event) =>
                                                await this.handleCheckboxChange(event, rec[1])
                                        }
                                    />
                                </div>
                        )
                    }
                </form>
            </div>
        );
    }

    versesText() {
        const itemText = i => {
            if (i.itemType === "token") {
                return i.chars.replace(/[ \n\r\t]+/, " ");
            } else {
                return "";
            }
        }
        const itemHtml = i => {
            if (i.itemType === "token") {
                return i.chars.replace(/[ \n\r\t]+/, " ");
            } else if (i.itemType === "graft") {
                return <span style={{color: "red"}}>{` [graft ${i.subType}] `}</span>;
            } else if (i.itemType === "startScope") {
                if (i.label.startsWith("chapter/")) {
                    return <i style={{color: "green", fontWeight: "bold"}}>{`[c${i.label.split("/")[1]}] `}</i>;
                } else if (i.label.startsWith("verse/")) {
                    return <i style={{color: "green"}}>{`[v${i.label.split("/")[1]}] `}</i>;
                } else if (i.label.startsWith("span/")) {
                    return <span style={{color: "blue"}}>{`[${i.label.split("/")[1]}]`}</span>;
                }
            } else if (i.itemType === "endScope") {
                if (i.label.startsWith("span/")) {
                    return <span style={{color: "blue"}}>{`[/${i.label.split("/")[1]}]`}</span>;
                }
            } else {
                return "";
            }
        }
        const blocksHtml = blocks => {
            if (this.state.showFormatting) {
                let itemCount = 1;
                return blocks.map(
                    block => {
                        const blockHtml = block.items.map(
                            i => itemHtml(i)
                        );
                        return (
                            <Fragment>
                                {
                                    block.bg.map(
                                        g => <div key={itemCount++}
                                                  style={{color: "red"}}>{`[graft ${g.subType}]`}</div>
                                    )
                                }
                                <div key={`i${itemCount++}`}><b
                                    style={{color: "blue"}}>[{block.bs.label.split("/")[1]}] </b> {blockHtml}</div>
                            </Fragment>
                        );
                    }
                )
            } else {
                const blocksTextString = blocks.map(
                    block => block.items.map(
                        i => itemText(i)
                    ).map(
                        t => t.replace(/[ \n\r\t]+/, " ")
                    ).join("")
                ).join(" ");
                return (<p>{blocksTextString.trim()}</p>);
            }
        }
        if ("errors" in this.jsonResult) {
            return (<div>{JSON.stringify(this.jsonResult.errors, null, 2)}</div>);
        } else if (!("data" in this.jsonResult)) {
            return (<div>Calculating...</div>);
        } else {
            let count = 0;
            return this.jsonResult.data.docSets.map(ds => {
                return (
                    <div key={`n${count++}`}>
                        <h3>{`${ds.lang}/${ds.abbr}`}</h3>
                        {blocksHtml(ds.document.sequence.blocks)}
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                {this.formHTML()}
                <div style={{fontStyle: "italic", marginTop: "1em"}}>Query completed
                    in {this.state.queryTime} msec
                </div>
                <div>
                    {
                        ("errors" in this.jsonResult) ?
                            <h2>Error when running query</h2> :
                            <h2>Text for Reference '{this.state.book} {this.state.cv}'</h2>
                    }
                    <div style={{fontSize: "small"}}>{this.versesText()}</div>
                </div>
                {this.rawQueryHTML()}
            </div>
        );
    };

}

PkReferenceText
    .propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.object.isRequired,
};

export default PkReferenceText;
