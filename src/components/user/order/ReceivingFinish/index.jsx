import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import {Icon,Button,message,Form,Input,TimePicker,Rate } from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;

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

let ReceivingFinish =  class extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state={
            rateValue: 0,
            shoprateValue: 0
        }
    }

    handleShopRateChange=(value)=>{
        this.props.form.setFieldsValue({
          shoprate: value
        });
        this.setState({
            shoprateValue:value
        });
    }
    handleRateChange=(value)=>{
        this.props.form.setFieldsValue({
          rate: value
        });
        this.setState({
            rateValue:value
        });
    }
    newArray=(start, end)=>{
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }
    disabledMinutes=(value)=>{
      return this.newArray(0, 60).filter(value => value % 10 !== 0);
    }
    clickLikes=(val,id)=>{
        let btn=document.getElementById(id);
        btn.disabled=true;
        btn.className=btn.className+' foods_menu_active_up';
        let food=this.props.form.getFieldValue('foods');
        let foods="";
        if(food){
            foods=food+",";
        }
        this.props.form.setFieldsValue({
            foods: foods+val+"-1"
        });
    }
    removeLikes=(val,id)=>{
        let btn=document.getElementById(id);
        btn.disabled=true;
        btn.className=btn.className+' foods_menu_active_down';
        let food=this.props.form.getFieldValue('foods');
        let foods="";
        if(food){
            foods=food+",";
        }
        this.props.form.setFieldsValue({
            foods: foods+val+"-2"
        });
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
        let detail=this.props.detail||{};
       // let foods_name=['黄瓜炒肉','辣椒炒蛋','香干肉丝','羊杂汤'],foods_id=['1','2','3','4'];
        return (
            <div className="evaluate-box">
                <div className="evaluate_header">
                    <i className="fa fa-check-circle"></i>
                    <div className="title">收货成功，赏个评价吧！</div>
                </div>
                <div className="evaluate_body">
                    <Form
                        id="phone_login_from"
                        horizontal
                        onSubmit={(e)=>{
		                  	e.preventDefault();
			                console.log("evaluate-Submit");
			                this.props.form.validateFields((errors, values) => {
			                  	this.props.handleSubmit(errors,values,()=>{
				                    console.log("回调，刷新evaluate-box表单。。。。");
				                    this.resetForm();
			                  	});
		                	})
			            }}
                    >
                        <div className="evaluate_li">
                            <FormItem
                              id="control-shoprate"
                              {...formItemLayout}
                              label="店铺评价"
                              required
                            >
                              {getFieldDecorator('shoprate', {
                                  rules: [
                                    {
                                     required: true,
                                     type: 'number',
                                     message: '选择店铺评分' },
                                  ],
                                })(
                                <div>
                                    <Rate id="control-shoprate" onChange={this.handleShopRateChange} value={this.state.shoprateValue} />
                                    <span className="star_info">点击星星打分</span>
                                </div>
                              )}
                            </FormItem>
                        </div>
                         <div className="evaluate_li">
                            <FormItem
                              id="control-rate"
                              {...formItemLayout}
                              label="配送评价"
                              required
                            >
                              {getFieldDecorator('rate', {
                                  rules: [
                                    {
                                     required: true,
                                     type: 'number',
                                     message: '请选择配送评分' },
                                  ],
                                })(
                                <div>
                                    <Rate id="control-rate" onChange={this.handleRateChange} value={this.state.rateValue} />
                                    <span className="star_info">点击星星打分</span>
                                </div>
                              )}
                            </FormItem>
                        </div>
                        <div className="evaluate_li">
                            <FormItem
                              id="control-time"
                              {...formItemLayout}
                              label="送达时间"
                            >
                              {getFieldDecorator('time', {
                                rules: [
                                  {
                                    required: true,
                                    type: 'object',
                                    message: '选择送达时间',
                                  },
                                ],
                              })(
                                <TimePicker id="control-time"  format={'HH:mm'} disabledMinutes={this.disabledMinutes} hideDisabledOptions />
                              )}
                            <span className="time_header">当天</span>
                            <span className="time_footer">送达</span>
                            </FormItem>
                        </div>
                        <div className="evaluate_li">
                            <FormItem
                              {...formItemLayout}
                              label="推介美食"
                            >
                              {getFieldDecorator('foods')(
                                <div className="foods_style">
                                    {(detail.orderGoodsList||[]).map((item,i)=>{
                                        return(
                                            <Button className="foods_menu" id={"btn"+i} key={i} value={item.goodsId}>
                                                {item.goodsName}
                                                <i className="fa fa-thumbs-o-up" title="赞"
                                                    onClick={this.clickLikes.bind(null,item.goodsId,("btn"+i))}>
                                                </i>
                                                <i className="fa fa-thumbs-o-down" title="踩"
                                                    onClick={this.removeLikes.bind(null,item.goodsId,("btn"+i))}>
                                                </i>
                                            </Button>
                                        );
                                    })}
                                </div>
                              )}
                            </FormItem>
                        </div>
                        <div className="evaluate_li">
                            <FormItem
                              id="control-add"
                              {...formItemLayout}
                              label="补充评价"
                            >
                              {getFieldDecorator('add')(
                                <Input id="control-add" type="textarea" rows={4} />
                              )}
                            </FormItem>
                        </div>
                        <div className="evaluate_btn">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="sign_btn"
                                id="phone_btn"
                                >
                                提 交
                            </Button>
                            <span>提交之后不能修改哦</span>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
ReceivingFinish = createForm()(ReceivingFinish);

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(ReceivingFinish)
