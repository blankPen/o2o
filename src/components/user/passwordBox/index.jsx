/*
 * @Author: MoCheng
 */
'use strict';
import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
  Input,
  Icon,
  message,
  Row,
  Col
} from 'antd';
import {
    getMemberDetail,
    getVerifyCode,
    getCheckCode
} from 'actions/SignPageAction';

import classNames from 'classnames';
const FormItem = Form.Item;
const createForm = Form.create;
const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 12
  },
}

function mapStateToProps(state) {
  return {

  };
}

export class index extends React.Component {
  	static propTypes = {
   		name: React.PropTypes.string,
  	};

  	constructor(props) {
    	super(props);
    	this.state={
    		userInfo: props.info,
    		dirty: false,
            passBarShow: false,
            passStrength: 'L',
            rePassStrength: 'L',
            wait: 0,/* 验证码发送倒计时秒数，默认0，最大60*/
        	type: props.type,
        	openEditPhone: props.edit||false,/* true： 开启 false： 关闭*/
        	retrieveOrUpdata:props.status||false /* true： 修改 false： 找回*/
    	}
  	}
  	phoneExists = (rule, value, callback) => {
      if(value==""){
        callback([new Error('手机号码不能为空！')]);
      }else {
          callback();
      }
    }
  	sendVCode=()=>{
        console.log("发送验证码。。。");
        let phone;
        if(this.state.userInfo){
        	phone=this.state.userInfo.memberMobile;
        }else{
        	phone=this.props.form.getFieldValue('phone');
        }
	      this.props.dispatch(getVerifyCode({
	          "type": this.state.type,
	          "mobile": phone
	      },(re)=> {
	        if(re.result==1){
	          this.setState({
	              wait: 60
	          })
	          message.success("验证码已发送请查收");
	          console.log(re.data.verifyCode);
	          this.e = setInterval(() => {
	              if (this.state.wait == -1) {
	                  clearInterval(this.e);
	              }
	              this.setState({
	                  wait: this.state.wait - 1
	              })
	          }, 1000)
	        } else {
	            this.setState({
	                wait: 0,
	                openFormError: true,
	                validate_info: re.msg
	            })
	        }
	      }
	    )
	  )
    }

    validatorVcode=(rule, value, callback)=>{
        console.log(" 验证验证码。。。");
        let phone;
        if(this.state.userInfo){
        	phone=this.state.userInfo.memberMobile;
        }else{
        	phone=this.props.form.getFieldValue('phone');
        }
        let validateCode=this.props.form.getFieldValue('Vcode');
        this.props.dispatch(getCheckCode({
            "validateCode" : validateCode,
            "type" : this.state.type,
            "mobile" : phone
          },(re)=> {
            if(re.result==1){
                callback();
            } else {
              callback([new Error('动态码验证失败')]);
            }
          }
        ))
    }
    componentWillUnmount() {
      if(this.e){
        clearInterval(this.e);
      }
    }
  	renderPassStrengthBar(type) {
	    const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
	    const classSet = classNames({
	      'ant-pwd-strength': true,
	      'ant-pwd-strength-low': strength === 'L',
	      'ant-pwd-strength-medium': strength === 'M',
	      'ant-pwd-strength-high': strength === 'H',
	    });
	    const level = {
	      L: '弱',
	      M: '中',
	      H: '强',
	    };
	    return (
	      <div>
	        <ul className={classSet}>
	          <li className="ant-pwd-strength-item ant-pwd-strength-item-1" >
	            <span className="ant-form-text">
	              {level['L']}
	            </span>
	          </li>
	          <li className="ant-pwd-strength-item ant-pwd-strength-item-2" >
	            <span className="ant-form-text">
	              {level['M']}
	            </span>
	          </li>
	          <li className="ant-pwd-strength-item ant-pwd-strength-item-3" >
	             <span className="ant-form-text">
	              {level['H']}
	            </span>
	          </li>
	        </ul>
	      </div>
	    );
    }
    checkOldPass=(rule, value, callback)=>{
    	console.log("您的旧密码为："+ value);
    	callback();
    }
    checkPass=(rule, value, callback)=> {
        const form = this.props.form;
        this.getPassStrenth(value, 'pass');

        if (form.getFieldValue('pass') && this.state.dirty) {
          form.validateFields(['rePass'], { force: true });
        }

        callback();
    }

    checkPass2=(rule, value, callback)=> {
        const form = this.props.form;
        this.getPassStrenth(value, 'rePass');

        if (value && value !== form.getFieldValue('pass')) {
          callback('您输入的两个密码不一致！');
        } else {
          callback();
        }
    }

    getPassStrenth=(value, type)=> {
        if (value) {
          let strength;
          var lv = 0;
          if (value.match(/[a-z]/g)) {
            lv++;
          }
          if (value.match(/[0-9]/g)) {
            lv++;
          }
          if (value.match(/(.[^a-z0-9])/g)) {
            lv++;
          }
          if (value.length < 6) {
            lv = 0;
          }
          if (lv > 3) {
            lv = 3;
          }
          lv === 1 ? strength = 'L' : lv === 2 ? strength = 'M' :lv === 3 ? strength = 'H' : strength="";
          this.setState({
            [`${type}BarShow`]: true,
            [`${type}Strength`]: strength,
          });
        } else {
          this.setState({
            [`${type}BarShow`]: false,
          });
        }
    }
    resetForm=()=> {
	    this.props.form.resetFields();
	}
  	render() {
  		const {
	      getFieldDecorator,
	      getFieldError,
	      isFieldValidating
	    } = this.props.form;
	    const userInfo = this.props.info || {};
	    let wait=this.state.wait;
	    let phone="";
	    if(userInfo){
	       phone=(userInfo.isBind===1)?userInfo.memberMobile.substring(0,3) + "****" + userInfo.memberMobile.substring(8,11) : "尚未绑定手机号码";
	    }
	    return (
	     	<div className="password-box">
	            <Form horizontal
	            	onSubmit={(e)=>{
		            	e.preventDefault();
				        console.log("handlePasswordSubmit");
				        this.props.form.validateFields((errors, values) => {
					        this.props.handleSubmit(errors,values,()=>{
					        	console.log("回调，刷新password-box表单。。。。");
					        	this.resetForm();
					        });
				        })
				    }}
	            >
	            {this.state.retrieveOrUpdata?
	            	<FormItem
	                  id="control-oldpass"
	                  label="旧密码"
	                  {...formItemLayout}
	                  hasFeedback
	                  help={isFieldValidating('oldpass') ? 'validating...' : (getFieldError('oldpass') || []).join(', ')}
	                >
	                  {getFieldDecorator('oldpass', {
	                    rules: [
	                      { required: true, whitespace: true, message: '请输入您的旧密码' },
	                      { validator: this.checkOldPass },
	                    ],
	                  })(
	                    <Input
	                      id="control-oldpass"
	                      type="password"
	                      onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
	                      autoComplete="off" id="oldpass"
	                    />
	                  )}
	                </FormItem>
	            :
	        		undefined
	        	}
	                <FormItem
	                  id="control-pass"
	                  label="创建密码"
	                  {...formItemLayout}
	                  hasFeedback
	                  help={isFieldValidating('pass') ? 'validating...' : (getFieldError('pass') || []).join(', ')}
	                >
	                  {getFieldDecorator('pass', {
	                    rules: [
	                      { required: true, whitespace: true, message: '请输入您的密码' },
	                      { validator: this.checkPass },
	                    ],
	                  })(
	                    <Input
	                      id="control-pass"
	                      type="password"
	                      onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
	                      autoComplete="off" id="pass"
	                      onBlur={(e) => {
	                        const value = e.target.value;
	                        this.setState({ dirty: this.state.dirty || !!value });
	                      }}
	                    />
	                  )}
	                </FormItem>
	                <Row className="pass-show-box">
	                  <Col span={7}></Col>
	                  <Col span={15}>
	                    {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
	                  </Col>
	                </Row>
	                <FormItem
	                  id="control-rePass"
	                  label="确认密码"
	                  {...formItemLayout}
	                  hasFeedback
	                  help={isFieldValidating('rePass') ? 'validating...' : (getFieldError('rePass') || []).join(', ')}
	                >
	                  {getFieldDecorator('rePass', {
	                    rules: [{
	                      required: true,
	                      whitespace: true,
	                      message: '请输入确认密码',
	                    }, {
	                      validator: this.checkPass2,
	                    }],
	                  })(
	                    <Input
	                      id="control-rePass"
	                      type="password"
	                      onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
	                      autoComplete="off" id="rePass"
	                    />
	                  )}
	                </FormItem>
	                {!this.state.retrieveOrUpdata?
	                    (
	                      <span>
	                        {this.state.openEditPhone?
	                          (
	                            <FormItem
	                              id="control-phone"
	                              {...formItemLayout}
	                              label="输入您绑定的手机号"
	                              hasFeedback
	                              help={isFieldValidating('phone') ? 'validating...' : (getFieldError('phone') || []).join(', ')}
	                            >
	                              {getFieldDecorator('phone', {
	                                rules: [
	                                  {  required: true, pattern: /^1((3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$)/ , message: '手机号码格式不正确！' },
	                                  {  validator: this.phoneExists }
	                                ],
	                              })(
	                                <Input id="control-phone" placeholder="" />
	                              )}
	                            </FormItem>
	                          ):
	                          (
	                            <div className="bind_phone_style">
	                              <Row>
	                                  <Col span={7}>
	                                      <span className="bind_phone_lable">已绑定的手机：</span>
	                                  </Col>
	                                  <Col span={12}>
	                                      <span className="bind_phone_text">{phone}</span>
	                                  </Col>
	                              </Row>
	                            </div>
	                          )
	                        }
	                        <FormItem
	                          id="control-Vcode"
	                          {...formItemLayout}
	                          className="validatCodeType"
	                          label="短信验证码"
	                          hasFeedback
	                          help={isFieldValidating('Vcode') ? 'validating...' : (getFieldError('Vcode') || []).join(', ')}
	                        >
	                          {getFieldDecorator('Vcode', {
	                              rules: [
	                                { required: true, message: '验证码不能为空' },
	                                { validator: this.validatorVcode }
	                              ],
	                          })(
	                            <Input id="control-Vcode" placeholder="验证码"/>
	                          )}
                              <Button
                                  disabled={wait === 'loading' || wait > 0}
                                  className="input-group-addon"
                                  onClick={this.sendVCode}>
                                  {wait === 'loading'?<Icon type="loading" /> :wait > 0? `(${wait})s后重新获取` : "免费获取验证码"}
                              </Button>
	                        </FormItem>
	                      </span>
	                    )
	                  :
	                    undefined
	                  }
	                <Button
	                    type="primary"
	                    htmlType="submit"
	                    size="large"
	                >
	                  确定
	                </Button>
	            </Form>
	        </div>
	    );
   }
}

index = createForm()(index);
export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)
