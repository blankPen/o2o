/*
 * @Author: pengzhen
 * @Date:   2016-11-01 16:18:59
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-02 16:28:28
 */

'use strict';
import './index.less';
import React from 'react';
import History from 'common/History';
import * as DomUtils from 'common/utils/dom';
import { QQLogin,WeixinLogin } from 'common/OtherLoginAPI';
import { thirdLogin } from 'actions/SignPageAction';
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
    componentWillReceiveProps(nextProps) {
        let newCode = nextProps.location.query.code;
        let state = nextProps.location.query.state;
        if(newCode && newCode != this.code){
            if(state == 'qq'){
                this.getQQUserInfo(newCode);
            }else{
                this.getWxUserInfo(newCode);
            }
        }
    }
    componentWillMount() {
        const { code,state } = this.props.location.query;
        if(state == 'qq'){
            this.getQQUserInfo(code);
        }else{
            this.getWxUserInfo(code);
        }
        QQLogin.init();
        WeixinLogin.init();
    }
    getWxUserInfo(code){
        if(code){
            this.code = code;
            WeixinLogin.getUserInfo(code,(res,error)=>{
                if(error){
                    message.error(error);
                }else{
                    this.props.dispatch(thirdLogin({
                        openId: res.openid,
                        sex: res.sex,
                        userName:res.nickname,
                        avatar: res.headimgurl,
                        type:'weixin',
                    },null,this.props.redirect))
                }
            })
        }
    }
    getQQUserInfo(code){
        if(code){
            this.code = code;
            QQLogin.getUserInfo(code,(res,error)=>{
                if(error){
                    message.error(error);
                }else{
                    this.props.dispatch(thirdLogin({
                        openId: res.openid,
                        sex: res.gender == "男"?1:0,
                        userName:res.nickname,
                        avatar: res.figureurl_qq_2,
                        type:'qq',
                    },null,this.props.redirect))
                }
            })
        }
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
