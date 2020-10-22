import React, {Component} from 'react';

const PkBCV = class extends Component {

    constructor(props) {
        super(props);
        this.jsonResult = {};
        this.queryTemplate = '{ docSets: docSetsWithBook(bookCode:"%book%") {\n' +
            '  lang abbr document: documentWithBook(bookCode:"%book%") {\n' +
            '    book: header(id:"bookCode") \n' +
            '    sequence: mainSequence {\n' +
            '      blocks: blocksForScopes(scopes:["chapter/%chapter%", "verse/%verse%"]) {\n' +
            '        items: prunedItems(requiredScopes:["chapter/%chapter%", "verse/%verse%"]) {\n' +
            '          ... on Token { itemType subType chars }\n' +
            '          ... on Scope { itemType label }\n' +
            '          ... on Graft { itemType } } } } } } }';
        this.state = {
            book: "TIT",
            chapter: "3",
            verse: "5",
            queryResult: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.doQuery();
    }

    substitutedQuery() {
        return this.queryTemplate.replace(/%book%/g, this.state.book)
            .replace(/%chapter%/g, this.state.chapter)
            .replace(/%verse%/g, this.state.verse);
    }

    handleChange(event, field) {
        if (event) {
            this.setState(
                {[field]: event.target.value},
                () => this.doQuery()
            );
        }
    }

    async doQuery() {
        let result;
        try {
            this.jsonResult = await this.props.pk.gqlQuery(this.substitutedQuery());
            result = JSON.stringify(this.jsonResult, null, 2);
        } catch (err) {
            result = `ERROR: ${err}`;
            this.jsonResult = {};
        }
        this.setState({queryResult: result});
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
            return this.jsonResult.data.docSets.map(ds => {
                return (
                    <div>
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
                <div>
                    <form>
                        <h3>Verse Reference</h3>
                        <div>
                            <span style={{display: "inline-block", width: "5em"}}>Book</span>
                            <input
                                name="book"
                                type="text"
                                value={this.state.book}
                                onChange={async (event) => await this.handleChange(event, "book")}/>
                        </div>
                        <div>
                            <span style={{display: "inline-block", width: "5em"}}>Chapter</span>
                            <input
                                name="chapter"
                                type="text"
                                value={this.state.chapter}
                                onChange={async (event) => await this.handleChange(event, "chapter")}/>
                        </div>
                        <div>
                            <span style={{display: "inline-block", width: "5em"}}>Verse</span>
                            <input
                                name="verse"
                                type="text"
                                value={this.state.verse}
                                onChange={async (event) => await this.handleChange(event, "verse")}/>
                        </div>
                    </form>
                </div>
                <div>
                    <h3>Text for Verse</h3>
                    <div>{this.versesText()}</div>
                </div>
                <div>
                    <h3>Raw GraphQL Result</h3>
                    <pre>{this.state.queryResult}</pre>
                </div>
            </div>
        );
    };

}

export default PkBCV;