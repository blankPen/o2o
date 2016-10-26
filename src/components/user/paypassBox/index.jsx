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
        wait: 0,/* 验证码发送倒计时秒数，默认0，最大60*/
        type: props.type
      }
    }
    sendVCode=()=>{
      console.log("发送验证码。。。");
      let phone=this.state.userInfo.memberMobile;
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
              this.d = setInterval(() => {
                  if (this.state.wait == -1) {
                      clearInterval(this.d);
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
        let phone=this.state.userInfo.memberMobile;
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
      if(this.d){
        clearInterval(this.d);
      }
    }
    checkOldPass=(rule, value, callback)=>{
      console.log("您的旧支付密码为："+ value);
      callback();
    }
    checkPass=(rule, value, callback)=> {
        const form = this.props.form;

        if (form.getFieldValue('pass') && this.state.dirty) {
          form.validateFields(['rePass'], { force: true });
        }

        callback();
    }

    checkPass2=(rule, value, callback)=> {
        const form = this.props.form;

        if (value && value !== form.getFieldValue('pass')) {
          callback('您输入的两个密码不一致！');
        } else {
          callback();
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
      const userInfo = this.state.userInfo || {};
      let wait=this.state.wait;
      let phone="";
      if(userInfo){
        phone=(userInfo.isBind===1)?userInfo.memberMobile.substring(0,3) + "****" + userInfo.memberMobile.substring(8,11) : "尚未绑定手机号码";
      }
      return (
        <div className="paypass-box">
              <Form horizontal
                onSubmit={(e)=>{
                  e.preventDefault();
                console.log("handlePayPassSubmit");
                this.props.form.validateFields((errors, values) => {
                  this.props.handleSubmit(errors,values,()=>{
                    console.log("回调，刷新paypass-box表单。。。。");
                    this.resetForm();
                  });
                })
            }}
              >
              {userInfo.payPassword?
                <FormItem
                    id="control-oldpass"
                    label="旧支付密码"
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
                    label="设置支付密码"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('pass') ? 'validating...' : (getFieldError('pass') || []).join(', ')}
                  >
                    {getFieldDecorator('pass', {
                      rules: [
                        { required: true, whitespace: true, message: '请输入您的支付密码' },
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
                  <FormItem
                    id="control-rePass"
                    label="确认支付密码"
                    {...formItemLayout}
                    hasFeedback
                    help={isFieldValidating('rePass') ? 'validating...' : (getFieldError('rePass') || []).join(', ')}
                  >
                    {getFieldDecorator('rePass', {
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: '请确认支付密码',
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
                  {!userInfo.payPassword?
                    (
                      <span>
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
