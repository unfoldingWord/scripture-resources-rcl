import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PkBase = class extends Component {

    constructor(props) {
        super(props);
        this.jsonResult = {};
        this.queryTemplate = '{ processor packageVersion nDocSets nDocuments selectors { name type } }';
        this.state = {
            queryResult: "",
            queryTime: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.doQuery();
    }

    handleChange(event, field) {
        if (event) {
            this.setState(
                {[field]: event.target.value},
                () => this.doQuery()
            );
        }
    }

    handleCheckboxChange(event, field) {
        if (event) {
            this.setState(
                {[field]: event.target.checked},
                () => this.doQuery()
            );
        }
    }

    substitutedQuery() {
        return this.queryTemplate;
    }

    async doQuery() {
        let result;
        let endTime;
        const startTime = Date.now();
        try {
            this.jsonResult = await this.props.pk.gqlQuery(this.substitutedQuery());
            endTime = Date.now();
            result = JSON.stringify(this.jsonResult, null, 2);
        } catch (err) {
            result = `ERROR: ${err}`;
            this.jsonResult = {};
        }
        this.setState({
            queryResult: result,
            queryTime: endTime - startTime
        });
    }

    rawQueryHTML() {
        return (
            <div>
                <h2>Raw GraphQL Result ({this.state.queryTime} msec)</h2>
                <pre style={{fontSize: "x-small"}}>{this.state.queryResult}</pre>
            </div>
        );
    }

    render() {
        return this.rawQueryHTML();
    };

}

PkBase.propTypes = {
    /** The ProsKomma instance */
    "pk": PropTypes.object.isRequired,
};

export default PkBase;