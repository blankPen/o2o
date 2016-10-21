/*
 * @Author: pengzhen
 * @Date:   2016-10-17 20:20:16
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-17 20:53:57
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
   logout
} from 'actions/SignPageAction';

function mapStateToProps({
    common
}){
    return {
        userInfo: common.userInfo
    };
}

export class TopNav extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    logout=()=>{
         this.props.dispatch(logout());
    }
    render() {
        return (
            <div className='top-nav'>
                <div className="nav-content">
                    <div className="nav-left">
                        <i className="fa fa-map-marker marker-icon"></i>
                        <span className='city'>北京</span>
                        <span className='area'>美惠大厦</span>
                        <span className='change-address'>[切换地址]</span>
                    </div>
                    <div className="nav-right">
                        <div className="login-register">
                        {
                            this.props.userInfo==null?(
                                <span>
                                    <div className="register"><a href="/#/register">注册</a></div>
                                        <span>|</span>
                                    <div className="login"><a href="/#/login">登录</a></div>
                                </span>
                            ):(
                                <span>
                                    <div className="register"><a href="/#/">{(this.props.userInfo.memberTruename?this.props.userInfo.memberTruename:this.props.userInfo.memberName)||"默认用户"}</a></div>
                                        <span>|</span>
                                    <div className="login" onClick={this.logout}>退出</div>
                                </span>
                            )
                        }
                        </div>
                        <div className="moblie-home">
                            <div className="moblie">
                                <i className="fa fa-mobile-phone mr5"></i>
                                手机版
                            </div>
                            <div className="home">
                                <i className="fa fa-home mr5"></i>
                                美团网
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(TopNav)
