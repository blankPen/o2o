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
  Radio,
  InputNumber
} from 'antd';
import {
    getMemberDetail,
} from 'actions/SignPageAction';

import classNames from 'classnames';
const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;
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
        userInfo: props.info
      }
    }
    resetForm=()=> {
      this.props.form.resetFields();
    }
    checkPrime=(rule, value, callback)=>{
      if (value < 1.00) {
        callback(new Error('充值金额不能小于1.00'));
      }else if (value >= 1.00) {
        callback();
      } else {
        callback(new Error('请输入您的充值金额'));
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
        <div className="recharge-box">
          <Form horizontal
            onSubmit={(e)=>{
              e.preventDefault();
              console.log("handleRechargeSubmit");
              this.props.form.validateFields((errors, values) => {
                this.props.handleSubmit(errors,values,()=>{
                  console.log("回调，刷新Recharge-box表单。。。。");
                  this.resetForm();
                });
              })
            }}
          >
          <FormItem
            {...formItemLayout}
            label="充值金额"
            required
          >
            {getFieldDecorator('money', {
              rules: [
                { validator: this.checkPrime }
              ],
              initialValue:1
            })(
              <InputNumber style={{width:"100%"}} min={1} step={0.01}/>
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
