import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import createHistory from 'history/createHashHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import Home from './components/Home';

import * as reducers from './reducers';
import {} from './constants/ActionTypes';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'font-awesome/css/font-awesome.min.css'

import registerServiceWorker from './registerServiceWorker';
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import BlueprintsView from "./components/BlueprintsView";

const history = createHistory();

const store = createStore(
    combineReducers({...reducers, router: routerReducer}),
    composeWithDevTools(
        applyMiddleware(thunk, routerMiddleware(history)),
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/settings" component={Settings}/>
                <Route exact path="/analytics" component={Analytics}/>
                <Route exact path="/blueprints" component={BlueprintsView}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
