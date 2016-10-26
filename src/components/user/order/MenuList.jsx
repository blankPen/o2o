'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Timeline, Icon,Button } from 'antd';
import {
    getOrderList,
    getMenuList
} from 'actions/UserAction';
import {
  Link
} from 'react-router';
import Dialog from 'components/common/Dialog/';

import ListView from 'components/common/ListView';
import Img from 'common/Img';
import History from 'common/History';
import {TimeConvert} from 'components/common/TimeConvert.jsx';

const moment = require('moment');
function mapStateToProps({
    common,
    userState
}){
    return {
        userInfo: common.userInfo,
        orderState:userState
    };
}
export class Timelines extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dsjtext:"",//倒计时文本
            ispay:true,//是否可支付
            show_dialog:false,//dialog是否显示
            dailog_title:"",//dialog标题
            dailog_text:""//dialog文本
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.detail&&nextProps.detail.createTime&&(!this.ds)){
            this.orderDjs(nextProps.detail);
        }
    }
    // componentDidMount(){
    //     console.log("this.detail：",this.props.detail);
    //     this.orderDjs();
    // }
    //销毁组件时关闭定时器
    componentWillUnmount(){
        this.ds&&clearInterval(this.ds);
    }
    //订单有效期倒计时
    orderDjs=(data)=>{
        let creatTime=data.createTime;
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
            // if(false){
            if(times<=0){
                //订单已到期
                this.setState({
                    dsjtext:"支付超时。",
                    ispay:false
                });
                clearInterval(this.ds);
            }else{
                let t=TimeConvert.secondTohms(times/1000,"array_ms");
                this.setState({
                    dsjtext:"请在"+t.fen+"分"+t.miao+"秒内支付，过时订单将自动取消。"
                });
            }
        }.bind(this),1000);
    }
    returnState=(state)=>{
         switch(state){
            case "0":
                return "已取消";
            case "10":
                return "待付款";
            case "20":
                return "在线支付";
            case "21":
                return "待发货";
            case "30":
                return "待收货";
            case "40":
                return "交易完成";
            case "50":
                return "货到付款待接单";
            case "60":
                return "已确认";
            default:
                return "未知";
        }
    }
    isNext=(data)=>{
    	let item=this.props.data&&this.props.data[this.props.data.length-1];
    	if(item&&item.changeState){
    		return this.returnState(item.changeState);
    	}else{
    		return false;
    	}
    }
    tousu=()=>{
        let userinfo=this.props.userInfo||{};
        History.push({ pathname: "/feedback", state: {
            memberId:userinfo.memberId,
            phone:userinfo.memberMobile,
            orderSn:this.props.detail&&this.props.detail.orderSn
        } });
    }
    //继续付款
    goPay=()=>{
        this.setState({
            show_dialog:true,
            dailog_title:"继续付款",
            dailog_text:""
        });
        if(!this.state.ispay){
            return;
        }
    }
    //取消订单
    clearOrder=(orderState)=>{
        this.setState({
            show_dialog:true,
            dailog_title:"取消订单",
            dailog_text:"请联系商家："+this.props.detail.storeTels
        });
        //可以直接取消
        if(orderState==10||orderState==20||orderState==50){

        }else if(orderState!=40){//需要联系商家取消

        }
    }
    //调往指定页面
    goUrl=(url)=>{
        History.push(url);
    }
    returnTimeList=()=>{
        let detail=this.props.detail||{};
        let orderState=this.props.detail&&this.props.detail.orderState;
        let succ=(<Icon type="check-circle-o" style={{ fontSize: '26px','color':'green' }} />);
        let error=(<Icon type="clock-circle-o" style={{ fontSize: '26px','color':'red'  }} />);
        let list=(detail.orderLogList||[]).map((item,i)=>{
            let display={"display":"none"};
            if(orderState!="10"&&orderState!="0"&&i==detail.orderLogList.length-1&&orderState!="40"){
                display={"display":"block"};
            }
                        return (
                            <Timeline.Item dot={succ} key={i}>
                                <span className="line-title">{item.stateInfo}</span>
                                <span className="line-time">{item.createTimeStr}</span>
                                <div className="daifukuan" style={display}> 
                                    <div className="djs">
                                        预计在{detail.predictedArrivalTime}送达，请耐心等待!
                                    </div>
                                    <div className="btnlist">
                                        <span className="btn jixu" onClick={this.cuidan}>确认收货</span>
                                        <span className="btn clear" onClick={this.cuidan}>我要催单</span>
                                        <span className="btn clear" onClick={this.clearOrder.bind(null,orderState)}>取消订单</span>
                                        
                                    </div>
                                </div>
                            </Timeline.Item>
                            );
                    });
        // if(true){
        if(orderState=="10"){
            list[0]=(<Timeline.Item dot={succ} key="0">
                        <span className="line-title">订单提交成功，等待付款</span>
                        <span className="line-time">{TimeConvert.minsCon(detail.createTime,"ymdhms")}</span>
                        <div className="daifukuan"> 
                            <div className="djs">
                                {this.state.dsjtext}
                            </div>
                            <div className="btnlist">
                                <span className="btn jixu" onClick={this.goPay}>继续付款</span>
                                <span className="btn clear" onClick={this.clearOrder.bind(null,orderState)}>取消订单</span>
                            </div>
                        </div>
                    </Timeline.Item>);
        }else if(orderState=="0"){
            list[detail.orderLogList.length-1]=(<Timeline.Item dot={succ} key="clear">
                        <span className="line-title">订单取消</span>
                        <span className="line-time">{TimeConvert.minsCon(detail.createTime,"ymdhms")}</span>
                        <div className="daifukuan"> 
                            <div className="djs">
                                订单已被取消
                            </div>
                            <div className="tip">
                                你的订单由于商家暂时无法配送已被商家取消
                            </div>
                            <div className="btnlist">
                                <span className="btn jixu" onClick={this.goUrl.bind(null,"/")}>选择其他商家</span>
                                <span className="btn clear" onClick={this.tousu}>订单反馈</span>
                            </div>
                        </div>
                    </Timeline.Item>);
        }
        return list;
    }
    //隐藏dialog
    handleOnCancel=()=>{
        this.setState({
            show_dialog:false
        });
    }
    //送达时间：predictedArrivalTime  商家电话storeTels 
     render(){
     	let data=this.props.data||[];
        let orderState=this.props.detail&&this.props.detail.orderState;
        let succ=(<Icon type="check-circle-o" style={{ fontSize: '26px','color':'green' }} />);
        let error=(<Icon type="clock-circle-o" style={{ fontSize: '26px','color':'red'  }} />);
     	let list = this.returnTimeList();
     	let istrue=this.isNext();
     	if(istrue){
     		list.push(
     		<Timeline.Item dot={error} key="thelast">
                <span className="line-title">{istrue}</span>
            </Timeline.Item>
     		);
     	}
     	
        return(
            <span style={{"width":"100%"}}>
                <Timeline>
                    {list}
                </Timeline>
                <Dialog
                    visible={this.state.show_dialog}
                    onCancel={this.handleOnCancel}
                    onOk={this.handleOnCancel}
                    title={this.state.dailog_title}
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.handleOnCancel}>确认</Button>
                    ]}
                  > 
                    {this.state.dailog_text}
                </Dialog>
                <div className="tousu">
                    <div className="tousu-hezi">
                        商家没有送餐？您可以致电客服 <span>010-65546961</span> 
                        {orderState==21||orderState==30||orderState==40||orderState==60?(
                            <div style={{"display":"inline-block"}}>或 <span onClick={this.tousu}>投诉商家</span>。</div>
                            ):null}
                        
                    </div>
                </div>
            </span>
            );
     }

}
export class MenuList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(getMenuList(this.props.orderId));
    }

     render(){
        let detail=this.props.orderState.detail||{};
        let address=detail.address||{};
        
        return(
            <div className="yincang-active yincang clearfix ">
                <div className="lfetlist">
                    <div className="head">菜品共 <span>{detail.orderGoodsList&&detail.orderGoodsList.length||0}</span> 份，总价 <span>¥{detail.orderAmount}</span> </div>
                    <ul className="caidan">
                    {(detail.orderGoodsList||[]).map((item,i)=>{
                        let price=parseFloat(item.goodsPrice)/parseInt(item.goodsNum);
                        price=price.toFixed(2);
                    	return (
                    		<li key={i}>
	                            <span className="name">{item.goodsName}</span>
	                            <span className="pirce">¥{price}*{item.goodsNum}</span>
	                        </li>
                    		);
                    })}
                    {(detail.orderCampaignList||[]).map((item,i)=>{
                    	return (
                    		<li key={item.id} className="special">
	                            <span className="name">{item.campaignName}</span>
	                            <span className="pirce">-¥{item.campaignPrice}</span>
	                        </li>
                    		);
                    })}
	                    {detail.shippingFee?(<li className="dashed">
                            <span className="name">配送费</span>
                            <span className="pirce">￥{detail.shippingFee}</span>
                        </li>):null}
	                    {detail.boxPrice?(<li>
                            <span className="name">餐盒费</span>
                            <span className="pirce">￥{detail.boxPrice}</span>
                        </li>):null}
	                    <li>
	                        <span className="name">优惠金额</span>
	                        <span className="pirce">￥{detail.discount}</span>
	                    </li>
                    </ul>
                    <ul className="personalDesc">
                        <li>地址：{address.address+"("+address.areaInfo+")"}</li>
                        <li>姓名：{address.trueName}({address.sex=="1"?"先生":"女士"})</li>
                        <li>电话：{address.mobPhone}</li>
                        {detail.orderMessage?(<li>备注：（{detail.orderMessage}）</li>):null}
                    </ul>
                    <div className="orderfooter">本订单由 {detail.shippingName} 提供专业高品质送餐服务</div>
                </div>
                <div className="rightTimeline">
                    <Timelines 
                    userInfo={this.props.userInfo} 
                    detail={this.props.orderState.detail} 
                    data={detail.orderLogList}></Timelines>
                </div>

            </div>
            
            );
     }
}
export default connect(
    mapStateToProps
)(MenuList)