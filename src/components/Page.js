import React, {Component} from 'react';
import NavBar from "./NavBar";
import Menu from "./Menu";

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import * as types from '../constants/ActionTypes'

class Page extends Component {
    render() {
        return (
            <div className="container-fluid">
                <NavBar/>
                <div className="row">
                    <div className="col-md-3">
                        <Menu
                            pathname={this.props.location.pathname}
                            items={this.props.menu.items}
                            onActivate={this.props.onActivateMenuItem}/>
                    </div>
                    <div className="col-md-9">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    state => ({
        location: state.router.location,
        menu: state.menu
    }),
    dispatch => ({
        onActivateMenuItem: (itemId) => {
            console.log(itemId);
            dispatch({
                type: types.MENU_ACTIVATE,
                itemId
            })
        }
    })
)(Page));