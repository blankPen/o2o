'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Select,message } from 'antd';
import History from 'common/History';
import Img from 'common/Img';
import moment from 'moment';
import * as actions from 'actions/OrderAction';
import { deleteAddress } from 'actions/AddressAction';
import Dialog from 'components/common/Dialog';
import AddressForm from 'components/common/AddressForm';
const Option = Select.Option;

function mapStateToProps({
    orderState,
    common
}) {
    return {
        userInfo: common.userInfo,
        order: orderState.orderInfo || {},
        addressList: orderState.addressList,
        couponList: orderState.couponList
    };
}

export class OrderPreview extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        const { data:cartMap,storeId } = this.props.location.state;
        if(!cartMap || !storeId){
            History.replace('/');
        }
        this.state={
            show_address_dialog: false,
            editAddress: undefined,
            selectAddress: {},
            couponId: '',
            postData:{
                remark: '',
                invoice: '',
                paymentMethod: 0,
                deliveryTime:"",
                goodsIds: undefined,
                nums: undefined,
                storeId: undefined,
                memberId: undefined,
                addressId: undefined,
            }
        }
    }
    componentWillMount(){
        this.loadOrderDetail();
        this.loadAddress();
    }
    loadOrderDetail(){
        let memberId = this.props.userInfo.memberId;
        const { data:cartMap,storeId } = this.props.location.state;
        let goodsIds = [],nums = [];
        Object.keys(cartMap).forEach(id => {
            goodsIds.push(id);
            nums.push(cartMap[id].num);
        });
        this.props.dispatch(actions.getOrderInfo({
            storeId,
            memberId,
            goodsIds: goodsIds.join(','),
            nums: nums.join(','),
            couponId: this.state.couponId
        },({data,result,msg})=>{
            if(result == 1){
                let FORMAT_TEMP = 'YYYY-MM-DD HH:mm:ss';
                this.now = moment().format(FORMAT_TEMP);
                this.setState({
                    selectAddress: data.address || {},
                    postData: {
                        ...this.state.postData,
                        goodsIds: goodsIds.join(','),
                        nums: nums.join(','),
                        storeId,
                        memberId,
                        addressId: data.address && data.address.addressId,
                        deliveryTime: this.now,
                        paymentMethod: data.store.paymentMethod!=2?data.store.paymentMethod:0
                    }
                });
                this.loadCoupons();
            }else{
                message.error(msg);
                History.goBack();
            }
        }));
    }
    loadAddress(){
        // 请求收货地址列表
        let memberId = this.props.userInfo.memberId;
        const { storeId } = this.props.location.state;
        this.props.dispatch(actions.getAddressList({
            storeId,
            memberId,
        }));
    }
    loadCoupons(){
        let memberId = this.props.userInfo.memberId;
        const { storeId } = this.props.location.state;
        let orderAmount = this.props.order.totalPrice;
        this.props.dispatch(actions.getCouponList({
            storeId,
            memberId,
            orderAmount,
        }));
    }
    onChangeValue(key,value){
        value = value.target ? value.target.value : value;
        this.setState({
            postData: {
                ...this.state.postData,
                [key]: value
            }
        });
    }
    changeDecreasePrice=(couponId)=>{
        this.setState({
            couponId
        },()=>{
            this.loadOrderDetail();
        });
    }
    onAddAddress=(res)=>{
        console.log("添加地址成功",res);
        this.toggleAddressDialog();
        this.loadAddress();
    }
    onDelAddress=(id,e)=>{
        e.stopPropagation();
        this.props.dispatch(deleteAddress(id,()=>{
            this.loadAddress();
            let adr = this.state.selectAddress || {};
            if(adr.addressId = id){
                this.setState({
                    selectAddress: {},
                    postData: {
                        ...this.state.postData,
                        addressId: undefined,
                    }
                });
            }
        }));
    }
    selectAddress=(address)=>{
        this.setState({
            selectAddress: address,
            postData: {
                ...this.state.postData,
                addressId: address.addressId,
            }
        });
    }
    toggleAddressDialog=()=>{
        this.setState({
            show_address_dialog:!this.state.show_address_dialog,
            editAddress: !this.state.show_address_dialog?this.state.editAddress:undefined
        });
    }
    checkValues({remark, invoice, paymentMethod, deliveryTime, goodsIds, nums, storeId, memberId, addressId}){
        let flag = true;
        if(!addressId){
            message.error('请选择收货地址');
            flag = false;
        }else if(paymentMethod === undefined){
            message.error('请选择支付方式');
            flag = false;
        }else if(!goodsIds || !nums || !storeId || !memberId){
            message.error('订单已失效，请重新下单');
            flag = false;
        }
        return flag;
    }
    onPay=()=>{
        let values = this.state.postData;
        if(this.checkValues(values)){
            this.props.dispatch(actions.saveOrder(values,(res)=>{
                if(res.result == 1){
                    if(this.state.postData.paymentMethod == 1){
                        // 餐到付款
                        History.push('/user/order');
                    }else{
                        // 线上支付
                        History.push('/payment/'+res.data.orderSn);
                    }
                }else{
                    message.error(res.msg);
                }
            }));
        }
    }
    showEditDialog(address,e){
        e.stopPropagation();
        this.setState({
            show_address_dialog: true,
            editAddress: address
        });
    }
    renderAddressDialog=()=>{
        let address = this.state.editAddress || {};
        let title = address.addressId ? '修改地址' : '添加新地址';
        return(
            <Dialog
                visible={this.state.show_address_dialog}
                onCancel={this.toggleAddressDialog}
                title= {title}
            >
                <AddressForm
                    key={address.addressId || 'add'}
                    data={address}
                    onSubmit={this.onAddAddress}
                    onCancel={this.toggleAddressDialog}/>
            </Dialog>
        )
    }
    renderAddressList(){
        let selectAddress = this.state.selectAddress;
        let list = this.props.addressList;
        return list.map((address,i)=>{

            let className = "address-box";
            if(address.addressId == selectAddress.addressId){
                className+=" address-checked";
            }
            if(address.isDeliveryRange != 1){
                className+=" not-in-scope";
            }
            return (
                <div key={address.addressId} className={className}
                    onClick={address.isDeliveryRange ==1 && this.selectAddress.bind(this,address)}>
                    <div className="order-icon i-address-unavail-flag"></div>
                    <div className="member-top">
                        <span className="member-name">{address.trueName}</span>
                        <span className="member-sex">
                            {address.sex=='1'?'先生：':'女士：'}
                        </span>
                        <span className="member-phone">
                            {address.mobPhone}
                        </span>
                        <span className="operation-box">
                            <span onClick={this.showEditDialog.bind(this,address)}>
                                修改
                            </span>
                            <span onClick={this.onDelAddress.bind(this,address.addressId)}>
                                删除
                            </span>
                        </span>
                    </div>
                    <div className="address-bottom">
                        <span className="address-line">
                            {address.address}
                        </span>
                        <span className="address-area">
                            {address.areaInfo}
                        </span>
                    </div>
                </div>
            );
        })
    }
    rednerGoodsMenu(){
        const { goodsList=[],extraFeeList=[],salesCampaignList=[],totalPrice } = this.props.order;
        const couponList = this.props.couponList;
        return (
            <div className="content-left">
                <div className="goods-info">
                    <div className="info-item head">
                        <div className="left-info">菜品</div>
                        <div className="right-price">价格/份数</div>
                    </div>
                    {goodsList.map((item,i) => {
                        return (
                            <div key={i} className="info-item">
                                <div className="left-info">{item.goodsName}</div>
                                <div className="right-price">
                                    ¥{item.goodsPrice}*{item.goodsNum}
                                </div>
                            </div>
                        );
                    })}
                    {extraFeeList.map((item,i)=>{
                        return (
                             <div key={i} className="info-item">
                                <div className="left-info">{item.chargName}</div>
                                <div className="right-price">
                                    {`¥${item.amount}`}
                                </div>
                            </div>
                        )
                    })}
                    <div className="info-item total">
                        <div className="left-info">合计</div>
                        <div className="right-price">¥{totalPrice}</div>
                    </div>
                </div>
                <div className="info-footer">
                    <div className="operation">
                        <div className="operation-label">
                            优惠券：
                        </div>
                        <Select style={{ width: 200 }}
                            value={this.state.couponId}
                            onChange={this.changeDecreasePrice}>
                            { couponList.length?
                                <Option value={''}>请选择优惠券</Option> :
                                <Option value={''}>没有可用的优惠券</Option>}
                            {couponList.map((item,i)=>{
                                return <Option key={i} value={item.id+''}>
                                    {item.name}
                                </Option>
                            })}
                        </Select>
                    </div>
                </div>
                <div className="footer-img">
                    <Img src='order-bot-bg1.png'></Img>
                </div>
            </div>
        );
    }
    renderPayMethod(){
        const { store={} } = this.props.order;
        let flag = store.paymentMethod;
        let data = [
            {value:1,label:'餐到付款',disabled: flag==0 },
            {value:0,label:'在线支付',disabled: flag==1 },
        ];
        let paymentMethod = this.state.postData.paymentMethod;
        return (
            <div className="pay-way">
                <span className="pay-way-label">付款方式：</span>
                <div className="choose-way">
                    {data.map(item=>
                        <button
                            key={item.value}
                            type='button'
                            disabled={item.disabled}
                            title={item.disabled?`该商店不支持${item.label}`:''}
                            className={'btn'+(paymentMethod == item.value?' btn-select':'')}
                            onClick={this.onChangeValue.bind(this,'paymentMethod',item.value)}
                        >
                            {item.label}
                        </button>
                    )}
                </div>
            </div>
        )
    }
    renderTimeSelector(){
        let store = this.props.order.store || {};
        let opts = [];
        let FORMAT_TEMP = 'YYYY-MM-DD HH:mm:ss';
        opts.push(<Option key='now' value={this.now}>立即送出</Option>);
        let startTime = moment(moment(this.now).format('YYYY-MM-DD HH:00:00'));
        startTime = +new Date(startTime.format(FORMAT_TEMP))+60*60*1000;
        let beginTime,endTime;
        if(store.startBusinessTime && store.endBusinessTime){
            beginTime = new Date(moment(this.now).format(`YYYY-MM-DD ${store.startBusinessTime}:00`)).getTime();
            endTime = new Date(moment(this.now).format(`YYYY-MM-DD ${store.endBusinessTime}:00`)).getTime();
            if(new Date(this.now).getTime() < beginTime || new Date(this.now).getTime()>endTime){
                History.push(`/detail/${store.storeId}`);
                message.error('订单已失效，请重新下单');
            }
        }else{
            // 24小时营业
        }
        for (var i = 0; i < 10; i++) {
            let time = startTime + i*20*60*1000;
            if(endTime && time > endTime) break;
            time = moment(time);
            opts.push(<Option key={i} value={time.format(FORMAT_TEMP)}>{time.format('HH:mm')}</Option>);
        }
        return (
            <div className="preorder-time">
                <span>期望送出时间：</span>
                <Select
                    style={{ width: 92 }}
                    value={this.state.postData.deliveryTime}
                    onChange={this.onChangeValue.bind(this,'deliveryTime')}>
                    {opts}
                </Select>
            </div>
        )
    }
    render(){
        const { store={},totalPrice } = this.props.order;

        return(
            <div className="preview-body">
                <div className="breadcrumb">{store.storeName} >
                    <span> 确认购买</span>
                </div>
                {this.renderAddressDialog()}
                <div className="preview-content">
                    {this.rednerGoodsMenu()}
                    <div className="content-right">
                        <div className="address-info">
                            <div className="top-box">
                                <div className="title">
                                    <div className="address-label">请选择您的收餐地址</div>
                                    <div className="add-address" onClick={this.toggleAddressDialog}>
                                        <i className="fa fa-plus"></i>
                                        添加新地址
                                    </div>
                                </div>
                                <div className='select-address'>
                                    {this.renderAddressList()}
                                </div>
                                <div className="message">
                                    <span className="message-label">
                                        给商家留言：
                                    </span>
                                    <div className="message-box">
                                        <input
                                            type="text"
                                            className="message-input"
                                            onChange={this.onChangeValue.bind(this,'remark')}
                                            value={this.state.postData.remark}
                                            placeholder="不要辣，多放盐等口味要求" />
                                    </div>
                                </div>
                            {store.openInvoice == 1?
                                <div className="message">
                                    <span className="message-label">
                                        发票信息：
                                    </span>
                                    <div className="message-box">
                                        
                                            <input
                                                className="message-input"
                                                onChange={this.onChangeValue.bind(this,'invoice')}
                                                value={this.state.postData.invoice}
                                            />
                                    </div>
                                </div>:undefined
                            }
                                {this.renderPayMethod()}
                            </div>
                        </div>
                        {this.renderTimeSelector()}
                        <div className="order-info clearfix">
                            <div className="need-pay">
                                您需要支付<span className="need-price">￥{totalPrice}</span>
                            </div>
                            <div className="app-download">
                                <div className="download-label">
                                    使用App下单享更多优惠
                                </div>
                                <div className="to-download">
                                    <i className="fa fa-mobile-phone"></i>
                                    去下载
                                </div>
                            </div>
                            <div className="to-pay" onClick={this.onPay}>
                                {this.state.postData.paymentMethod == 1?
                                '确认订单':'去付款'}
                            </div>
                            <div className="send-by">
                                * {store.shippingMethod == 1?
                                    '由 雷铭专送 提供专业高品质送餐服务':
                                    '由 商家自身 提供送餐服务'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    mapStateToProps,
)(OrderPreview)
