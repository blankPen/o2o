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
  Radio
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

    render() {
      const {
        getFieldDecorator,
        getFieldError,
        isFieldValidating
      } = this.props.form;
      const userInfo = this.state.userInfo || {};
      return (
        <div className="sex-box">
          <Form horizontal
            onSubmit={(e)=>{
              e.preventDefault();
              console.log("handleSexSubmit");
              this.props.form.validateFields((errors, values) => {
                this.props.handleSubmit(errors,values,()=>{
                  console.log("回调，刷新sex-box表单。。。。");
                  this.resetForm();
                });
              })
            }}
          >
          <FormItem
            {...formItemLayout}
            label="性别"
          >
            {getFieldDecorator('sex', {
              rules: [
                { required: true,type:"number", message: '请选择你的性别' },
              ],
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={0}>女</Radio>
              </RadioGroup>
            )}
           {/* <span><Icon type="info-circle-o" /> No other gender</span>*/}
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
