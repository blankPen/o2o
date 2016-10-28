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
import * as actions from'actions/OrderAction'
import Loading from'components/common/Loading/'
const RadioGroup = Radio.Group;

function mapStateToProps({orderState}) {
  return {
    payInfo : orderState.payInfo||{}
  };
}

export class Payment extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state={
            minute:'00',
            second:'00',
            value:1,
            is_loading:true
        }
    }


    componentWillMount(){
        let orderSn = this.props.params.orderSn;
        this.props.dispatch(actions.getPayInfo(orderSn,()=>{
            this.setState({
                is_loading:false
            });
        }));
    }

    changePayWay =(e)=>{
        this.setState({
          value: e.target.value,
        });
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
                            <RadioGroup onChange={this.changePayWay} value={this.state.value}>
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
                                    <div className="to-pay">
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
