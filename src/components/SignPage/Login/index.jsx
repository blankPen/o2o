/*
 * @Author: MoCheng
 */
import './index.less';
import React from 'react';
import {
  connect
} from 'react-redux';
import {
  Form,
  Button,
  Input,
  Checkbox,
  Row,
  Col
} from 'antd';
import Img from 'common/Img';
import Footer from 'components/common/Footer';

const FormItem = Form.Item;
const createForm = Form.create;

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 24
  },
};

function mapStateToProps(state) {
  return {

  };
}

let index = class extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      openPhoneFrom: false,
      openOtherFrom: true
    }
  }
  noop() {
    return false;
  }

  userExists = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'aaa') {
          callback([new Error('对不起，用户名已经在使用中。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  handleSubmitPhone = (e) => {
    e.preventDefault();
    console.log("phone");
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(' 表单验证错误!');
        return;
      }
      console.log('表单验证成功');
      console.log(values);
      if (values.autoLogon2) {
        console.log("勾选自动登陆");
      }
    });
  }
  handleSubmitOther = (e) => {
    e.preventDefault();
    console.log("other");
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(' 表单验证错误!');
        return;
      }
      console.log('表单验证成功');
      console.log(values);
      if (values.autoLogon) {
        console.log("勾选自动登陆");
      }
    });
  }
  onChangeFrom = () => {
    if (this.state.openPhoneFrom) {
      this.setState({
        openPhoneFrom: false,
        openOtherFrom: true
      })
    } else {
      this.setState({
        openPhoneFrom: true,
        openOtherFrom: false
      })
    }
  }

  render() {
    return (
      <div className="login_box">
        <div className="sign_head">
            <div className="sign_logo">
                <a href='#/'>
                  <i className="sign_img"></i>
                </a>
           </div>
        </div>
        <div className="sign_body">
            <div className="sign_body_left">
                <Img src="waimai.png" width="603" height="383"/>
            </div>
            <div className="sign_body_rigth">
                  <div className="sign_name">
                    <span className="span-left">账号登录</span>
                    {this.state.openOtherFrom?<a onClick={this.onChangeFrom} className="span-right" ><span >手机动态码登录</span><i className="i i2"></i></a>:undefined}
                    {this.state.openPhoneFrom?<a onClick={this.onChangeFrom} className="span-right" ><span >普通方式登录</span><i className="i i1"></i></a>:undefined}
                  </div>
                {this._PhoneFormBox()}
                {this._OtherFormBox()}
            </div>
            <div className="sign_clear"></div>
        </div>
        <Footer/>
      </div>
    );
  }
  _PhoneFormBox() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldValidating
    } = this.props.form;
    if (this.state.openOtherFrom) {
      return (
        <Form horizontal>
          <div className="sign_photo">
            <i className="icon user-photo"></i>
            <FormItem
              id="control-user"
              {...formItemLayout}
              hasFeedback
                  help={isFieldValidating('name') ? 'validating...' : (getFieldError('name') || []).join(', ')}
            >
              {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: '用户名不能为空！' }
                    ],
                })(
                <Input id="control-user" placeholder="手机号/用户名/邮箱" />
              )}
            </FormItem>
          </div>
          <div className="sign_photo">
            <i className="icon key-photo"></i>
            <FormItem
              id="control-password"
              {...formItemLayout}
              hasFeedback
                  help={isFieldValidating('password') ? 'validating...' : (getFieldError('password') || []).join(', ')}
            >
              {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: '密码不能为空！' }
                    ],
                })(
                <Input id="control-password" placeholder="密码" type="password"
                    autoComplete="off"  onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop} />
              )}
            </FormItem>
          </div>
          <div className="infos">
            <FormItem
              id="control-autoLogon"
              {...formItemLayout}
            >
              {getFieldDecorator('autoLogon', {
                rules: [
                  { type: 'boolean'},
                ],
              })(
                <Checkbox id="control-autoLogon" className="ant-checkbox-vertical"> 7天内自动登录</Checkbox>
              )}
                <div className="sign_forgetpasssword">
                    <a href='/#/forgetpwd'>忘记密码 ？ </a>
                </div>
            </FormItem>
          </div>
          <Button
            type="primary"
            onClick={this.handleSubmitOther}
            className="sign_btn"
            >
             登 录
          </Button>
          <div className="sign_agreement">
            <p>提示： 未注册美团账号的手机号，登录时将自动注册美团账号，且代表您已同意<a href="/">《美团网用户协议》</a></p>
          </div>
        </Form>
      );
    } else {
      return false;
    }
  }
  _OtherFormBox() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldValidating
    } = this.props.form;
    if (this.state.openPhoneFrom) {
      return (
        <Form horizontal>{/*<form onSubmit={this.handleSubmit} >*/}
          <div className="sign_photo">
            <i className="icon phone-photo"></i>
            <FormItem
              id="control-phone"
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating('phone') ? 'validating...' : (getFieldError('phone') || []).join(', ')}
            >
            {getFieldDecorator('phone', {
              rules: [
                { required: true, pattern: /^1((3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$)/, message: '手机号码格式不正确！' }
              ],
            })(
              <Input id="control-phone" placeholder="请输入手机号，未注册将自动注册" />
            )}
            </FormItem>
          </div>
          <div className="sign_photo">
            <i className="icon key-photo"></i>
            <FormItem
              id="control-Dcode"
              {...formItemLayout}
              hasFeedback
              help={isFieldValidating('Dcode') ? 'validating...' : (getFieldError('Dcode') || []).join(', ')}
            >
            {getFieldDecorator('Dcode', {
                rules: [
                  { required: true, message: '动态码不能为空！' }
                ],
            })(
              <Input id="control-Dcode" placeholder="动态码"/>
            )}
            </FormItem>
          </div>
          <div className="infos">
            <FormItem
              id="control-autoLogon2"
              {...formItemLayout}
              >
              {getFieldDecorator('autoLogon2', {
                rules: [
                  {type: 'boolean'},
                ],
              })(
                <Checkbox id="control-autoLogon2" className="ant-checkbox-vertical"> 7天内自动登录</Checkbox>
              )}
              <div className="sign_forgetpasssword">
                  <a href='/#/forgetpwd'>忘记密码 ？ </a>
              </div>
            </FormItem>
          </div>
          <Button
            type="primary"
            onClick={this.handleSubmitPhone}
            className="sign_btn"
            >
            登 录
          </Button>
          <div className="sign_agreement">
            <p>提示： 未注册美团账号的手机号，登录时将自动注册美团账号，且代表您已同意<a href="/">《美团网用户协议》</a></p>
          </div>
        </Form>
      )
    } else {
      return false;
    }
  }
}
index = createForm()(index);
export default connect(
  mapStateToProps,
  // Implement map dispatch to props
)(index)