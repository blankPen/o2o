'use strict';
import React from 'react';
import './index.less';

import {
    connect
} from 'react-redux';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
import ListView from 'components/common/ListView';
function mapStateToProps(state) {
    return {

    };
}
export class Collect extends React.Component {
    constructor(props) {
        super(props);
    }
    render=()=>{
        return (
            <div className="account">
                <div className="desc">
                   <span className="userimg">
                         <i className="fa fa-user"></i>
                   </span>
                   <div className="name theys">用户名：BMt296183248</div>
                   <div className="phone theys">手机号：1507****1036</div>
                   <div className="pswd theys">密　码：尚未设置密码</div>
                   <div className="btn">修改账户信息</div>
                </div>
            </div>
            );
    }
}

export default connect(
    mapStateToProps
)(Collect)