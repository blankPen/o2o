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
    		dirty: false,
            passBarShow: false,
            rePassBarShow: false,
            passStrength: 'L',
            rePassStrength: 'L'
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
	    return (
	     	<div className="name-box">
	          	<Form horizontal
	          		onSubmit={(e)=>{
		            	e.preventDefault();
				        console.log("handleNameSubmit");
				        this.props.form.validateFields((errors, values) => {
					        this.props.handleSubmit(errors,values,()=>{
					        	console.log("回调，刷新name-box表单。。。。");
					        	this.resetForm();
					        });
				        })
				    }}
			    >
	          	{userInfo.memberTruename?
	              <div className="old_name_style">
	                  <Row>
	                      <Col span={7}>
	                          <span className="old_name_lable">用户名：</span>
	                      </Col>
	                      <Col span={12}>
	                          <span className="old_name_text">{userInfo.memberTruename}</span>
	                      </Col>
	                  </Row>
	              </div>:undefined}
	              <FormItem
	                id="control-user"
	                {...formItemLayout}
	                label="新用户名"
	                hasFeedback
	                help={isFieldValidating('name') ? 'validating...' : (getFieldError('name') || []).join(', ')}
	              >
	                {getFieldDecorator('name', {
	                      rules: [
	                        { required: true, message: '用户名不能为空！' }
	                      ],
	                  })(
	                  <Input id="control-user" placeholder="请输入您的用户名" />
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
