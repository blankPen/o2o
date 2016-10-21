'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
import {
    getOrderList
} from 'actions/OrderAction';
import ListView from 'components/common/ListView';
import Img from 'common/Img';
const moment = require('moment');
function mapStateToProps(state) {
    return {
        orderState:state.orderState
    };
}
//订单组件
export class Order extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(getOrderList(""));
    }

     render(){
        let list = this.props.orderState&&this.props.orderState.list;
        return(
            <span>
                {(list||[]).map((item,i)=>{
                    return(
                        <MyOrder key={i} data={item}></MyOrder>
                        );
                })}
            </span>
            );
     }

}
export class Timelines extends React.Component {
    constructor(props) {
        super(props);
    }
     render(){
        let error=(<Icon type="clock-circle-o" style={{ fontSize: '26px','color':'red'  }} />);
        let succ=(<Icon type="check-circle-o" style={{ fontSize: '26px','color':'green' }} />);
        let prodata=this.props.data;
        return(
            <Timeline>
                <Timeline.Item dot={succ}>
                    <span className="line-title">订单提交成功，等待付款</span>
                    {/*<span className="line-time">2016-08-02 18:15</span>*/}
                </Timeline.Item>
                <Timeline.Item dot={succ}>
                    <span className="line-title">支付成功，等待商家接单</span>
                    {/*<span className="line-time">2016-08-02 18:15</span>*/}
                </Timeline.Item>
                <Timeline.Item dot={succ}>
                    <span className="line-title">商家接单，制作配送中</span>
                    {/*<span className="line-time">2016-08-02 18:15</span>*/}
                </Timeline.Item>
                <Timeline.Item dot={error}>
                    <span className="line-title">订单完成</span>
                    {/*<span className="line-time">2016-08-02 18:15</span>*/}
                </Timeline.Item>
            </Timeline>
            );
     }

}
//订单信息
export class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            zk:false
        }
    }
    zk=()=>{
        this.setState({
            zk:!this.state.zk
        });
    }
    returnState=(state)=>{
         switch(state){
            case 0:
                return "已取消";
            case 10:
                return "待付款";
            case 20:
                return "在线支付";
            case 21:
                return "待发货";
            case 30:
                return "待收货";
            case 40:
                return "交易完成";
            case 50:
                return "货到付款待接单";
            case 60:
                return "已确认";
            default:
                return "未知";
        }
    }
    render(){
        let data=this.props.data||{};
        let day = moment.unix(1318781876).format('YYYY-MM-DD h:mm');
        let state=this.returnState(data.orderState);
        return(
            <div className="orderDescs">
                <div className="theOrder" onClick={this.zk}>
                    <div className="headimg">
                        <Img src={data.storeLogo}/>
                    </div>
                    <div className="orderdesc">
                        <div className="title">
                            <span className="text">{data.storeName}</span>
                            <span className="right"><i className="fa fa-arrow-right" /></span>
                        </div>
                        <div className="ordercode thedesc">订单号：{data.orderSn}</div>
                    </div>
                    <div className="orderdesc">
                        <div className="phone thedesc">订单状态：{state}</div>
                        <div className="time thedesc">下单时间：{day}</div>
                    </div>
                    <div className="tousu"> <i className="fa  fa-edit" /> 投诉商家</div>
                </div>
                <div className={this.state.zk?"yincang-active yincang clearfix ":"yincang clearfix "}>
                    <div className="lfetlist">
                        <div className="head">菜品共 <span>43</span> 份，总价 <span>¥152.1</span> </div>
                        <ul className="caidan">
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li className="special">
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li className="dashed">
                                <span className="name">配送费</span>
                                <span className="pirce">¥0</span>
                            </li>
                        </ul>
                        <ul className="personalDesc">
                            <li>地址：美罗家园 (美安路美安苑19号楼1001室)</li>
                            <li>姓名：陈经纬(先生)</li>
                            <li>电话：15074861036</li>
                            <li>备注：（无）</li>
                        </ul>
                        <div className="orderfooter">本订单由 美团专送 提供专业高品质送餐服务</div>
                    </div>
                    <div className="rightTimeline">
                        <Timelines data={data}></Timelines>
                    </div>

                </div>
            </div>

            );
    }
}

export default connect(
    mapStateToProps
)(Order)