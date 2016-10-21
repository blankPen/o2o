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
    Provider,
    connect
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
import Account from 'components/user/account/';
import Order from 'components/user/order/';
import Collect from 'components/user/collect/';
import PersonNav from 'components/public/PersonNav/';

import {
    getMemberDetail
} from 'actions/SignPageAction';
import Cookie from "js-cookie";
import History from 'common/History'

function mapStateToProps(state) {
    return {

    };
}

export class index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentWillMount = () => {
        let user_info = Cookie.getJSON('user_info') || undefined;
        console.log("用户信息：" + user_info);
        let user_id = sessionStorage.getItem("user_id") || (user_info ? user_info.user_id : undefined);
        console.log("用户id：" + user_id);
        let bool = !user_info ? !user_id ? true : false : false;
        if (bool) {
            /*  History.push('/login')*/
        } else {
            this.props.dispatch(getMemberDetail({
                "memberId": user_id
            }, (re) => {
                if (re.result == 1) {
                    console.log('用户信息获取成功');
                } else {
                    console.log("用户信息获取失败");
                    History.push('/login');
                }
            }))
        }
    }
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} >
                    <Route path='/' component={PublicMain}>
                        <IndexRoute component={Home} />
                        <Route path="/detail" component={Detail}/>
                        <Route path="/user" component={PersonNav}>
                            <Route path="/order" component={Order}/>
                            <Route path="/account" component={Account}/>
                            <Route path="/collect" component={Collect}/>
                        </Route>
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

export default connect(
    mapStateToProps
)(index)