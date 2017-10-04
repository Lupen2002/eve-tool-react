import React, {Component} from 'react';

import {connect} from 'react-redux';
import Page from './Page';
import MainSelector from './selectors/MainSelector';


class Analytics extends Component {

    onLoadStatistic(){
        console.log("!!!!")
    }

    render() {
        return (
            <Page>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Анализ Рынков</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <MainSelector resource='regions' keyName='id' valueName='name' />
                    </div>
                    <div className="col-md-9">
                        <MainSelector resource='market_groups' keyName='id' valueName='name' />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <button onClick={this.onLoadStatistic.bind(this)} className="btn btn-xs">loads</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Назание</th>
                                <th>Кол-во</th>
                                <th>Объем</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Page>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(Analytics);