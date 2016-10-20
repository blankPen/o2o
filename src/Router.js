/*
 * @Author: pengzhen
 * @Date:   2016-10-17 19:40:58
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-19 21:15:18
 */

'use strict';
import React from 'react';
import {
    Provider
} from 'react-redux';
import {
    Router,
    Route,
    IndexRoute,
    Redirect
}
from 'react-router'

import PublicMain from 'components/public/Main/';
import Home from 'components/Home/';
import Detail from 'components/Detail/';
import Login from 'components/SignPage/Login/';
import Register from 'components/SignPage/Register/';
import Forgetpwd from 'components/Forgetpwd/';
import Maper from 'components/Map/';

export default class extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} >
                    <Route path='/' component={PublicMain}>
                        <IndexRoute component={Home} />
                        <Route path="/detail" component={Detail}/>
                    </Route>
                    <Route path='/map' component={Maper} />
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/forgetpwd" component={Forgetpwd}/>
                </Router>
            </Provider>
        );
    }
}