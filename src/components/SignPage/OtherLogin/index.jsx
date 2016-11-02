/*
 * @Author: pengzhen
 * @Date:   2016-11-01 16:18:59
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-01 21:57:10
 */

'use strict';
import './index.less';
import React from 'react';
import History from 'common/History';
import * as DomUtils from 'common/utils/dom';
import { QQLogin,WeixinLogin } from 'common/OtherLoginAPI';
import { thirdLogin } from 'actions/SignPageAction';

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
        const code = DomUtils.getQueryString('code');
        if(code){
            History.replace('/login');
            WeixinLogin.getUserInfo(code,(res)=>{
                console.log(res)
                this.props.dispatch(thirdLogin({
                    openId: res.openid,
                    sex: res.sex,
                    userName:res.nickname,
                    avatar: res.headimgurl,
                    type:'weixin',
                }))
            })
        }
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
        // QQLogin.showPopup();
        // QC.Login({
        //        btnId:"qqLoginBtn"   //插入按钮的节点id
        // });
        // QC.Login({
        //     //btnId：插入按钮的节点id，必选
        //     btnId: "qqLoginBtn",
        //     //用户需要确认的scope授权项，可选，默认all
        //     scope: "all",
        //     //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
        //     size: "A_XL"
        // }, function(reqData, opts) { //登录成功
        //     console.log(reqData)
        //     // //根据返回数据，更换按钮显示状态方法
        //     // var dom = document.getElementById(opts['btnId']),
        //     //     _logoutTemplate = [
        //     //         //头像
        //     //         '<span><img src="{figureurl}" class="{size_key}"/></span>',
        //     //         //昵称
        //     //         '<span>{nickname}</span>',
        //     //         //退出
        //     //         '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
        //     //     ].join("");
        //     // dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
        //     //     nickname: QC.String.escHTML(reqData.nickname),
        //     //     figureurl: reqData.figureurl
        //     // }));
        // }, function(opts) { //注销成功
        //     alert('QQ登录 注销成功');
        // });
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
