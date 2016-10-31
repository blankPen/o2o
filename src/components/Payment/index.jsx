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
import {TimeConvert} from 'components/common/TimeConvert.jsx';
import Dialog from 'components/common/Dialog/';
import QRcode from 'common/qrcode'

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
            showDialog:false,
            renderDialogType:'wx',//is :选择支付成功或失败 wx:微信扫码支付 ot:支付超时
            wx_code:'',
            interval_id:0,
            tab_index:1
        }

        this.renderMap={
            is:this.renderIsPaySuccess(),
            wx:this.renderWeixinPay(),
            ot:this.renderOutTime()
        }
        this.dialogClassMap={
            is:'pay-success-dialog',
            wx:'weixin-pay-dialog',
            ot:'out-time-dialog'
        }
    }


    componentWillMount(){
        this.props.dispatch(actions.getPayInfo(this.props.params.orderSn,(res)=>{
            this.paySn = this.props.payInfo.paySn;
            this.orderDjs(this.props.payInfo);
            this.setState({
                is_loading:false
            });
        }));
    }
    componentWillUnmount(){
        this.ds&&clearInterval(this.ds);
    }

    toogleRenderDialog=()=>{
        clearInterval(this.state.interval_id);
        if(this.state.renderDialogType=='ot'){//如果是已超时
            History.push('/order');
        }
        
        this.setState({
            showDialog:!this.state.showDialog
        });
    }
    orderDjs=(data)=>{
        let creatTime=data.createTime||new Date().getTime();
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
                this.setState({
                    renderDialogType:'ot',
                    showDialog:true
                });
                clearInterval(this.ds);
            }else{
                let t=TimeConvert.secondTohms(times/1000,"array_ms");
                this.setState({
                    minute:t.fen,
                    second:t.miao
                });
            }
        }.bind(this),1000);
    }

    changePayWay =(e)=>{
        clearInterval(this.state.interval_id);
        this.setState({
          payWay: e.target.value
        });
    }

    changeTab =(index)=>{
        this.setState({
            tab_index:index
        });
    }

    renderDialog=()=>{
        return this.renderWeixinPay();
    }

    getPayResult=()=>{
        let id = setInterval(()=>{
            this.props.dispatch(actions.getPayResult(this.paySn,(res)=>{
                if(res.payState=="1"){
                    console.log("支付成功");
                    clearInterval(this.state.interval_id);
                }
            }));
        },2500);
        this.setState({
            interval_id:id
        });
    }

    toPayOrder =()=>{
        let payWay = this.state.payWay;
        let values = this.state.values;
        let index = this.state.tab_index;
        if(index==2){ //如果是余额支付
            let value = {
                amount:this.props.payInfo.orderAmount,
                payPassword:this.refs.pwd.value,
                orderSn:this.props.params.orderSn
            }
            this.props.dispatch(actions.toPredepositPay(value,(res)=>{
                if(res.result==1){
                    //余额支付成功
                }else{
                    this.refs.pwd_tips.innerHTML = res.msg;
                }
            }));

            return;
        }

        if(payWay=='1'){ //微信支付
            this.props.dispatch(actions.toWeiXinPay(this.paySn,(res)=>{//请求微信二维码url
                if(res.result==1){
                    this.toogleRenderDialog(); 
                    this.setState({
                        renderDialogType:'wx'
                    });
                    let dom = document.getElementById('qr_code');
                    if(dom){
                        dom.innerHTML=' ';
                    }
                    new QRcode(dom,{ //生成二维码
                        text:res.data.tocodeurl,
                        width:300,
                        height:300
                    });
                    this.getPayResult();    //计时请求订单状态
                }
            }));
        }else if(payWay=='2'){//支付宝支付
            let url = window.location.host+'/rest/api/order/getPaystate?paysn='+this.paySn;
            window.open(url);
        }
    }

    goBackToUpdate=()=>{
        History.push('/order');
    }

    renderWeixinPay=()=>{
        return(
            <div className="weixin-body clearfix">
                <div className="left-code">
                    <div className="title">
                        <div className="title-1">
                            请使用
                            <span className="change-color">
                                微信
                                <span className="icon-scan"></span>
                                扫一扫
                            </span>
                        </div>
                        <div className="title-2">
                            扫描二维码支付
                        </div>
                    </div>
                    <div className="code-img">
                        <div id="qr_code" className="qr_code"></div>
                    </div>
                    <div className="code-footer">
                        <i className="fa fa-clock-o"></i>
                        <span className="footer-tips">
                            二维码有效时间为2小时，请尽快支付
                        </span>
                    </div>
                </div>
                <div className="right-img">
                    <Img src='weixin-phone.jpg'></Img>
                </div>
            </div>
        )
    }

    renderIsPaySuccess=()=>{
        return(
            <div className="pay-success-body">
                <div className="left-icon">
                    <i className="fa  fa-exclamation-circle"></i>
                </div>
                <div className="right-content">
                    <div className="tips">
                        请您在新打开的页面上完成付款
                    </div>
                    <div className="tips-2">
                        付款完成之前请不要关闭此窗口。
                    </div>
                    <div className="tips-3">
                        完成付款后请根据您的情况点击下面的按钮：
                    </div>
                    <div className="btn-bar">
                        <button className="pay-btn" type='button'>已完成付款</button>
                        <button className="pay-faile" type='button'>付款遇到问题</button>
                    </div>
                    <div className="back-choose">
                        返回选择其他支付方式
                    </div>
                </div>
            </div>
        )
    }

    renderOutTime=()=>{
        return(
            <div className="out-time-body">
                <div className="tips">
                    <div className="left-icon">
                        <i className="fa  fa-exclamation-circle"></i>
                    </div>
                    <div className="right-text">已超过支付时间，该订单自动取消！</div>
                </div>
                <div className="return-order" onClick={this.goBackToUpdate}>
                    返回重新下单
                </div>
            </div>
        )
    }

    render() {
        let data = this.props.payInfo;
        return (
            <Loading 
                isLoading={this.state.is_loading}
                className='payment-bg'
            >
                <Dialog
                    className={this.dialogClassMap[this.state.renderDialogType]}
                    visible={this.state.showDialog}
                    onCancel={this.toogleRenderDialog}
                >
                  {this.renderMap[this.state.renderDialogType]}
                </Dialog>
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
                        <div className="tabs-head clearfix">
                            <div 
                                className={"tab"+(this.state.tab_index==1?' select-tab':'')} 
                                onClick={()=>this.changeTab(1)}
                            >
                                微信/支付宝
                            </div>
                            <div 
                                className={"tab"+(this.state.tab_index==2?' select-tab':'')} 
                                onClick={()=>this.changeTab(2)}
                            >
                                余额
                            </div>
                            <div className="right-opinion">意见反馈</div>
                        </div>
                        {
                            this.state.tab_index==1?(
                                <div className="pay-way-box">
                                    <RadioGroup 
                                        onChange={this.changePayWay} 
                                        value={this.state.payWay
                                    }>
                                        <Radio key="a" value={1}>
                                            <div className="pay-way">
                                                <Img 
                                                    src='https://p1.meituan.net/pay/pc_wxqrpay.png'
                                                ></Img>
                                            </div>
                                        </Radio>
                                        <Radio key="b" value={2}>
                                            <div className="pay-way">
                                                <Img 
                                                    src='https://p0.meituan.net/pay/alipaypcnew.png'
                                                >
                                                </Img>
                                            </div>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                            ):(
                               <div className="left-content">
                                    <span>请输入支付密码：</span>
                                    <input ref='pwd' className='pwd' type="password"/>
                                    <div className="pwd-tips" ref='pwd_tips'>
                                        请输入账户的 支付密码，不是登录密码。
                                    </div>
                                </div>
                            )
                        }
                        <div className="determine-payment clearfix">
                            
                            <div className="right-content">
                                <div className="pay-price">
                                    支付：<span className="price">{`¥${data.orderAmount||0}`}</span>
                                </div>
                                <div className="option">
                                    <div className="back" onClick={this.goBackToUpdate}>
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
