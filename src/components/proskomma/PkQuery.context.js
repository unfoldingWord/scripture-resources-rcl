import React, {Component} from 'react';

const PkQuery = class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '{ docSets: docSetsWithBook(bookCode:"TIT") {\n' +
                '  lang: selector(id:"lang") abbr: selector(id:"abbr") document: documentWithBook(bookCode:"TIT") {\n' +
                '    book: header(id:"bookCode") \n' +
                '    sequence: mainSequence {\n' +
                '      blocks: blocksForScopes(scopes:["chapter/1", "verse/2"]) {\n' +
                '        items: prunedItems(requiredScopes:["chapter/1", "verse/2"]) {\n' +
                '          ... on Token { itemType subType chars }\n' +
                '          ... on Scope { itemType label }\n' +
                '          ... on Graft { itemType } } } } } } }',
            queryResult: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.doQuery();
    }

    handleChange(event) {
        if (event) {
            this.setState(
                {query: event.target.value},
                () => this.doQuery()
                );
        }
    }

    async doQuery() {
        let result;
        try {
            result = JSON.stringify(await this.props.pk.gqlQuery(this.state.query), null, 2);
        } catch (err) {
            result = `ERROR: ${err}`;
        }
        this.setState({queryResult: result});
    }

    render() {
        return (
            <div>
                <div>
                    <form>
                        <h3>Query (editable)</h3>
                    <textarea style={{padding:"10px", "backgroundColor":"#EEF"}} rows="10" cols="80" type="text" name="query" value={this.state.query}
                           onChange={async (event) => await this.handleChange(event)}/>
                    </form>
                </div>
                <div>
                    <h3>Result</h3>
                    <pre>{this.state.queryResult}</pre>
                </div>
            </div>
        );
    };

}

export default PkQuery;