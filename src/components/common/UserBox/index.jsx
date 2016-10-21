/*
 * @Author: pengzhen
 * @Date:   2016-10-21 17:47:08
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-21 18:03:00
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import { logout } from 'actions/signPageAction';

function mapStateToProps({common}) {
    return {
        userInfo: common.userInfo
    };
}

export class index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    logout(){
        this.props.dispatch(logout());
    }
    renderUnLogin(){
        return (
            <div className="user-box-unlogin">
                <Link to='/register' className="register">注册</Link>
                <span>|</span>
                <Link to='/login' className="login">登录</Link>
            </div>
        )
    }
    renderUserSelect(userInfo){
        return (
            <div className="user-box-select">
                <span className="loginbar-username">欢迎你，{userInfo.memberName}</span>
                <i className="fa fa-angle-down"></i>
                <ul className="login-menu">
                    <li><Link to='/order'>我的外卖订单</Link></li>
                    <li><Link to='/collect'>我的收藏夹</Link></li>
                    <li><a onClick={this.logout}>退出</a></li>
                </ul>
            </div>
        )
    }
    render() {
        const userInfo = this.props.userInfo;
        if(userInfo){
            return this.renderUserSelect(userInfo);
        }else{
            return this.renderUnLogin();
        }
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(index)
