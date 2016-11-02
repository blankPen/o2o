/*
 * @Author: pengzhen
 * @Date:   2016-11-01 16:18:59
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-02 18:11:58
 */

'use strict';
import './index.less';
import React from 'react';
import History from 'common/History';
import * as DomUtils from 'common/utils/dom';
import { QQLogin,WeixinLogin } from 'common/OtherLoginAPI';
import { message } from 'antd';

export default class OtherLogin extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            wx: false
        };
    }
    componentWillMount() {
        QQLogin.init();
        WeixinLogin.init();
    }
    toggleWx=()=>{
        this.setState({
            wx: !this.state.wx
        });
    }
    wechatLogin=()=>{
        WeixinLogin.createCode('wexin-code');
        this.toggleWx();
    }
    qqLogin=()=>{
        QQLogin.login();
    }
    render() {
        return (
            <div className="other-login">
                <div className="title">其他方式登录</div>
                <div className="btn-box">
                    <a className="btn-qq" onClick={this.qqLogin}><i className="fa fa-qq"></i></a>
                    <a className="btn-wechat" onClick={this.wechatLogin}><i className="fa fa-wechat"></i></a>
                </div>
                <div className={"wx-wrap "+(this.state.wx?'show':'')}>
                    <i onClick={this.toggleWx} className='ant-modal-close-x'></i>
                    <div id="wexin-code"></div>
                </div>
                <div id="qqLoginBtn"></div>
            </div>
        );
    }
}
