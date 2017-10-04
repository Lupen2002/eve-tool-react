import React, {Component} from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import * as _ from 'lodash';

import {EVE_BLUEPRINT_DROP, EVE_BLUEPRINTS_UPDATE} from "../../constants/ActionTypes";

class Blueprints extends Component {

    constructor(props) {
        super(props);
        this.state = {percent: 0}
    }

    incPercent(count) {
        this.setState(() => {
            return {percent: count}
        })
    }

    loadBlueprint() {
        const update = this.props.onUpdateBlueprints;
        const Universe = this.props.eveClient.Universe;
        const inc = this.incPercent.bind(this);
        const drop = this.props.onDropBlueprint.bind(this);

        axios.get('/blueprints.json')
            .then(res => {
                const count = _.values(res.data).length;
                const chunkSize = count / 500;
                let i = 0;
                let j = 0;
                const chunks = _.chunk(_.values(res.data), chunkSize);
                return Promise.all(_.map(chunks, (chunk) => {
                    j += 1;
                    return new Promise((rootResolve) => {
                        setTimeout(() => {
                            Promise
                                .all(_.map(chunk, (blueprint) => {
                                    return new Promise((localResolve) => {
                                        Universe.get_universe_types_type_id({type_id: blueprint.blueprintTypeID})
                                            .then(
                                                res => {
                                                     localResolve({
                                                        ...blueprint,
                                                        type_id: res.obj.type_id,
                                                        name: res.obj.name,
                                                        description: res.obj.description,
                                                        group_id: res.obj.group_id
                                                    })
                                                },
                                                () => {
                                                    localResolve({});
                                                    drop(blueprint.blueprintTypeID)
                                                })
                                    });
                                }))
                                .then(data => {
                                    i += data.length;
                                    inc(i * 100 / count);
                                    rootResolve(data);
                                })
                        }, j * 250)
                    })
                }))
            })
            .then(data => update(_.filter(_.flatten(data), b => 'name' in b)))
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <button onClick={this.loadBlueprint.bind(this)} className="btn btn-xs btn-primary">
                        Load regions
                    </button>
                </div>
                <div className="col-md-10">
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-success progress-bar-striped"
                            style={{width: this.state.percent + '%'}}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        eveClient: state.eveClient,
    }),
    dispatch => ({
        onUpdateBlueprints: (blueprints) => {
            dispatch({
                type: EVE_BLUEPRINTS_UPDATE,
                payload: blueprints
            })
        },
        onDropBlueprint: (id) => {
            dispatch({
                type: EVE_BLUEPRINT_DROP,
                id
            })
        }
    })
)(Blueprints);