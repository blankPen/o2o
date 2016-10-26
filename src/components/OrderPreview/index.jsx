'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Select } from 'antd';
import History from 'common/History';
import Img from 'common/Img';
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
        order: orderState.orderInfo,
        addressList: orderState.addressList
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
            postData:{
                remark: '',
                invoice: '21312313',
                paymentMethod: 0,
                deliveryTime:"14:00"
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
        },(res)=>{
            this.setState({
                selectAddress: res.data.address
            });
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
    handleChange = (value) => {
        console.log(`selected ${value}`);
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
                    selectAddress: {}
                });
            }
        }))
    }
    selectAddress=(address)=>{
        this.setState({
            selectAddress: address
        });
    }
    toggleAddressDialog=()=>{
        this.setState({
            show_address_dialog:!this.state.show_address_dialog
        });
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
                    <div className="address-out-scope">
                        该地址不在配送范围内
                    </div>
                    <div className="member-top">
                        <span className="member-name">{address.trueName}</span>
                        <span className="member-sex">
                            {address.sex=='1'?'先生：':'女生：'}
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
        salesCampaignList
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
                        <Select style={{ width: 200 }} onChange={this.handleChange}>
                            { salesCampaignList.length?
                                salesCampaignList.map((item,i)=>{
                                    return <Option value="lucy">Lucy</Option>
                                }):
                                <Option value="none">没有可用的优惠券</Option>}
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
        let data = [
            {value:0,label:'在线支付'},
            {value:1,label:'餐到付款'}
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
    render(){
        const { store={} } = this.props.order;


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
                                <div className="message">
                                    <span className="message-label">
                                        发票信息：
                                    </span>
                                    <div className="message-box">
                                        <input
                                            type="text"
                                            className="message-input"
                                            onChange={this.onChangeValue.bind(this,'invoice')}
                                            value={this.state.postData.invoice}
                                        />
                                    </div>
                                </div>
                                {this.renderPayMethod()}
                            </div>
                        </div>
                       <div className="preorder-time">
                            <span>期望送出时间：</span>
                            <Select defaultValue="now" style={{ width: 92 }} onChange={this.handleChange}>
                                  <Option value="now">立即送出</Option>
                                  <Option value="14:00">14:00</Option>
                                  <Option value="14:20">14:20</Option>
                            </Select>
                        </div>
                        <div className="order-info clearfix">
                            <div className="need-pay">
                                您需要支付<span className="need-price">￥117</span>
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
                            <div className="to-pay">
                                去付款
                            </div>
                            <div className="send-by">
                                * 由 美团专送 提供专业高品质送餐服务
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
