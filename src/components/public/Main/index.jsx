'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { toggleLoginDialog,thirdLogin } from 'actions/SignPageAction';
import { QQLogin,WeixinLogin } from 'common/OtherLoginAPI';
import * as DomUtils from 'common/utils/dom';
import Dialog from 'components/common/Dialog';
import TopNav from 'components/common/TopNav';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Elevator from 'components/common/Elevator';
import LoginSingle from 'components/SignPage/LoginSingle/';
import { message } from 'antd';
function mapStateToProps({ common }) {
    return {
        showLogin: common.show_login_dialog,
        userInfo: common.userInfo
    };
}

export class Main extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.__THREELOGIN_CODE__ = window.__THREELOGIN_CODE__ || '';
        delete window.__THREELOGIN_CODE__;
    }

    // componentWillReceiveProps(nextProps) {
    //     let newCode = this.getQueryString('code');
    //     let state = this.getQueryString('state');
    //     console.log('receive',newCode,state);
    //     if(newCode && newCode != this.code){
    //         if(state == 'qq'){
    //             this.getQQUserInfo(newCode);
    //         }else{
    //             this.getWxUserInfo(newCode);
    //         }
    //     }
    // }
    componentWillMount() {
        let code = this.getQueryString('code');
        let state = this.getQueryString('state');
        if(state == 'weixin'){
            this.getWxUserInfo(code);
        }else{
            this.getQQUserInfo(code);
        }
    }
    getQueryString(name) {
        // return this.props.location.query[name];
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var res = this.__THREELOGIN_CODE__.split('?');
        if(res.length >= 2){
            var r = res[1].match(reg);
            if (r != null) return unescape(r[2]);
        }
        return null;
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
                    },null,false))
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
                    },null,false))
                }
            })
        }
    }
    closeLogin=()=>{
        this.props.dispatch(toggleLoginDialog(false));
    }
    render() {
        return (
            <div className='application'>
                <Elevator userInfo={this.props.userInfo}/>
                { !this.props.userInfo &&
                    <Dialog
                        title='请登录雷铭账号'
                        className='dialog-login'
                        width={400}
                        visible={this.props.showLogin}
                        onCancel={this.closeLogin}
                    >
                        <LoginSingle
                            location={this.props.location}
                            redirect={this.props.location.pathname}/>
                    </Dialog>
                }
                <TopNav/>
                <Header/>
                <div className="page-wrap">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Main)
