/*
 * @Author: MoCheng
 */
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
  Col,
  Checkbox
} from 'antd';
import Img from 'common/Img';
import {
    getVerifyCode,
    getCheckCode
} from 'actions/SignPageAction';
import Footer from 'components/common/Footer';

const FormItem = Form.Item;
const createForm = Form.create;
import classNames from 'classnames';

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  },
};

function mapStateToProps(state) {
  return {

  };
}

let index= class extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      wait: 0,
      type:"registerValidate",
      dirty: false,
      passBarShow: false,
      rePassBarShow: false,
      passStrength: 'L',
      rePassStrength: 'L',
    }
  }

  noop() {
    return false;
  }

  phoneExists = (rule, value, callback) => {
    if(value==""){
      callback([new Error('手机号码不能为空！')]);
    }else{
      callback();
    }
  }

  sendDCode=()=>{
    console.log("注册发送验证码。。。");
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
              this.b = setInterval(() => {
                  if (this.state.wait == -1) {
                      clearInterval(this.b);
                  }
                  this.setState({
                      wait: this.state.wait - 1
                  })
              }, 1000)
            } else {
                message.error(re.msg);
                this.setState({
                    wait: 0,
                    openFormError: true,
                    validate_info: "手机号不存在"
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
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
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

  componentWillUnmount() {
    clearInterval(this.a);
  }
  render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldValidating
    } = this.props.form;
    const wait = this.state.wait;
    return (
      <div className="register-box">
          <div className="sign_head">
            <div className="sign_logo">
                <a href='/#/'>
                  <i className="sign_img"></i>
                </a>
            </div>
          </div>
          <div className="sign_body">
            <Form horizontal onSubmit={this.handleSubmit}>
              <div className="sign_input">
                <FormItem
                  id="control-phone"
                  {...formItemLayout}
                  label="手机号"
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
                  <Col span={7}></Col>
                  <Col span={17}>
                    <Button
                      disabled={wait === 'loading' || wait > 0}
                      className="input-group-addon"
                      onClick={this.sendDCode}>
                      {wait === 'loading'?<Icon type="loading" /> :wait > 0? `(${wait})s后重新获取` : "免费获取手机动态码"}
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="sign_input">
                <FormItem
                  id="control-Dcode"
                  {...formItemLayout}
                  label="短信验证码"
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
              <div className="sign_input">
                <FormItem
                  label="创建密码"
                  {...formItemLayout}
                >
                  {getFieldDecorator('pass', {
                    rules: [
                      { required: true, whitespace: true, message: '请输入你的密码' },
                      { validator: this.checkPass },
                    ],
                  })(
                    <Input type="password"
                      onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                      autoComplete="off" id="pass"
                      onChange={(e) => {
                        console.log('你的密码是以这种方式被盗的', e.target.value);
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        this.setState({ dirty: this.state.dirty || !!value });
                      }}
                    />
                  )}
                </FormItem>
              </div>
              <div className="sign_input">
              <Row>
                  <Col span={7}></Col>
                  <Col span={17}>
                    {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
                  </Col>
              </Row>
              </div>
              <div className="sign_input">
                <FormItem
                  label="确认密码"
                 {...formItemLayout}
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
                    <Input type="password"
                      onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                      autoComplete="off" id="rePass"
                    />
                  )}
                </FormItem>
              </div>
              <Row>
                  <Col span={7}></Col>
                  <Col span={17}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="sign_btn"
                      >
                       同意以下协议并注册
                    </Button>
                  </Col>
              </Row>
              <div className="sign_input">
                <Col span={7}></Col>
                <FormItem
                  id="control-checkAggrement"
                  {...formItemLayout}
                >
                  {getFieldDecorator('checkAggrement', {
                    rules: [
                      { type: 'boolean'},
                    ],
                  })(
                    <Checkbox id="control-checkAggrement" className="ant-checkbox-vertical"> <a href="/#/">《美团网用户协议》</a></Checkbox>
                  )}
                </FormItem>
              </div>
            </Form>
          </div>
          <Footer/>
      </div>
    );
  }
}

index = createForm()(index);
export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)
