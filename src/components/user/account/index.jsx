/*
 * @Author: MoCheng
 */
'use strict';
import React from 'react';
import './index.less';

import {
    connect
} from 'react-redux';
import Img from 'common/Img';
import {
  Form,
  Button,
  Input,
  Icon,
  Checkbox,
  message,
  Modal,
  Progress,
  Row,
  Col
} from 'antd';
import { Link } from 'react-router';
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
        this.state = this.resetState(props.userInfo);
    }
    resetState(userInfo) {
      console.log("???????????????????????");
      console.log(userInfo);
      console.log("???????????????????????");
      let percent=0;
      let progress_loginPassword=false,progress_payPassword=false,progress_phone=false;
      if (userInfo) {
        progress_loginPassword=(userInfo.isSettingPwd===1)?true:false;
        progress_payPassword=userInfo.payPassword?true:false;
        progress_phone=(userInfo.isBind===1)?true:false;
        if(progress_loginPassword&&progress_payPassword&&progress_phone){//35 65 100
            console.log("全部验证通过");
            percent=percent>10?percent>20?100:65:35;
        }else if(progress_loginPassword||progress_payPassword||progress_phone){//25
          console.log("一个验证通过");
          percent+=25;
        }else{//50
          console.log("两个验证通过");
          percent+=50;
        }
      }
        return {
            userInfo: userInfo || {},
            progress_percent: percent,/*进度百分比: 0 10 20 30*/
            progress_loginPassword: progress_loginPassword,/*登录密码进度*/
            progress_payPassword: progress_payPassword,/*支付密码进度*/
            progress_phone: progress_phone/*手机号进度*/
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.userInfo, this.props.userInfo)) {
           this.setState(this.resetState(nextProps.userInfo));
        }
    }
    componentDidMount() {

    }
    render=()=>{
      let userInfo=this.props.userInfo||{};
      let progress_loginPassword=this.state.progress_loginPassword;
      let progress_payPassword=this.state.progress_payPassword;
      let progress_phone=this.state.progress_phone;
      let phone="";
      let password="";
      if(userInfo){
        phone=progress_phone?userInfo.memberMobile.substring(0,3) + "****" + userInfo.memberMobile.substring(8,11) : "尚未绑定手机号码";
        password=progress_loginPassword===1?"******" : "尚未设置密码";
      }
      let percent=this.state.progress_percent;

      let status_t,//success exception active
          status_p,
          status_d;//高  中  低
      console.log(progress_loginPassword+","+progress_payPassword+","+progress_phone);

      /*;
      let percent=this.state.progress_percent;
      console.log("百分比："+percent);
      if(percent>35){
        if(percent>65){

        }else{

        }
      }else{

      }*/
      let tips=document.getElementsByClassName("tips");
      let status_span=document.getElementsByClassName("status_span");

      console.log(tips);
      console.log(status_span);
      if(percent>35){
        if(percent>65){
          status_t="success";
          status_p="等级高";
          status_d="安全级别高，感觉棒棒哒";
          if(tips.length>0){
            tips[0].style.color="#87d068";
          }
          if(status_span.length>0){
            status_span[0].style.color="#87d068";
          }
        }else{
          status_t="active";
          status_p="等级中";
          status_d="安全级别中，支付需谨慎";
          let text=document.getElementsByClassName("ant-progress-text");
          if(text.length>0){
            text[0].style.color="#30b9f5";
          }
          if(tips.length>0){
             tips[0].style.color="#30b9f5";
          }
          if(status_span.length>0){
            status_span[0].style.color="#30b9f5";
          }
        }
      }else{
        status_t="exception";
        status_p="等级低";
        status_d="安全级别低，都是耍流氓";
        if(tips.length>0){
          tips[0].style.color="#f50";
        }
        if(status_span.length>0){
          status_span[0].style.color="#f50";
        }
      }
      return (
        <div className="account-center-box">
          <div className="avatar-container">
              <h3>您的安全等级</h3>
              <div className="avatar-content">
                  <Progress type="circle" percent={percent} status={status_t} format={(p) =>{
                    return p + '%'
                  }} />
              </div>
              <div className="tips">{status_d}</div>
          </div>
          <div className="userexinfo-form">
              <form >
                  <div className="userexinfo-form__section">
                    <Row>
                      <Col span={2}><i className={progress_loginPassword?"fa fa-check-circle success":"fa fa-exclamation-circle error"}></i></Col>{/*fa-exclamation-circle fa-check-circle*/}
                      <Col span={4}><span>登录密码</span></Col>
                      <Col span={4}><span className="status_span">{progress_loginPassword?status_p:"未设置"}</span>{/*:<span className="error">未设置</span>}*/}</Col>
                      {progress_loginPassword?
                        (
                          <span>
                            <Col span={9}><p>提升密码安全程度到强，您的账号更安全</p></Col>
                            <Col span={5}> <Button className="btn"><Link to="/personal_center">修改</Link></Button></Col>
                          </span>
                        ):
                        (
                          <span>
                            <Col span={9}><p>设置登录密码，下次登录更便捷</p></Col>
                            <Col span={5}> <Button className="btn"><Link to="/personal_center">设置</Link></Button></Col>
                          </span>
                        )
                      }
                    </Row>
                  </div>
                  <div className="userexinfo-form__section">
                    <Row>
                      <Col span={2}><i className={progress_phone?"fa fa-check-circle success":"fa fa-exclamation-circle error"}></i></Col>
                      <Col span={4}><span>手机号</span></Col>
                      <Col span={4}>{progress_phone?<span className="success">已绑定</span>:<span className="error">未绑定</span>}</Col>
                      {progress_phone?
                        (
                          <span>
                            <Col span={9}><p>您验证的手机：{phone}</p></Col>
                            <Col span={5}> <Button className="btn"><Link to="/personal_center">换绑</Link></Button></Col>
                          </span>
                        ):
                        (
                          <span>
                            <Col span={9}><p>绑定手机号码，帮助您找回密码</p></Col>
                            <Col span={5}> <Button className="btn"><Link to="/personal_center">绑定</Link></Button></Col>
                          </span>
                        )
                      }
                    </Row>
                  </div>
                  <div className="userexinfo-form__section">
                    <Row>
                      <Col span={2}><i className={progress_payPassword?"fa fa-check-circle success":"fa fa-exclamation-circle error"}></i></Col>
                      <Col span={4}><span>支付密码</span></Col>
                      <Col span={4}>{progress_payPassword?<span className="success">已设置</span>:<span className="error">未设置</span>}</Col>
                      {progress_payPassword?
                        (
                          <span>
                            <Col span={9}><p>定期更换支付密码，安全有保障</p></Col>
                            <Col span={5}> <Button className="btn"><Link to="/personal_center">修改</Link></Button></Col>
                          </span>
                        ):
                        (
                          <span>
                            <Col span={9}><p>保护账号安全，在余额支付时使用</p></Col>
                            <Col span={5}> <Button className="btn"><Link to="/personal_center">设置</Link></Button></Col>
                          </span>
                        )
                      }
                    </Row>
                  </div>
                  {/*<div className="userexinfo-form__section">
                    <Row>
                      <Col span={2}><i className="fa fa-exclamation-circle"></i></Col>
                      <Col span={4}><span>收货地址</span></Col>
                      <Col span={4}><span>未设置</span></Col>
                      <Col span={9}><p>设置收货地址，帮助你更快捷的点餐</p></Col>
                      <Col span={5}><Button className="btn"><Link to="/personal_center"> 添加</Link></Button></Col>
                    </Row>
                  </div>
                  <div className="userexinfo-form__section">
                    <Row>
                      <Col span={2}><i className={progress_email?"fa fa-check-circle success":"fa fa-exclamation-circle error"}></i></Col>
                      <Col span={4}><span>邮箱</span></Col>
                      <Col span={4}>{progress_email?<span className="success">已设置</span>:<span className="error">未设置</span>}</Col>
                      <Col span={9}><p>绑定邮箱，帮助您找回密码</p></Col>
                      <Col span={5}><Button className="btn"><Link to="/personal_center"> 设置</Link></Button></Col>
                    </Row>
                  </div>
                  */}
              </form>
          </div>
      </div>
      );
    }
}

export default connect(
    mapStateToProps
)(Account)