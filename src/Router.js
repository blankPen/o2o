/*
 * @Author: pengzhen
 * @Date:   2016-10-17 19:40:58
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-01 11:59:07
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
import store from 'stores';
import {
    requireSetPosition,
    requireLogin
} from 'common/Permission'
import asyncLoader from 'common/asyncLoader';

import PublicMain from 'components/public/Main/';
import PersonNav from 'components/public/PersonNav/';
import NotFound from 'components/common/404';

import Home from 'bundle?lazy&name=Home!components/Home/';
import Detail from 'bundle?lazy&name=Detail!components/Detail/';
import Login from 'bundle?lazy&name=Login!components/SignPage/Login/';
import Register from 'bundle?lazy&name=Register!components/SignPage/Register/';
import Maper from 'bundle?lazy&name=Maper!components/Map/';
import Account from 'bundle?lazy&name=Account!components/user/account/';
import Order from 'bundle?lazy&name=Order!components/user/order/';
import Collect from 'bundle?lazy&name=Collect!components/user/collect/';
import PersonalCenter from 'bundle?lazy&name=PersonalCenter!components/user/personalCenter/';
import OrderPreview from 'bundle?lazy&name=OrderPreview!components/OrderPreview/';
import Feedback from 'bundle?lazy&name=Feedback!components/feedback';
import Search from 'bundle?lazy&name=Search!components/Search/';
import Payment from 'bundle?lazy&name=Payment!components/Payment/';
import PaySucc from 'bundle?lazy&name=PaySucc!components/paysucc/';


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
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} >
                    <Route onEnter={autoLogin}>
                        <Route path='/' component={PublicMain} onEnter={requireSetPosition}>
                            <IndexRoute component={asyncLoader(Home)} />
                            <Route path="detail/:storeId" component={asyncLoader(Detail)}/>
                            <Route path="order_preview" component={asyncLoader(OrderPreview)}/>
                            <Route path="search" component={asyncLoader(Search)}/>
                            <Route path="paysucc/:orderId" component={asyncLoader(PaySucc)}/>

                            <Route path="user" onEnter={requireLogin} component={PersonNav}>
                                <IndexRoute component={asyncLoader(Order)} />
                                <Route path="order" component={asyncLoader(Order)}/>
                                <Route path="safe" component={asyncLoader(Account)}/>
                                <Route path="collect" component={asyncLoader(Collect)}/>
                                <Route path="info" component={asyncLoader(PersonalCenter)}/>
                            </Route>
                            <Route path="feedback" component={asyncLoader(Feedback)}/>
                        </Route>
                        <Route path='/map' component={asyncLoader(Maper)} />
                        <Route path="/login" component={asyncLoader(Login)}/>
                        <Route path="/register" component={asyncLoader(Register)}/>
                        <Route path='/payment' >
                            <IndexRoute component={asyncLoader(Payment)} />
                            <Route path=":orderSn" component={asyncLoader(Payment)}/>
                        </Route>
                        <Route path='/404' component={NotFound} ></Route>
                        <Redirect path='*' to='/404' />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default connect(
    mapStateToProps
)(index)

// 自动登录
function autoLogin(rextState, replace, callback) {
    // 7天自动登录
    let user_info = Cookie.getJSON('user_info') || undefined;
    // session缓存
    let user_id = sessionStorage.getItem("user_id") || (user_info ? user_info.user_id : undefined);
    user_id = user_id || (user_info && user_info.user_id);
    if (user_id) { // id存在，自动登录
        store.dispatch(getMemberDetail({
            "memberId": user_id
        }, (re) => {
            callback();
            if (re.result == 1) {
                console.log('用户信息获取成功');
            } else {
                console.log("用户信息获取失败");
            }
        }))
    } else {
        // 未登录
        callback();
    }
}
