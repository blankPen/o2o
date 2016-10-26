/*
 * @Author: MoCheng
 */
'use strict';
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
    		wait: 0,/* 验证码发送倒计时秒数，默认0，最大60*/
  		  type: "bindMobile",/* 修改绑定手机号操作类型*/
        type2: "modifyMobile",/* 绑定手机号操作操作类型*/
        nextStep: false
    	}
  	}
    sendVCode=()=>{
      console.log("发送验证码。。。");
      let phone=this.state.userInfo.memberMobile;
      this.props.dispatch(getVerifyCode({
              "type": this.state.type2,
              "mobile": phone
          },(re)=> {
            if(re.result==1){
              this.setState({
                  wait2: 60
              })
              message.success("验证码已发送请查收");
              console.log(re.data.verifyCode);
              this.g = setInterval(() => {
                  if (this.state.wait == -1) {
                      clearInterval(this.g);
                  }
                  this.setState({
                      wait2: this.state.wait - 1
                  })
              }, 1000)
            } else {
                this.setState({
                    wait2: 0,
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
        let phone=this.state.userInfo.memberMobile;
        let validateCode=this.props.form.getFieldValue('Vcode');
        this.props.dispatch(getCheckCode({
            "validateCode" : validateCode,
            "type" : this.state.type2,
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
    phoneExists = (rule, value, callback) => {
      if(value==""){
        callback([new Error('手机号码不能为空！')]);
      }else {
          callback();
      }
    }
  	sendDCode=()=>{
        console.log("发送验证码。。。");
        let phone=this.props.form.getFieldValue('phone');
        let bool=false;
        this.props.form.validateFields(['phone'],(errors,values)=>{
          if (errors) {
            return;
          }
          bool=true;
        });
        if (bool) {
          this.setState({
              wait: "loading"
          })
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
                  this.c = setInterval(() => {
                      if (this.state.wait == -1) {
                          clearInterval(this.c);
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
        }else{
          document.getElementById("phone").focus();
          this.setState({
              wait: "0"
          })
        }
    }

    validatorDcode=(rule, value, callback)=>{
        console.log(" 验证验证码。。。");
        let phone=this.props.form.getFieldValue('phone');
        let validateCode=this.props.form.getFieldValue('Dcode');
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
    handleNext=()=>{
      this.props.form.validateFields(['Vcode'],(errors,values)=>{
        if (errors) {
          return;
        }
        console.log("进入下一步，绑定手机号码");
        this.setState({
           nextStep: true
        })
      });
    }
    componentWillUnmount() {
      if(this.c){
        clearInterval(this.c);
      }
      if(this.g){
        clearInterval(this.g);
      }
    }
    resetForm=()=> {
      this.props.form.resetFields();
    }
  	render() {
	    return (
	     	  <div className="phone-box">
          	<Form horizontal onSubmit={this.handlePhoneSubmit}
              onSubmit={(e)=>{
                    e.preventDefault();
                  console.log("handlePhoneSubmit");
                  this.props.form.validateFields((errors, values) => {
                    this.props.handleSubmit(errors,values,()=>{
                      console.log("回调，刷新phone-box表单。。。。");
                      this.resetForm();
                    });
                  })
              }}
            >
            {this._stepOne()}
            {this._stepTwo()}
            {this.state.nextStep?
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  确定
                </Button>
              :
                <div
                  className="next_btn"
                  onClick={this.handleNext}
                >
                  下一步
                </div>
            }
          </Form>
        </div>
	    );
   }
   _stepOne=()=>{
      if(!this.state.nextStep){
        const {
          getFieldDecorator,
          getFieldError,
          isFieldValidating
        } = this.props.form;
        const userInfo = this.props.info || {};
        const wait2 = this.state.wait2;
        let phone="";
        if(userInfo){
          phone=(userInfo.isBind===1)?userInfo.memberMobile.substring(0,3) + "****" + userInfo.memberMobile.substring(8,11) : "尚未绑定手机号码";
        }
        return(
          <div>
            {userInfo.isBind===1?
                (
                <div className="stepOne_style">
                  <span className="step_title"> 第1步</span>
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
                  <FormItem
                    id="control-Vcode"
                    className="validatCodeType"
                    {...formItemLayout}
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
                        disabled={wait2 === 'loading' || wait2 > 0}
                        className="input-group-addon"
                        onClick={this.sendVCode}>
                        {wait2 === 'loading'?<Icon type="loading" /> :wait2 > 0? `(${wait2})s后重新获取` : "免费获取验证码"}
                    </Button>
                  </FormItem>
                </div>
                )
              :
              <div className="stepTwo_style">{this._default()}</div>
            }
          </div>
        );
      }else{
        return false;
      }
   }
   _stepTwo=()=>{
      if(this.state.nextStep){
        return(
          <div className="stepTwo_style">
            <span className="step_title"> 第2步</span>
            {this._default()}
          </div>
        )
      }else{
        return false;
      }
   }
   _default=()=>{
      const {
        getFieldDecorator,
        getFieldError,
        isFieldValidating
      } = this.props.form;
      const userInfo = this.props.info || {};
      const wait = this.state.wait;
      return(
        <span>
          <FormItem
            id="control-phone"
            {...formItemLayout}
            label="新手机号码"
            hasFeedback
            help={isFieldValidating('phone') ? 'validating...' : (getFieldError('phone') || []).join(', ')}
          >
          {getFieldDecorator('phone', {
            rules: [
              {  required: true, pattern: /^1((3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$)/ , message: '手机号码格式不正确！' },
              {  validator: this.phoneExists }
            ],
          })(
            <Input id="control-phone" placeholder="请输入手机号，未注册将自动注册" />
          )}
          </FormItem>
          <Row>
              <Col span={7}>
              </Col>
              <Col span={12}>
                  <Button
                      disabled={wait === 'loading' || wait > 0}
                      className="input-group-addon"
                      onClick={this.sendDCode}>
                      {wait === 'loading'?<Icon type="loading" /> :wait > 0? `(${wait})s后重新获取` : "免费获取手机动态码"}
                  </Button>
              </Col>
          </Row>
          <FormItem
            id="control-Dcode"
            {...formItemLayout}
            label="短信动态码"
            hasFeedback
            help={isFieldValidating('Dcode') ? 'validating...' : (getFieldError('Dcode') || []).join(', ')}
          >
          {getFieldDecorator('Dcode', {
              rules: [
                { required: true, message: '动态码不能为空' },
                { validator: this.validatorDcode }
              ],
          })(
            <Input id="control-Dcode" placeholder="动态码"/>
          )}
          </FormItem>
        </span>
      );
   }
}

index = createForm()(index);
export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)