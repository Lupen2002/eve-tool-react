import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {} from '../../constants/ActionTypes'

let restClient = undefined;

axios.get('rest_client_settings.json').then(res => {
    restClient = axios.create(res.data)
});

class MarketGroups extends Component {

    static loadMarketGroups() {
        if (restClient !== undefined) {
            restClient.get('load/market_groups');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <button onClick={MarketGroups.loadMarketGroups} className="btn btn-xs btn-primary">
                        Load market groups
                    </button>
                </div>
                <div className="col-md-10">
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(MarketGroups);