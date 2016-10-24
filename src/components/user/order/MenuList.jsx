'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
import {
    getOrderList,
    getMenuList
} from 'actions/UserAction';
import {
  Link
} from 'react-router';
import ListView from 'components/common/ListView';
import Img from 'common/Img';
import History from 'common/History';

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
     render(){
     	let data=this.props.data||[];
        let orderState=this.props.detail&&this.props.detail.orderState;
        let succ=(<Icon type="check-circle-o" style={{ fontSize: '26px','color':'green' }} />);
        let error=(<Icon type="clock-circle-o" style={{ fontSize: '26px','color':'red'  }} />);
     	
     	let list = data.map((item,i)=>{
                		return (
                			<Timeline.Item dot={succ} key={i}>
		                        <span className="line-title">{item.stateInfo}</span>
		                        <span className="line-time">{item.createTimeStr}</span>
		                    </Timeline.Item>
                			);
                	})
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
                {/*this.isNext(this.props.data)*/}

                </Timeline>
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
	                    <li className="dashed">
	                        <span className="name">配送费</span>
	                        <span className="pirce">￥{detail.shippingFee}</span>
	                    </li>
	                    <li>
	                        <span className="name">餐盒费</span>
	                        <span className="pirce">￥{detail.boxPrice}</span>
	                    </li>
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
                    detail={detail.detail} 
                    data={detail.orderLogList}></Timelines>
                </div>

            </div>
            
            );
     }
}
export default connect(
    mapStateToProps
)(MenuList)