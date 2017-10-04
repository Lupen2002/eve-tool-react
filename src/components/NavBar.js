import React, {Component} from 'react';
import {connect} from 'react-redux';

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">EVE-tool</a>
                    </div>
                    <ul className="nav navbar-nav">
                    </ul>
                </div>
            </nav>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(NavBar);