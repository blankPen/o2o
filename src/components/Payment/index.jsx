/*
* @Author: chenjingwei
* @Date:   2016-10-26 15:31:52
* @Last Modified by:   chenjingwei
* @Last Modified time: 2016-10-26 15:31:52
*/

import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import Img from 'common/Img';
import { Radio } from 'antd';
import * as actions from'actions/OrderAction';
import Loading from'components/common/Loading/';
import History from 'common/History';

const RadioGroup = Radio.Group;

function mapStateToProps({
    orderState,
    common
}) {
  return {
    payInfo : orderState.payInfo||{},
    userInfo: common.userInfo || {}
  };
}

export class Payment extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        let memberId = this.props.userInfo.memberId;
        let orderSn = this.props.params.orderSn;
        this.state={
            minute:'00',
            second:'00',
            payWay:1,    // 1：微信 2：支付宝
            is_loading:true,
            values:{
                memberId:memberId,
                orderSn:orderSn,
                amount:0
            }
        }
    }


    componentWillMount(){
        let orderSn = this.props.params.orderSn;
        this.props.dispatch(actions.getPayInfo(orderSn,(res)=>{
            this.setState({
                is_loading:false
                values:{
                    ...this.state.values,
                    amount:res.data.orderAmount
                }
            });
        }));
    }


    componentDidMount(){
        this.orderDjs(this.props.payInfo);
    }

    orderDjs=(data)=>{
        let creatTime=data.createTime||new Date();
        if(data.orderState!="10"){
            this.ds&&clearInterval(this.ds);
            return ;
        }
        if(!creatTime){
            this.ds&&clearInterval(this.ds);
            return;
        }
        let jieshu=parseInt(creatTime+60*60*1000);
        this.ds=setInterval(function(){
            let date=new Date().getTime();
            let times=jieshu-date;
            if(times<=0){
                //订单已到期
                clearInterval(this.ds);
            }else{
                let t=TimeConvert.secondTohms(times/1000,"array_ms");
                this.setState({
                    dsjtext:"请在"+t.fen+"分"+t.miao+"秒内支付，过时订单将自动取消。"
                });
            }
        }.bind(this),1000);
    }

    changePayWay =(e)=>{
        this.setState({
          payWay: e.target.value
        });
    }

    toPayOrder =()=>{
        let payWay = this.state.payWay;
        let values = this.state.values;
        if(payWay=='1'){ //微信支付
            this.props.dispatch(actions.toWeiXinPay(values,()=>{
                //History.push('');
            }));
        }else if(payWay=='2'){//支付宝支付
            this.props.dispatch(actions.toAliPay(values,()=>{
                //History.push('');
            }));
        }
    }

    render() {
        let data = this.props.payInfo;
        return (
            <Loading isLoading={this.state.is_loading}>
                <div className="payment">
                    <div className="payment-head">
                        <div className="left-logo">
                            <Img alt="雷铭O2O" src="logo.png" />
                        </div>
                        <div className="step-box">
                            <Steps></Steps>
                        </div>
                    </div>
                    <div className="payment-body">
                        <div className="time-bar">
                            <div className="left-icon">
                                <i className="fa"></i>
                            </div>
                            <div className="right-time">
                                请在<span>{this.state.minute+":"+this.state.second}</span>
                                内完成支付, 超时订单会自动取消
                            </div>
                        </div>
                        <div className="order-info">
                            <div className="left-info">
                                {`项目：${data.storeName} - ${data.orderSn}`}
                            </div>
                            <div className="right-price">
                                应付金额：<span className="price">{`¥${data.orderAmount||0}`}</span>
                            </div>
                        </div>
                        <div className="tabs-head">
                            <div className="left-tab">微信/支付宝</div>
                            <div className="right-opinion">意见反馈</div>
                        </div>
                        <div className="pay-way-box">
                            <RadioGroup onChange={this.changePayWay} value={this.state.payWay}>
                                <Radio key="a" value={1}>
                                    <div className="pay-way">
                                        <Img src='https://p1.meituan.net/pay/pc_wxqrpay.png'></Img>
                                    </div>
                                </Radio>
                                <Radio key="b" value={2}>
                                    <div className="pay-way">
                                        <Img src='https://p0.meituan.net/pay/alipaypcnew.png'></Img>
                                    </div>
                                </Radio>
                            </RadioGroup>
                        </div>
                        <div className="determine-payment">
                            <div className="right-content">
                                <div className="pay-price">
                                    支付：<span className="price">{`¥${data.orderAmount||0}`}</span>
                                </div>
                                <div className="option">
                                    <div className="back">
                                        返回修改订单
                                    </div>
                                    <div className="to-pay" onClick={this.toPayOrder}>
                                        去付款
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Loading>
        );
    }
}

export class Steps extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.labelList=['1.提交订单','2. 选择支付方式','3. 购买成功'];
  }


  render() {
    let steps = [];
    let currentStep = this.props.currentStep||2;
    for(let i=1;i<=3;i++){
        steps.push(
            <div 
                key={i}
                className={
                "step"+(currentStep>=i?(currentStep==i?' is_finish is_current':' is_finish'):'')} 
            >
               {this.labelList[i-1]}
            </div>
        );
    }
    return (
        <div className="steps" >
            {steps}
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Payment)
