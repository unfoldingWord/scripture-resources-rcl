import React, {Component} from 'react';

const PkQuery = class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '{ documents { usfmId: header(id:"id") mainSequence { nBlocks } } }',
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
                    <input style={{width: "100%"}} type="text" name="query" value={this.state.query}
                           onChange={async (event) => await this.handleChange(event)}/>
                    </form>
                </div>
                <div>
                    <pre>{this.state.queryResult}</pre>
                </div>
            </div>
        );
    };

}

export default PkQuery;