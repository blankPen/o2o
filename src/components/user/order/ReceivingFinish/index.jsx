/*
 * @Author: MoCheng
 */
import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import store from 'stores';
import {Icon,Button,message,Form,Input,TimePicker,Row,Col } from 'antd';
import Rate from 'components/common/Rate';
import {
    myEvaluateInfo
} from 'actions/OrderAction';


const FormItem = Form.Item;
const createForm = Form.create;

const moment = require('moment');

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 17
  },
};

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
                              label="店铺评价："
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
                              label="配送评价："
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
                              label="送达时间："
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
                              label="推介美食："
                            >
                              {getFieldDecorator('foods')(
                                <div className="foods_style">
                                    {(detail.orderGoodsList||[]).map((item,i)=>{
                                        return(
                                            <Button className="foods_menu" id={"btn"+i} key={i} value={item.goodsId} title={item.goodsName}>
                                                <span className="btn_text" >{item.goodsName}</span>
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
                              label="补充评价："
                            >
                              {getFieldDecorator('add')(
                                <Input id="control-add" type="textarea" rows={4} />
                              )}
                            </FormItem>
                        </div>
                        <div className="evaluate_btn">
                          <Row>
                            <Col span={5}></Col>
                            <Col span={17}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="sign_btn"
                                    id="phone_btn"
                                    >
                                    提 交
                                </Button>
                                <span>提交之后不能修改哦</span>
                            </Col>
                          </Row>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}


/*function mapStateToProps(state) {
  return {

  };
}*/
let ViewReceiving= class extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      detail:{}
    }
  }
  componentWillMount() {
    store.dispatch(myEvaluateInfo({
          "memberId": this.props.memberId,
        },(re)=> {
          if(re.result==1){
            console.log("获取我的评价成功");
            (re.data||[]).map((item,i)=>{
              if(this.props.orderId==item.orderId){
                console.log("获取当前订单评价");
                 this.setState({
                    detail:item
                 })
              }else{
                console.log("其他订单评价");
              }
            })
          }else{
            console.log("获取我的评价失败");
          }
        }
    ));
  }

  render() {
    let currTime  = this.now = moment().format('YYYY-MM-DD HH:mm');
    let detail=this.state.detail;
    return (
       <div className="evaluate-box">
          <div className="evaluate_body">
                <div className="evaluate_li">
                    <Row className="line">
                      <Col span={5} className="line_left"><div className="left_title">我的评价</div></Col>
                      <Col span={17} className="line_right">
                          <span className="left_time">完成时间：{detail && detail.gevalAddTimeStr||currTime}</span>
                      </Col>
                    </Row>
                </div>
                <div className="evaluate_li">
                    <Row className="line">
                      <Col span={5} className="line_left">总体评价：</Col>
                      <Col span={17} className="line_right">
                          <Rate id="control-shoprate" disabled  value={detail && detail.gevalScore||0} />
                          {/*<span className="star_info">点击星星打分</span>*/}
                      </Col>
                    </Row>
                </div>
                <div className="evaluate_li">
                    <Row className="line">
                      <Col span={5} className="line_left">送达时间：</Col>
                      <Col span={17} className="line_right">
                        {detail && detail.gevalAddTimeStr||currTime}
                      </Col>
                    </Row>
                </div>
                 <div className="evaluate_li">
                  <Row className="line">
                    <Col span={5} className="line_left">推介美食：</Col>
                    <Col span={17} className="line_right">
                       <div className="foods_style">
                        {detail && (detail.orderGoodsList||[]).map((item,i)=>{
                            return(
                              <Button key={i} size="small" className={`foods_menu ${item.caizan===0?'foods_menu_active_up':item.caizan===1?'foods_menu_active_down':''}`} title={item.goodsName} >
                                  <span className="btn_text">{item.goodsName}</span>
                                  <i className="fa fa-thumbs-o-up" title="赞">
                                  </i>
                                  <i className="fa fa-thumbs-o-down" title="踩">
                                  </i>
                              </Button>
                            );
                        })}
                        </div>
                      </Col>
                  </Row>
                </div>
                <div className="evaluate_li">
                  <Row className="line">
                    <Col span={5} className="line_left">补充评价：</Col>
                    <Col span={17} className="line_right">
                        <Input
                          style={{ "minHeight": "82px"}}
                          id="control-add"
                          readOnly={true}
                          type="textarea"
                          autosize={true}
                          value={detail && detail.gevalContent||""}
                        />
                      </Col>
                  </Row>
                </div>
          </div>
      </div>
    );
  }
}

ReceivingFinish = createForm()(ReceivingFinish);
/*ViewReceiving = connect(
  mapStateToProps,
)(ViewReceiving)*/

export {
  ReceivingFinish,
  ViewReceiving
}

