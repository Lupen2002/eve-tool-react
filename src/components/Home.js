import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import Page from './Page'

class Home extends Component {

    render() {
        return (
            <Page>
                <h1>Hello, world!</h1>
            </Page>
        );
    }
}

export default withRouter(connect(
    state => ({
    }),
    dispatch => ({
    })
)(Home));