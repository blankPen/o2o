/*
 * @Author: pengzhen
 * @Date:   2016-11-01 16:18:59
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-01 18:14:24
 */

'use strict';
import './index.less';
import React from 'react';
import History from 'common/History';
import * as DomUtils from 'common/utils/dom';
import { WeixinLogin } from 'common/OtherLoginAPI';
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
        WeixinLogin.init((obj)=>{
            this.wx = obj;
        });
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
    render() {
        return (
            <div className="other-login">
                <div className="title">其他方式登录</div>
                <div className="btn-box">
                    <a className="btn-qq"><i className="fa fa-qq"></i></a>
                    <a className="btn-wechat" onClick={this.wechatLogin}><i className="fa fa-wechat"></i></a>
                </div>
                <div className={"wx-wrap "+(this.state.wx?'show':'')}>
                    <i onClick={this.toggleWx} className='ant-modal-close-x'></i>
                    <div id="wexin-code"></div>
                </div>
            </div>
        );
    }
}
