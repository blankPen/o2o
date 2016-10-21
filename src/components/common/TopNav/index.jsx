/*
 * @Author: pengzhen
 * @Date:   2016-10-17 20:20:16
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-21 17:33:41
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';

function mapStateToProps({common}) {
    return {
        position: common.position,
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

    render() {
        const { position,userInfo } = this.props;
        return (
            <div className='top-nav'>
                <div className="nav-content">
                    <div className="nav-left">
                        <i className="fa fa-map-marker marker-icon"></i>
                        <span className='city'>{position.city}</span>
                        <span className='area'>{position.title || position.address}</span>
                        <Link to='/map' className='change-address'>[切换地址]</Link>
                    </div>
                    <div className="nav-right">
                        <div className="login-register">
                            <div className="register">注册</div>
                            <span>|</span>
                            <div className="login">登录</div>
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
