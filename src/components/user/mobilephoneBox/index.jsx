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
    		type: props.type
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
    componentWillUnmount() {
      if(this.c){
        clearInterval(this.c);
      }
    }
  	render() {
  		const {
	      getFieldDecorator,
	      getFieldError,
	      isFieldValidating
	    } = this.props.form;
	    const userInfo = this.state.userInfo || {};
	    const wait = this.state.wait;
	    return (
	     	<div className="phone-box">
              	<Form horizontal onSubmit={this.handlePhoneSubmit}>
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
                  <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={this.state.loading} >
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
