import React, {Component} from 'react';
import axios from 'axios';
import * as _ from 'lodash';

class MainSelector extends Component {
    restClient = undefined;

    constructor(props) {
        super(props);
        const self = this;
        const resource = this.props.resource;
        this.state = {
            options:[]
        };
        const setState = options => this.setState(old => ({...old, options}));

        axios.get('rest_client_settings.json').then(res => {
            self.restClient = axios.create(res.data);
            return self.restClient(resource);
        }).then(res => {
            setState(res.data);
        })
    }

    onChange(event) {
        if( this.props.onChange !== undefined) {
            this.props.onChange(event.target.value);
        }
    }

    render() {
        const options = this.state.options;
        const keyName = this.props.keyName;
        const valueName = this.props.valueName;
        const prefix = this.props.resource;
        return (<select onChange={this.onChange.bind(this)}>
            <option key={0} value="-1">All</option>
            {_.map(options, r => {
                return <option key={prefix+r[keyName]} value={r[keyName]}>{r[valueName]}</option>
            })}
        </select>);
    }

}

export default MainSelector;