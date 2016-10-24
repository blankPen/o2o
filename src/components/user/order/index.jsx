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
    getMenuList,
    selectItem
} from 'actions/OrderAction';
import {
  Link
} from 'react-router';
import ListView from 'components/common/ListView';
import Img from 'common/Img';
import MenuList from './MenuList.jsx';
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
        this.state={
            searchData:{}
        }
    }
    componentDidMount(){
        // this.props.dispatch(getOrderList(""));
    }
    
    onLoad=(params, callback)=>{
        this.props.dispatch(getOrderList(params, (res) => {
            callback(res.totalRows > res.pageSize * res.pageNo);
        }));
    }
    renderFooter=(loading,hasMore,self)=>{
        let list = this.props.orderState&&this.props.orderState.list || [];
        if(!list.length){
            return (
                <div className="nullMessage">
                    <i className="fa  fa-file-text-o" />
                    您暂时还没有订单，<Link to={"/"}>猛击这里</Link>，现在就来一份外卖！
                </div>
                );
        }
    }
    render(){
        let list = this.props.orderState&&this.props.orderState.list;
        return(
            <span>
                <ListView
                    dataSource={list}
                    params={this.state.searchData}
                    handleLoad={this.onLoad}
                    renderFooter={this.renderFooter}
                >
                    <MyOrder selectItem={this.props.orderState&&this.props.orderState.selectId} dispatch={this.props.dispatch}/>
                </ListView>
                {/*(list||[]).map((item,i)=>{
                    return(
                        <MyOrder key={i} data={item} dispatch={this.props.dispatch}></MyOrder>
                        );
                })*/}
            </span>
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
    zk=(id)=>{
        if(id==this.props.selectItem){
            id="";
        }
        this.props.dispatch(selectItem(id));
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
        let state=this.returnState(data.orderState);
        let day = moment.unix(1318781876).format('YYYY-MM-DD h:mm');
        return(
            <div className="orderDescs">
                <div className="theOrder" onClick={this.zk.bind(null,data.orderId)}>
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
                {data.orderId==this.props.selectItem?(
                    <MenuList dispatch={this.props.dispatch} orderId={data.orderId} />
                    ):null}
                
            </div>

            );
    }
}

export default connect(
    mapStateToProps
)(Order)