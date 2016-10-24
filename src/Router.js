/*
 * @Author: pengzhen
 * @Date:   2016-10-17 19:40:58
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-24 15:43:31
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
import { requireSetPosition } from 'common/Permission'

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
import PersonalCenter from 'components/user/personalCenter/';
import OrderPerview from 'components/OrderPreview/';
import Feedback from 'components/feedback';
import Search from 'components/Search/';

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
                            <IndexRoute component={Home} />
                            <Route path="/detail/:storeId" component={Detail}/>
                            <Route path="/order_preview" component={OrderPerview}/>
                            <Route path="/search" component={Search}/>
                            <Route path="/user" component={PersonNav}>
                                <Route path="/order" component={Order}/>
                                <Route path="/account" component={Account}/>
                                <Route path="/collect" component={Collect}/>
                                <Route path="/personal_center" component={PersonalCenter}/>
                            </Route>
                            <Route path="/feedback" component={Feedback}/>
                        </Route>
                        <Route path='/map' component={Maper} />
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/forgetpwd" component={Forgetpwd}/>
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
function autoLogin(rextState, replace, callback){
    // 7天自动登录
    let user_info = Cookie.getJSON('user_info') || undefined;
    // session缓存
    let user_id = sessionStorage.getItem("user_id") || (user_info ? user_info.user_id : undefined);
    user_id = user_id || (user_info && user_info.user_id);
    if(user_id){ // id存在，自动登录
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
    }else{
        // 未登录
        callback();
    }
}
