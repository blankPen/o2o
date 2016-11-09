'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Timeline, Icon,Button,message } from 'antd';
import Loading from 'components/common/Loading/';
import {
    getOrderList,
    getMenuList,
    selectItem,
    theAjax
} from 'actions/UserAction';
import {
  Link
} from 'react-router';
import Dialog from 'components/common/Dialog/';
import {
    saveEvaluateInfo
} from 'actions/OrderAction';
import ListView from 'components/common/ListView';
import Img from 'common/Img';
import History from 'common/History';
import {TimeConvert} from 'components/common/TimeConvert.jsx';
import {
    ReceivingFinish,
    ViewReceiving
} from 'components/user/order/ReceivingFinish/';
import { getSign } from 'common/Ajax';

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

//时间轴单条组件
export class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dsjtext:"",//倒计时文本
            ispay:true,//是否可支付
            isCuiDan:false,//是否可催单
            cuiDanNum:0//记录当前页无刷新是否催单
        }
    }
    componentDidMount(){
        this.orderDjs(this.props.detail);
        let min=TimeConvert.dateDiff("n",new Date().getTime(),this.props.detail.creatTime);
        this.setState({
            isCuiDan:min>40?true:false
        });
    }
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
            if(times<1000*60*20&&this.state.cuiDanNum==0){
                this.setState({
                    isCuiDan:true,
                    cuiDanNum:1
                });
            }
            // if(false){
            if(times<=0){
                //订单已到期
                this.setState({
                    dsjtext:"支付超时。",
                    ispay:false
                });
                clearInterval(this.ds);
                this.props.refresh();
            }else{
                let t=TimeConvert.secondTohms(times/1000,"array_ms");
                this.setState({
                    dsjtext:"请在"+t.fen+"分"+t.miao+"秒内支付，过时订单将自动取消。"
                });
            }
        }.bind(this),1000);
    }
    //继续付款
    goPay=(orderSn)=>{
        if(!this.state.ispay){
            message.error("订单异常，请刷新页面重试!");
            return;
        }
        History.push("/payment/"+orderSn);
    }
    //取消订单请求
    clearAjax=(detail)=>{

        this.props.handleOnCancel({
            loading:true
        },()=>{
            this.props.dispatch(theAjax("/rest/api/order/cancleOrder",{
                orderSn:detail.orderSn
            },(res)=>{
                this.props.handleOnCancel({
                    loading:false
                });
                if(res.result){
                    message.success(res.msg);
                    this.props.refresh();
                }else{
                    message.error(res.msg);
                }
            },()=>{
                this.props.handleOnCancel({
                    loading:false
                });
                message.error("服务器异常,请尝试刷新页面!");
            }));

        });
    }
    //取消订单
    clearOrder=()=>{
        let detail=this.props.detail||{};
        if(detail.orderState==10||detail.orderState==20||detail.orderState==50){
            let div=(<div className="clearDialog">
                        <div className="center title">真的要取消此订单？</div>
                        <div className="center">若您已成功扣款，但订单仍显示未付款，建议您刷新页面查看最新状态。</div>
                        <div className="center">如需帮助，请致电客服 010-65546961</div>
                        <div className="btnlist center">
                            <div className="enter btn" onClick={this.clearAjax.bind(null,detail)}>嗯，是的</div>
                            <div className="clear btn" onClick={()=>{
                                this.props.handleOnCancel({
                                    loading:false,
                                    show_dialog:false
                                })
                            }}>不，再等等</div>
                        </div>
                    </div>);
            this.props.handleOnCancel({
                show_dialog:true,
                dailog_title:"取消订单",
                dailog_text:div
            });
        }else if(detail.orderState!=40){//需要联系商家取消
            this.props.handleOnCancel({
                show_dialog:true,
                dailog_title:"取消订单",
                dailog_text:"请联系商家："+this.props.detail.storeTels
            });
        }
        // this.props.loading(true,()=>{
        //     //可以直接取消

        //     this.props.loading(false);
        // });

    }
    //调往指定页面
    goUrl=(url)=>{
        History.push(url);
    }
    //催单
    cuidan=()=>{
        let detail=this.props.detail||{};
        this.props.loading(true,()=>{
            this.props.dispatch(theAjax("/rest/api/order/reminder",{
                orderId:detail.orderId
            },(res)=>{
                this.props.loading(false);

                if(res.result){
                    message.success(res.msg);
                    this.props.refresh();
                }else{
                    message.error(res.msg);
                }
                this.setState({
                    isCuiDan:false,
                    cuiDanNum:1
                });
            },()=>{
                this.props.loading(false);

                message.error("服务器异常,请尝试刷新页面!");
            }));
        });


    }
    //确认收货请求
    enterOrderAjax=(detail)=>{
        this.props.handleOnCancel({
            loading:true
        },()=>{
            this.props.dispatch(theAjax("/rest/api/order/finishOrder",{
                orderSn:detail.orderSn
            },(res)=>{
                this.props.handleOnCancel({
                    loading:false
                });
                if(res.result){
                    message.success(res.msg);
                    this.props.refresh();
                }else{
                    message.error(res.msg);
                }
            },()=>{
                this.props.handleOnCancel({
                    loading:false
                });
                message.error("服务器异常,请尝试刷新页面!");
            }));

        });
    }
    //确认收货
    enterOrder=()=>{
        let detail=this.props.detail||{};

        let div=(<div className="clearDialog">
                    <div className="center title">您确定已收到货物？</div>
                    <div className="center">如需帮助，请致电客服 010-65546961</div>
                    <div className="btnlist center">
                        <div className="enter btn" onClick={this.enterOrderAjax.bind(null,detail)}>确定</div>
                        <div className="clear btn" onClick={()=>{
                            this.props.handleOnCancel({
                                loading:false,
                                show_dialog:false
                            })
                        }}>取消</div>
                    </div>
                </div>);
        this.props.handleOnCancel({
            show_dialog:true,
            dailog_title:"确认收货",
            dailog_text:div
        });
    }
    //投诉商家
    tousu=()=>{
        let userinfo=this.props.userInfo||{};
        History.push({ pathname: "/feedback", state: {
            orderSn:this.props.detail&&this.props.detail.orderSn
        } });
    }
    //评价
    apply=()=>{
        History.push("/apply");
    }
    //用户只能是 10:待付款;20 在线支付待接单 50货到付款待接单 这三个状态能取消
    /*
    确认收货只能 30
    取消订单 10 20 50
    删除只能删除 0和40 两个状态
    投诉 21  30 40 60 四个状态
    催单21.60

    */
    render(){
        let item=this.props.item||{};
        let detail=this.props.detail||{};
        let orderState=detail.orderState;
        let succ=(<Icon type="check-circle-o" style={{ fontSize: '26px','color':'green' }} />);
        let error=(<Icon type="clock-circle-o" style={{ fontSize: '26px','color':'red'  }} />);
        let songda=detail.paymentState?TimeConvert.minsCon(detail.paymentTime+60*60*1000,"hm"):TimeConvert.minsCon(detail.createTime+60*60*1000,"hm");
        return(
             <Timeline.Item dot={this.props.isError?error:succ}>
                <span className="line-title">{item.stateInfo}</span>
                <span className="line-time">{item.createTimeStr}</span>
                <div className="daifukuan" style={this.props.display}>
                    <div className="djs">
                        {orderState=="10"?this.state.dsjtext:null}
                        {orderState=="0"?"订单已被取消":null}
                        {orderState=="30"?"预计在"+songda+"送达，请耐心等待!":null}
                    </div>
                    {orderState=="0"?(<div className="tip">
                        你的订单由于商家暂时无法配送或支付超时已被取消
                    </div>):null}
                    <div className="btnlist">
                        {orderState=="40"&&detail.evaluationStatus==0?(<span className="btn jixu" onClick={this.apply}>我要评价</span>):null}
                        {orderState=="0"?(<span className="btn jixu" onClick={this.goUrl.bind(null,"/")}>选择其他商家</span>):null}
                        {orderState=="10"&&this.state.ispay?(<span className="btn jixu" onClick={this.goPay.bind(null,detail.orderSn)}>继续付款</span>):null}
                        {orderState=="30"?(<span className="btn jixu" onClick={this.enterOrder}>确认收货</span>):null}
                        {(orderState=="21"&&orderState=="60")&&detail.reminderStatus==0?(<span className="btn clear" onClick={this.cuidan}>我要催单</span>):null}
                        {(orderState!="0"&&orderState!="40")?(<span className="btn clear" onClick={this.clearOrder}>取消订单</span>):null}
                        {(orderState=="21"||orderState=="30"||orderState=="40"||orderState=="60")&&detail.complaintStatus==0?(<span className="btn clear" onClick={this.tousu}>订单反馈</span>):null}

                    </div>
                </div>
            </Timeline.Item>
            );
    }
}
//订单时间轴组件
export class Timelines extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dsjtext:"",//倒计时文本
            ispay:true,//是否可支付
            loading:false,
            show_dialog:false,//dialog是否显示
            dailog_title:"",//dialog标题
            dailog_text:""//dialog文本
        }
    }
    //逻辑计算返回的时间树
    returnTimeList=()=>{
        let detail=this.props.detail||{};
        let orderState=this.props.detail&&this.props.detail.orderState;
        let list=(detail.orderLogList||[]).map((item,i)=>{
            let display={"display":"none"};
            if(i==detail.orderLogList.length-1){
                display={"display":"block"};
            }
            return (
                <Line loading={this.props.loading} refresh={this.props.refresh}
                    handleOnCancel={this.handleOnCancel}
                    item={item}
                    key={i}
                    detail={detail}
                    display={display}>
                </Line>
                );
        });
        // if(true){
        if(orderState=="10"){
            let display={"display":"block"};
            let item={stateInfo:"订单提交成功，等待付款",createTimeStr:TimeConvert.minsCon(detail.createTime,"ymdhms")};
            list[0]=(<Line loading={this.props.loading} refresh={this.props.refresh}
                        handleOnCancel={this.handleOnCancel}
                        item={item}
                        key="daifukuan"
                        detail={detail}
                        display={display}>
                    </Line>);
        }else if(orderState=="0"){
            let display={"display":"block"};
            let item=detail.orderLogList[detail.orderLogList.length-1];

            list[detail.orderLogList.length-1]=(<Line loading={this.props.loading} refresh={this.props.refresh}
                                                    handleOnCancel={this.handleOnCancel}
                                                    item={item}
                                                    key="clear"
                                                    detail={detail}
                                                    display={display}>
                                                </Line>);
        }
        if(orderState!="40"&&orderState!="0"){
            list=this.pushError(list,orderState);
        }
        return list;
    }
    //时间轴未完成步骤
    pushError=(list,orderState)=>{
        let detail=this.props.detail||{};
        let display={"display":"none"};
        let item={stateInfo:"已付款,待商家确认订单",createTimeStr:""};
        if(orderState==50||orderState==10){
            if(orderState==50){
                item={stateInfo:"货到付款,待商家确认订单",createTimeStr:""};
            }
            orderState=-1;
        }
        switch(orderState){
            case -1:
                // return "代付款";
                list.push(<Line loading={this.props.loading} refresh={this.props.refresh}
                                handleOnCancel={this.handleOnCancel}
                                item={item}
                                isError={true}
                                key="yifukuan"
                                detail={detail}
                                display={display}>
                                </Line>);
            // case 50:
            //     // return "货到付款待接单";
            //     item={stateInfo:"货到付款,待商家确认订单",createTimeStr:""};
            //     list.push(<Line loading={this.props.loading} refresh={this.props.refresh}
            //                     item={item}
            //                     isError={true}
            //                     key="daijiedan"
            //                     detail={detail}
            //                     display={display}>
            //                     </Line>);
            case 60:
                // return "已确认";
                item={stateInfo:"商家正在准备商品",createTimeStr:""};
                list.push(<Line loading={this.props.loading} refresh={this.props.refresh}
                                handleOnCancel={this.handleOnCancel}
                                item={item}
                                isError={true}
                                key="daifahuo"
                                detail={detail}
                                display={display}>
                                </Line>);

            case 21:
                // return "待发货";
                item={stateInfo:"商家已发货，等待收货",createTimeStr:""};
                list.push(<Line loading={this.props.loading} refresh={this.props.refresh}
                                handleOnCancel={this.handleOnCancel}
                                item={item}
                                isError={true}
                                key="yifahuo"
                                detail={detail}
                                display={display}>
                                </Line>);
            case 30:
                // return "待收货";
                item={stateInfo:"我已收货",createTimeStr:""};
                list.push(<Line loading={this.props.loading} refresh={this.props.refresh}
                                handleOnCancel={this.handleOnCancel}
                                item={item}
                                isError={true}
                                key="yishouhuo"
                                detail={detail}
                                display={display}>
                                </Line>);
            default:
                item={stateInfo:"订单完成",createTimeStr:""};
                list.push(<Line loading={this.props.loading} refresh={this.props.refresh}
                    handleOnCancel={this.handleOnCancel}
                    item={item}
                    isError={true}
                    key="succ"
                    detail={detail}
                    display={display}>
                    </Line>);
        }
        return list;
    }
    //切换dialog显示
    handleOnCancel=(data={},call)=>{
        this.setState({
            ...this.state,
            ...data
        },call&&call());
    }
    //送达时间：predictedArrivalTime  商家电话storeTels
     render(){
     	let data=this.props.data||[];
        let orderState=this.props.detail&&this.props.detail.orderState;
        let succ=(<Icon type="check-circle-o" style={{ fontSize: '26px','color':'green' }} />);
        let error=(<Icon type="clock-circle-o" style={{ fontSize: '26px','color':'red'  }} />);
     	let list = this.returnTimeList();
        return(
            <span style={{"width":"100%"}}>
                <Timeline>
                    {list}
                </Timeline>

                <Dialog
                    visible={this.state.show_dialog}
                    onCancel={
                        ()=>{
                            this.handleOnCancel({show_dialog:false});
                        }
                    }
                    onOk={()=>{
                            this.handleOnCancel({show_dialog:false});
                        }}
                    title={this.state.dailog_title}
                  >
                    <Loading  isLoading={this.state.loading}>
                    {this.state.dailog_text}
                    </Loading>

                </Dialog>
                <div className="tousu">
                    <div className="tousu-hezi">
                        商家没有送餐？您可以致电客服 <span>010-65546961</span>
                        {(orderState==21||orderState==30||orderState==40||orderState==60)&&data.complaintStatus==0?(
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
        this.state={
            loading:false,
            showReceiving:true
        }
    }
    componentDidMount(){
         this.setState({
            loading:true
        },this.props.dispatch(getMenuList(this.props.orderId,()=>{
            this.setState({
                loading:false
            });
        })));
        // this.props.dispatch(getMenuList(this.props.orderId));
    }
    //详情刷新
    detailRefresh=()=>{
        this.setState({
            loading:true
        },this.props.dispatch(selectItem("",()=>{
            this.setState({
                loading:false
            });
        })));
    }
    //设置弹出框的显示状态
    loading=(flag,call)=>{
        this.setState({
            loading:!!flag
        },call&&call());
    }
    //订单列表刷新,同时设置不选择展开订单
    refresh=()=>{
        this.props.dispatch(selectItem(""));
        this.props.refresh();
    }
    closeToReceiving=(errors,values,callback)=>{
        let detail=this.props.orderState.detail||{};
       // console.log(detail);//detail.orderId,detail.storeId
        if (errors) {
            console.log(' 表单验证错误!');
            return;
        }
        console.log('表单验证成功');
        console.log(values);
        let upData = {
          orderId: detail.orderId,
          shopComments: values.add,
          shopStar: values.shoprate,
          productStepLike: values.foods,
          storeId: detail.storeId,
          numberOfStars: values.rate,
          timestamp: Date.now()
        };
        upData.sign = getSign(upData);
        console.log(upData)
        this.props.dispatch(saveEvaluateInfo({
              ...upData
            },(re)=> {
                if(re.result==1){
                    this.props.dispatch(getMenuList(this.props.orderId,()=>{
                        this.setState({
                            loading:false,
                            showReceiving:false
                        });
                    }))
                }else{
                    message.error(re.msg);
                }
            }
        ));
    }
     render(){
        let detail=this.props.orderState.detail||{};
        let address=detail.address||{};
        let orderState=detail.orderState;
        console.log(detail,orderState,detail.evaluationStatus);
        orderState=40;
        return(
            <div className="yincang-active yincang clearfix ">
                <Loading  isLoading={this.state.loading}>
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
                    {orderState=="40"&&detail.evaluationStatus==0?//未评价  this.state.showReceiving===1  orderState=="40"&&detail.evaluationStatus==0?
                            (<ReceivingFinish detail={detail} handleSubmit={this.closeToReceiving}/>)
                        :orderState=="40"&&detail.evaluationStatus==1?//已评价   this.state.showReceiving===2  orderState=="40"&&detail.evaluationStatus==1?
                            (<ViewReceiving memberId={this.props.userInfo.memberId} orderId={detail.orderId} />)
                        ://时间轴
                            (
                                <Timelines
                                    loading={this.loading}
                                    refresh={this.refresh}
                                    userInfo={this.props.userInfo}
                                    detail={this.props.orderState.detail}
                                    data={detail.orderLogList}>
                                </Timelines>
                            )
                    }
                    </div>
                </Loading>
            </div>

            );
     }
}

MenuList =connect(
    mapStateToProps
)(MenuList)
Line =connect(
    mapStateToProps
)(Line)

export default MenuList;
