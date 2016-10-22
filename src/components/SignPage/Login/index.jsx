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
  Icon,
  Checkbox,
  message,
  Modal
} from 'antd';
import Img from 'common/Img';
import Footer from 'components/common/Footer';
import {
    phoneLogin,
    otherLogin,
    getVerifyCode,
    getCheckCode
} from 'actions/SignPageAction';
import Aggrement from 'components/SignPage/Aggrement/';

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

function mapStateToProps({
    common
}){
    return {
        userInfo: common.userInfo
    };
}

let index = class extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      openPhoneFrom: false,
      openOtherFrom: true,
      wait: 0,
      openFormError:false,
      validate_info: "",
      type:"loginValidate",
      modalVisible: false
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

  phoneExists = (rule, value, callback) => {
    if(value==""){
      callback([new Error('手机号码不能为空！')]);
    }else {
        callback();
    }
  }

  handleSubmitPhone = (e) => {
    e.preventDefault();
    console.log("phoneSubmit");
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(' 表单验证错误!');
        return;
      }
      console.log('表单验证成功');
      console.log(values);
      let btn=document.getElementById('phone_btn')
      btn.disabled = true;
      this.props.dispatch(phoneLogin({
              "validateCode": values.Dcode,
              "username": values.phone
          },(re)=> {
            if(re.result==1){
              console.log('手机号码登录成功');
              message.success("登录成功");
            }else{
              console.log("手机号码登录失败");
              btn.disabled = false;
              this.setState({
                openFormError: true,
                validate_info: re.msg
              })
            }
          }
        )
      )
      if (values.autoLogon2) {
        console.log("勾选自动登陆");
      }
    });
  }
  handleSubmitOther = (e) => {
    e.preventDefault();
    console.log("otherSubmit");
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(' 表单验证错误!');
        return;
      }
      console.log('表单验证成功');
      console.log(values);
      let btn=document.getElementById('other_btn')
      btn.disabled = true;
      this.props.dispatch(otherLogin({
            "password": values.password,
            "username": values.name
          },(re)=> {
            if(re.result==1){
              console.log('其他账号登录成功');
              message.success("登录成功");
            }else{
              console.log("其他账号登录失败");
              btn.disabled=false;
              this.setState({
                openFormError: true,
                validate_info: re.msg
              })
            }
          }
        )
      )
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
      let phone= this.props.form.getFieldValue('phone');
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
              this.a = setInterval(() => {
                  if (this.state.wait == -1) {
                      clearInterval(this.a);
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
  handerOnFocus=()=>{
    this.setState({
      openFormError:false,
      validate_info: ""
    })
  }
  setModalVisible=(modalVisible)=> {
    this.setState({ modalVisible });
  }

  componentWillUnmount() {
    clearInterval(this.a);
  }
  render() {
    return (
      <div className="login_box">
        <div className="sign_head">
            <div className="sign_logo">
                <a href='/#/'>
                  <Img alt="雷铭O2O" src="logo.png" className="sign_img" />
                </a>
           </div>
        </div>
        <div className="sign_body">
            <div className="sign_body_left">
                <Img src="waimai.png" width="603" height="383"/>
            </div>
            <div className="sign_body_rigth">
                  {
                    this.state.openFormError?(
                      <div className="validate-info">
                        <i className="i3"></i>{this.state.validate_info}
                      </div>
                    ):undefined
                  }
                  <div className="sign_name">
                    <span className="span-left">账号登录</span>
                    {this.state.openOtherFrom?<a onClick={this.onChangeFrom} className="span-right" ><span >手机动态码登录</span><i className="i i2"></i></a>:undefined}
                    {this.state.openPhoneFrom?<a onClick={this.onChangeFrom} className="span-right" ><span >普通方式登录</span><i className="i i1"></i></a>:undefined}
                  </div>
                {this._PhoneFormBox()}
                {this._OtherFormBox()}
            </div>
        </div>
        <Footer/>
        <Modal
          className="full-screen-modal"
          title="《雷铭O2O用户协议》"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          width="100%"
          style={{ top: 0 }}
          onOk={() => this.setModalVisible(false)}
        >
          <Aggrement/>
        </Modal>
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
        <Form id="other_login_from" horizontal onSubmit={this.handleSubmitOther}  onFocus={this.handerOnFocus} >
          <div className="sign_input">
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
          <div className="sign_input">
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
            htmlType="submit"
            className="sign_btn"
            id="other_btn"
            >
             登 录
          </Button>
          <div className="sign_agreement">
            <span className="agreement_left">还没有账号？</span><a className="agreement_right" href="/#/register">免费注册</a>
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
      const wait = this.state.wait;
      return (
        <Form id="phone_login_from" horizontal onSubmit={this.handleSubmitPhone} onFocus={this.handerOnFocus}>
          <div className="sign_input">
            <i className="icon phone-photo"></i>
            <FormItem
              id="control-phone"
              {...formItemLayout}
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
            <Button
                disabled={wait === 'loading' || wait > 0}
                className="input-group-addon"
                onClick={this.sendDCode}>
                {wait === 'loading'?<Icon type="loading" /> :wait > 0? `(${wait})s后重新获取` : "免费获取手机动态码"}
            </Button>
          </div>
          <div className="sign_input">
            <i className="icon key-photo"></i>
            <FormItem
              id="control-Dcode"
              {...formItemLayout}
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
            htmlType="submit"
            className="sign_btn"
            id="phone_btn"
            >
            登 录
          </Button>
          <div className="sign_agreement">
            <p>提示： 未注册雷铭O2O账号的手机号，登录时将自动注册雷铭O2O账号，且代表您已同意<a href="javascript:void(0);" onClick={() => this.setModalVisible(true)}>《雷铭O2O网用户协议》</a></p>
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