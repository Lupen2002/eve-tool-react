import React, {Component} from 'react';

import Page from './Page'

import Regions from './settings/Regions';
import MarketGroups from './settings/MarketGroups';
import Blueprints from './settings/Blueprints'

class Settings extends Component {
    render() {
        return (
            <Page>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Настройки</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Regions/>
                        <MarketGroups/>
                        <Blueprints/>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Settings;