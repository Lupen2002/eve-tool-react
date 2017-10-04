import React, {Component} from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import swagger from 'swagger-client'

import Page from './Page';
import MainSelector from "./selectors/MainSelector";

Number.prototype.formatMoney = function(c = 2, d = ".", t = ","){
    let n = this;
    const s = n < 0 ? "-" : "";
    const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    const j = i.length > 3 ? i.length % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

class BlueprintsView extends Component {

    restClient = undefined;
    swaggerClient = undefined;

    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            blueprints: [],
            regionId: -1
        };

        swagger('https://esi.tech.ccp.is/latest/swagger.json').then(client => {
            self.swaggerClient = client;
            console.log(client)
        });

        axios.get('rest_client_settings.json').then(res => {
            self.restClient = axios.create(res.data);
        })
    }

    onChangeMarketGroup(marketId) {
        const update = blueprints => this.setState(old => ({...old, blueprints}));
        if (marketId > 0) {
            this.restClient.get('blueprints/profit/'+marketId)
                .then(res => {
                    update(res.data);
                })
        } else {
            this.restClient.get('blueprints/profit')
                .then(res => {
                    update(res.data);
                })
        }

    }

    onChangeRegion(id) {
        console.log(id);
        const update = blueprints => this.setState(old => ({...old, blueprints}));
        const Market = this.swaggerClient.apis.Market; //get_markets_region_id_history
        if(id > 0) {
            Promise.all(
                _.map(this.state.blueprints, b => {
                    return Market.get_markets_region_id_history({
                        region_id:id,
                        type_id: b.blueprint.activities.manufacturing.products["0"].typeID
                    }).then(res => ({
                        ...b,
                        volume: _.sumBy(res.obj, 'volume') / res.obj.length,
                        price: _.sumBy(res.obj, 'average') / res.obj.length
                    }))
                })
            ).then(res => {
                update(res);
            });
        }
    }


    render() {
        const maxV = _.max(_.map(this.state.blueprints, b => b.volume));
        const maxP = _.max(_.map(this.state.blueprints, b => b.profitability));
        const maxS = _.max(_.map(this.state.blueprints, b => b.value));

        console.log(maxV, maxP, maxS);
        const blueprints = _.reverse(
            _.sortBy(_.map(
                this.state.blueprints,
                b => ({
                    ...b,
                    index: (250.0 * ((maxP!==undefined)?b.profitability / maxP:1.0))
                        *(100.0 *((maxS!==undefined)? b.value / maxS:1.0))
                        *(100.0 *((maxV!==undefined)?b.volume / maxV:1.0))})),
                ["index", "profitability"]));
        return (
            <Page>
                <h1>Обзор чертежей</h1>
                <div className="row">
                    <div className="col-md-3">
                        <MainSelector onChange={this.onChangeRegion.bind(this)} resource='regions' keyName='id' valueName='name' />
                    </div>
                    <div className="col-md-9">
                        <MainSelector resource='market_groups/root' keyName='id' valueName='name' onChange={this.onChangeMarketGroup.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-xs">loads</button>
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th>Рентабильность</th>
                            <th>ISK/ч</th>
                            <th>Идекс выгоды</th>
                            <th>Объем</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(blueprints, b => {
                            return <tr key={b.blueprint.id}>
                                <td>{b.blueprint.name}</td>
                                <td>{b.profitability.formatMoney(2, '.', ',')}</td>
                                <td>{b.value.formatMoney(2, '.', ',')}</td>
                                <td>{(b.index !== undefined)?b.index.formatMoney(2, '.', ','):""}</td>
                                <td>{(b.volume !== undefined)?b.volume.formatMoney(2, '.', ','):""}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </Page>
        );
    }
}

export default BlueprintsView;