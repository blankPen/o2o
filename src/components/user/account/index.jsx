'use strict';
import React from 'react';
import './index.less';

import {
    connect
} from 'react-redux';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
import ListView from 'components/common/ListView';
function mapStateToProps({
    common
}){
    return {
        userInfo: common.userInfo
    };
}
export class Account extends React.Component {
    constructor(props) {
        super(props);
    }
    render=()=>{
      let userinfo=this.props.userInfo||{};
      let phone="尚未设置手机号码";
      let password="尚未设置密码";
      if(userinfo){
          if(userinfo.memberMobile){
              phone=userinfo.memberMobile.substring(0,3)+"****"+userinfo.memberMobile.substring(8,11);
          }
          if(userinfo.memberPassword){
            password="******";
          }
      }
      return (
        <div className="account">
            <div className="desc">
               <span className="userimg">
                     <i className="fa fa-user"></i>
               </span>
               <div className="name theys">用户名：{(userinfo.memberTruename?userinfo.memberTruename:userinfo.memberName)||"默认用户"}</div>
               <div className="phone theys">手机号：{phone}</div>
               <div className="pswd theys">密　码：{password}</div>
               <div className="btn">修改账户信息</div>
            </div>
        </div>
      );
    }
}

export default connect(
    mapStateToProps
)(Account)