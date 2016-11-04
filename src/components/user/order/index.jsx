'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Timeline, Icon,message } from 'antd';
import Loading from 'components/common/Loading/'

import {
    getOrderList,
    getMenuList,
    selectItem,
    theAjax
} from 'actions/UserAction';
import {
  Link
} from 'react-router';
import ListView from 'components/common/ListView';
import Img from 'common/Img';
import MenuList from './MenuList.jsx';
import History from 'common/History';
import {TimeConvert} from 'components/common/TimeConvert.jsx';


function mapStateToProps({
    common,
    userState
}){
    return {
        userInfo: common.userInfo,
        orderState:userState
    };
}
//订单组件
export class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchData:{
                memberId:props.userInfo&&props.userInfo.memberId
            },
            loading:false
        }
    }
    // componentWillMount(){
    //     console.log("comdid");
    //     this.loading(true);
    // }
    loading=(flag,call)=>{
        this.setState({
            loading:!!flag
        },call&&call());
    }
    onLoad=(params, callback)=>{
        this.props.dispatch(getOrderList(params, (res) => {
            callback(res.totalRows > res.pageSize * res.pageNo);
        }));
        this.setState({
            loading:false
        });
    }
    //无数据返回的元素
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
    refresh=(flag)=>{
        if(flag){
            this.refs.listview.refresh();
        }else{
            this.setState({
                loading:true
            },()=>{
                this.refs.listview.refresh();
            });
        }
        
    }
    render(){
        let list = this.props.orderState&&this.props.orderState.list;
        let memberId=this.props.userInfo&&this.props.userInfo.memberId;
        return(
            <span>
                <Loading  isLoading={this.state.loading}>
                <ListView
                    ref="listview"
                    dataSource={list}
                    params={this.state.searchData}
                    handleLoad={this.onLoad}
                    renderFooter={this.renderFooter}
                >
                    <MyOrder 
                    loading={this.loading}
                    memberId={memberId}
                    refresh={this.refresh}
                    selectItem={this.props.orderState&&this.props.orderState.selectId} 
                    dispatch={this.props.dispatch}/>
                </ListView>
                {/*(list||[]).map((item,i)=>{
                    return(
                        <MyOrder key={i} data={item} dispatch={this.props.dispatch}></MyOrder>
                        );
                })*/}
                </Loading>
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
    //选择展开订单详情
    zk=(id)=>{
        if(id==this.props.selectItem){
            id="";
        }
        this.props.dispatch(selectItem(id));
    }
    //判断状态返回相应的描述
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
    //去店铺详情页
    goDetail=(e)=>{
        let data=this.props.data||{};
        
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        History.push("/detail/"+data.storeId);
    }
    //删除订单
    removeOrder=(e)=>{
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        this.props.loading(true,()=>{
            let data=this.props.data||{};
            this.props.dispatch(theAjax("/rest/api/order/delOrder",{
                orderId:data.orderId
            },(res)=>{
                if(res.result){
                    message.success(res.msg);
                    this.props.refresh(true);
                }else{
                    message.error(res.msg);
                }
            },()=>{
                message.error("服务器异常,请尝试刷新页面!");
            }));
        });
        
    }
    //再来一单
    aginOrder=()=>{
        let data=this.props.data||{};
        History.push("/detail/"+data.storeId);
    }
    //取消订单
    // clearOrder=()=>{
    //     let data=this.props.data||{};
    //     this.props.dispatch(theAjax("/rest/api/order/cancleOrder",{
    //         orderSn:data.orderSn
    //     },(res)=>{
    //         if(res.result){
    //             message.success(res.msg);
    //             this.props.refresh();
    //         }else{
    //             message.error(res.msg);
    //         }
    //     },()=>{
    //         message.error("服务器异常,请尝试刷新页面!");
    //     }));
    // }
    //确认收货
    // enterOrder=()=>{
    //     let data=this.props.data||{};
    //     this.props.dispatch(theAjax("/rest/api/order/finishOrder",{
    //         orderSn:data.orderSn
    //     },(res)=>{
    //         if(res.result){
    //             message.success(res.msg);
    //             this.props.refresh();
    //         }else{
    //             message.error(res.msg);
    //         }
    //     },()=>{
    //         message.error("服务器异常,请尝试刷新页面!");
    //     }));
    // }
    render(){
        let data=this.props.data||{};
        let state=this.returnState(data.orderState);
        let day = TimeConvert.minsCon(data.createTime,'ymdhms');
        return(
            <div className="orderDescs">
                <div className="theOrder" onClick={this.zk.bind(null,data.orderId)}>
                    <div className="headimg">
                        <Img isShow={true} src={data.storeLogo}/>
                    </div>
                    <div className="orderdesc">
                        <div className="title" onClick={this.goDetail}>
                            <span className="text">{data.storeName}</span>
                            <span className="right"><i className="fa fa-arrow-right" /></span>
                        </div>
                        <div className="ordercode thedesc">订单号：{data.orderSn}</div>
                    </div>
                    <div className="orderdesc">
                        <div className="phone thedesc">订单状态：{state}</div>
                        <div className="time thedesc">下单时间：{day}</div>
                    </div>
                    <div className="orderdesc orderdesc2">
                        <div className="thedesc">点击这里查看</div>
                    </div>
                    <div className="orderdesc orderdesc2 orderdesc-right">
                        {data.orderState==40?
                            (<div className="btnlist orderbtn" onClick={this.aginOrder}>再来一单</div>):null}
                        {data.orderState==0||data.orderState==40?(
                        <div className="btnlist remove" onClick={this.removeOrder}> 
                            删除订单
                        </div>
                        ):null}
                    </div>
                    
                </div>
                {data.orderId==this.props.selectItem?(
                    <MenuList refresh={this.props.refresh} dispatch={this.props.dispatch} orderId={data.orderId} />
                    ):null}
                
            </div>

            );
    }
}

export default connect(
    mapStateToProps
)(Order)
