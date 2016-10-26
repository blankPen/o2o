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
            rePassBarShow: false,
            passStrength: 'L',
            rePassStrength: 'L'
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
    	console.log("你的旧密码为："+ value);
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

  	render() {
  		const {
	      getFieldDecorator,
	      getFieldError,
	      isFieldValidating
	    } = this.props.form;
	    const userInfo = this.state.userInfo || {};
	    return (
	     	<div className="password-box">
	            <Form horizontal
	            	onSubmit={(e)=>{
		            	e.preventDefault();
				        console.log("handlePasswordSubmit");
				        this.props.form.validateFields((errors, values) => {
					        this.props.handleSubmit(errors,values);
				        })
				    }}
	            >
	            {userInfo.isSettingPwd==1?
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
	        	undefined}
	                <FormItem
	                  id="control-pass"
	                  label="创建密码"
	                  {...formItemLayout}
	                  hasFeedback
	                  help={isFieldValidating('pass') ? 'validating...' : (getFieldError('pass') || []).join(', ')}
	                >
	                  {getFieldDecorator('pass', {
	                    rules: [
	                      { required: true, whitespace: true, message: '请输入你的密码' },
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
