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
import Dialog from 'components/common/Dialog/';
import PasswordBox from '../passwordBox/';
import NameBox from '../nameBox/';
import MobilephoneBox from '../mobilephoneBox/';
import PaypassBox from '../paypassBox/'
import {
    updateToLoginpass,
    updateToPaypass,
    updateToMobiphone,
    updateToName
} from 'actions/UserAction';
import {
    getMemberDetail
} from 'actions/SignPageAction';
import Cookie from "js-cookie";

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
      console.log(userInfo);
      let percent=33;//0% 3% 33% 68%
      let progress_name=false,progress_loginPassword=false,progress_payPassword=false,progress_phone=false;
      if (userInfo) {
        progress_name=userInfo.memberTruename?true:false;
        progress_loginPassword=(userInfo.isSettingPwd===1)?true:false;
        progress_payPassword=userInfo.payPassword?true:false;
        progress_phone=(userInfo.isBind===1)?true:false;
        if(progress_name&&progress_loginPassword&&progress_payPassword&&progress_phone){//35% 65% 100%
            console.log("全部验证通过");
            percent=percent>3?percent>33?100:65:35;
        }else if(!progress_name&&!progress_loginPassword&&!progress_payPassword&&!progress_phone){//不操作
          console.log("全部验证不通过")
        }else{//11%
          console.log("其他验证通过");
         if(progress_name){
           percent+=8;
         }
         if(progress_loginPassword){
           percent+=8;
         }
         if(progress_payPassword){
           percent+=8;
         }
         if(progress_phone){
           percent+=8;
         }
        }
      }
        return {
            userInfo: userInfo || {},
            progress_percent: percent,/*进度百分比: 0 10 20 30*/
            progress_name: progress_name,/* 姓名进度*/
            progress_loginPassword: progress_loginPassword,/*登录密码进度*/
            progress_payPassword: progress_payPassword,/*支付密码进度*/
            progress_phone: progress_phone,/*手机号进度*/
            dailog_title: "",/*Dialog标题*/
            show_dialog:false,/*是否开启Dialog*/
            openName: false,/*是否打开姓名修改Dialog*/
            openPhone: false,/*是否打开手机修改Dialog*/
            openPassword: false,/*是否打开密码修改Dialog*/
            openPaypass: false,/*是否打开支付密码修改Dialog*/
            type: "findPaypassword",/* 找回支付密码操作类型*/
            type2: "findpassword"/* 找回密码操作类型*/
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.userInfo, this.props.userInfo)) {
           this.setState(this.resetState(nextProps.userInfo));
        }
    }
    componentDidMount() {
      console.log("componentDidMount");
      this.setState({
        userInfo:this.props.userInfo || {}
      })
    }
    handleOnCancel=()=>{
        this.setModalVisible(false);
         this.setState({
            openName:false,
            openPhone:false,
            openPassword:false,
            openPaypass:false
        });
    }
    setModalVisible=(modalVisible)=> {
        this.setState({
            show_dialog:modalVisible
        });
    }
    changeName=()=>{
        this.setState({
            dailog_title: "更改用户名",
            openName:true,
            show_dialog: true,
        });
    }
    changePhone=()=>{
        this.setState({
            dailog_title: "更改手机号码",
            openPhone:true,
            show_dialog: true,
        });
    }
    changePassword=()=>{
        this.setState({
            dailog_title: "更改登录密码",
            openPassword:true,
            show_dialog: true
        })
    }
    changePaypass=()=>{
      this.setState({
            dailog_title: "更改支付密码",
            openPaypass:true,
            show_dialog: true
        })
    }
    handleNameSubmit = (errors,values,callback) => {//修改姓名
        if (errors) {
          console.log(' name-box表单验证错误!');
          return;
        }
        console.log('name-box表单验证成功');
        console.log(values);
        this.props.dispatch(updateToName({
              "memberId": this.state.userInfo.memberId,
              "memberRealName": values.name
            },(re)=> {
              if(re.result==1){
                message.success(re.msg);
                this.props.dispatch(getMemberDetail({
                    "memberId": this.state.userInfo.memberId
                }));
                this.handleOnCancel();
                callback && callback(re);
              }else{
                message.error(re.msg);
                console.log(re.msg);
              }
            }
          )
        );
    }
    handlePhoneSubmit = (errors,values,callback) => {//修改手机
      if (errors) {
          console.log('phone-box表单验证错误!');
          return;
      }
      console.log('phone-box表单验证成功');
      console.log(values);
      this.props.dispatch(updateToMobiphone({
            "memberId": this.state.userInfo.memberId,
            "validateCode": values.Dcode,
            "mobile": values.phone
          },(re)=> {
            if(re.result==1){
              message.success(re.msg);
              this.props.dispatch(getMemberDetail({
                  "memberId": this.state.userInfo.memberId
              }));
              this.handleOnCancel();
              callback && callback(re);
            }else{
              message.error(re.msg);
              console.log(re.msg);
            }
          }
        )
      );
    }
    handlePasswordSubmit = (errors,values,callback) => {//修改登录密码
        let user_info = Cookie.getJSON('user_info') || undefined;
        console.log(user_info.password+','+user_info.user_id+","+user_info.username);
        if (errors) {
            console.log('  password-box表单验证错误!');
            return;
        }
        console.log('password-box表单验证成功');
        console.log(values);
        this.props.dispatch(updateToLoginpass({
              "memberId": this.state.userInfo.memberId,
              "password": values.oldpass||"",
              "newpassword": values.pass
            },(re)=> {
              if(re.result==1){
                Cookie.set('user_info', {
                    username: user_info.username,
                    password:  values.pass,
                    user_id: user_info.user_id
                }, { expires: 7 });//cookie存储用户名密码
                message.success(re.msg);
                this.props.dispatch(getMemberDetail({
                    "memberId": this.state.userInfo.memberId
                }));
                this.handleOnCancel();
                callback && callback(re);
              }else{
                message.error(re.msg);
                console.log(re.msg);
              }
            }
          )
        );
    }
    handlePayPassSubmit = (errors,values,callback) => {//修改支付密码
        if (errors) {
            console.log(' paypass-box表单验证错误!');
            return;
        }
        console.log('paypass-box表单验证成功');
        console.log(values);
        this.props.dispatch(updateToPaypass({
              "memberId": this.state.userInfo.memberId,
              "password": values.oldpass||"",
              "newpassword": values.pass
            },(re)=> {
              if(re.result==1){
                message.success(re.msg);
                this.props.dispatch(getMemberDetail({
                    "memberId": this.state.userInfo.memberId
                }));
                this.handleOnCancel();
                callback && callback(re);
              }else{
                message.error(re.msg);
                console.log(re.msg);
              }
            }
          )
        );
    }
    render=()=>{
      let userInfo=this.props.userInfo||{};
      let progress_name=this.state.progress_name;
      let progress_loginPassword=this.state.progress_loginPassword;
      let progress_payPassword=this.state.progress_payPassword;
      let progress_phone=this.state.progress_phone;
      console.log(progress_name+","+progress_loginPassword+","+progress_payPassword+","+progress_phone);
      let phone="";
      let password="";
      let username="";
      if(userInfo){
        phone=progress_phone?userInfo.memberMobile.substring(0,3) + "****" + userInfo.memberMobile.substring(8,11) : "尚未绑定手机号码";
        password=progress_loginPassword?"******" : "尚未设置密码";
        username=progress_name?userInfo.memberTruename: " 默认用户";
      }
      let percent=this.state.progress_percent;

      let status_t,//success exception active
          status_p,
          status_d;//高  中  低
      let tips=document.getElementsByClassName("tips");
      let status_span=document.getElementsByClassName("status_span");
      if(percent>35){
        if(percent>65){
          status_t="success";
          status_p="高";
          status_d="安全级别高，感觉棒棒哒";
          if(tips.length>0){
            tips[0].style.color="#87d068";
          }
          if(status_span.length>0){
            status_span[0].style.color="#87d068";
          }
        }else{
          status_t="active";
          status_p="中";
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
        status_p="低";
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
            <div className="userexinfo-form__section">
              <Row>
                <Col span={2}><i className={progress_name?"fa fa-check-circle success":"fa fa-exclamation-circle error"}></i></Col>{/*fa-exclamation-circle fa-check-circle*/}
                <Col span={4}><span>用户名</span></Col>
                <Col span={4}>{progress_name?<span className="success">已设置</span>:<span className="error">未设置</span>}</Col>
                {progress_name?
                  (
                    <span>
                      <Col span={9}><p>您的姓名为：{username}</p></Col>
                      <Col span={5}> <Button className="btn" onClick={this.changeName}>修改</Button></Col>
                    </span>
                  ):
                  (
                    <span>
                      <Col span={9}><p>您的姓名为空，请输入您的姓名</p></Col>
                      <Col span={5}> <Button className="btn" onClick={this.changeName}>设置</Button></Col>
                    </span>
                  )
                }
              </Row>
            </div>
            <div className="userexinfo-form__section">
              <Row>
                <Col span={2}><i className={progress_loginPassword?"fa fa-check-circle success":"fa fa-exclamation-circle error"}></i></Col>{/*fa-exclamation-circle fa-check-circle*/}
                <Col span={4}><span>登录密码</span></Col>
                <Col span={4}>{progress_loginPassword?<span className="status_span">等级{status_p}</span>:<span className="error">未设置</span>}</Col>
                {progress_loginPassword?
                  (
                    <span>
                      <Col span={9}><p>提升密码安全程度到强，您的账号更安全</p></Col>
                      <Col span={5}> <Button className="btn" onClick={this.changePassword}>修改</Button></Col>
                    </span>
                  ):
                  (
                    <span>
                      <Col span={9}><p>设置登录密码，下次登录更便捷</p></Col>
                      <Col span={5}> <Button className="btn" onClick={this.changePassword}>设置</Button></Col>
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
                      <Col span={5}> <Button className="btn" onClick={this.changePhone}>换绑</Button></Col>
                    </span>
                  ):
                  (
                    <span>
                      <Col span={9}><p>绑定手机号码，帮助您找回密码</p></Col>
                      <Col span={5}> <Button className="btn" onClick={this.changePhone}>绑定</Button></Col>
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
                      <Col span={5}> <Button className="btn" onClick={this.changePaypass}>修改</Button></Col>
                    </span>
                  ):
                  (
                    <span>
                      <Col span={9}><p>保护账号安全，在余额支付时使用</p></Col>
                      <Col span={5}> <Button className="btn" onClick={this.changePaypass}>设置</Button></Col>
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
          </div>
          <Dialog
            visible={this.state.show_dialog}
            onCancel={this.handleOnCancel}
            title={this.state.dailog_title}
            footer={[
                <Button key="back" type="ghost" size="large" onClick={this.handleOnCancel}>取消</Button>
            ]}
          >
            {this._popUpBox()}
          </Dialog>
        </div>
      );
    }
    _popUpBox=()=>{
      /*const {
        getFieldDecorator,
        getFieldError,
        isFieldValidating
      } = this.props.form;*/
      const userInfo = this.state.userInfo || {};
      if(this.state.openName){
          return(
              <NameBox ref="nameBox" info={this.state.userInfo} handleSubmit={this.handleNameSubmit}/>
          )
      }else if(this.state.openPhone){
          return (
              <MobilephoneBox info={this.state.userInfo} handleSubmit={this.handlePhoneSubmit}/>
          );
      }else if(this.state.openPassword){
          return (
              <PasswordBox info={this.state.userInfo} handleSubmit={this.handlePasswordSubmit} type={this.state.type2} status={userInfo.isSettingPwd===1?true:false}/>
          )
      }else if(this.state.openPaypass){
          return (
              <PaypassBox info={this.state.userInfo} handleSubmit={this.handlePayPassSubmit} type={this.state.type} status={userInfo.payPassword?true:false}/>
          )
      }else{
          return false;
      }
    }
}

export default connect(
    mapStateToProps
)(Account)