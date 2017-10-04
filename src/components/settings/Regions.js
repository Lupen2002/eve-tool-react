import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';



let restClient = undefined;

axios.get('rest_client_settings.json').then(res => {
    restClient = axios.create(res.data)
});

class Regions extends Component {

    static loadRegions() {
        if (restClient !== undefined) {
            restClient.get('load/regions');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <button onClick={Regions.loadRegions} className="btn btn-xs btn-primary">
                        Load regions
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
)(Regions);