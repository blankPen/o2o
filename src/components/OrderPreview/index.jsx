'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Select } from 'antd';
import Img from 'common/Img';
import * as actions from 'actions/OrderAction';
import { getAddressList } from 'actions/AddressAction';
import Dialog from 'components/common/Dialog';
import AddressForm from 'components/common/AddressForm';
const Option = Select.Option;

function mapStateToProps({
    orderState,
    addressState,
    common
}) {
    return {
         ...orderState,
         userInfo: common.userInfo,
         addressList: addressState.list
    };
}

export class OrderPreview extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state={
            show_address_dialog: true,
            curAddress: undefined,
            orderInfo:{
                message:'11111',
                invoice:'21312313',
                pay_way:"D", //D：餐到付款 Z：在线付款
                send_time:"14:00"
            }
        }
    }

    componentWillMount(){
        let memberId = this.props.userInfo && this.props.userInfo.memberId;
        // let store_id=this.props.params&&this.props.params.store_id;
        // 请求收货地址列表
        this.props.dispatch(getAddressList({
            storeId: undefined,
            memberId
        }));
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    onAddress=(res)=>{
        console.log("添加地址成功",res);
        this.toggleAddressDialog();
    }
    toggleAddressDialog=()=>{
        this.setState({
            show_address_dialog:!this.state.show_address_dialog
        });
    }
    showEditDialog(address){
        this.setState({
            show_address_dialog: true,
            curAddress: address
        });
    }
    renderAddressDialog=()=>{
        let title = '';
        let address = this.state.curAddress || {};
        if(address.addressId){
            title = '修改地址'
        }else{
            title = '添加新地址'
        }
        return(
            <Dialog
                visible={this.state.show_address_dialog}
                onCancel={this.toggleAddressDialog}
                title= {title}
            >
                <AddressForm
                    key={address.addressId || 'add'}
                    data={address}
                    onSubmit={this.onAddress}
                    onCancel={this.toggleAddressDialog}/>
            </Dialog>
        )
    }
    renderAddressList(){
        let list = this.props.addressList;
        return list.map((address,i)=>{
            return (
                <div key={address.addressId} className="address-box">
                    <div className="member-top">
                        <span className="member-name">{address.trueName}</span>
                        <span className="member-sex">
                            {address.sex=='0'?'先生：':'女生：'}
                        </span>
                        <span className="member-phone">
                            {address.mobPhone}
                        </span>
                        <span className="operation-box">
                            <span onClick={this.showEditDialog.bind(this,address)}>
                                修改
                            </span>
                            <span>删除</span>
                        </span>
                    </div>
                    <div className="address-bottom">
                        <span className="address-area">
                            {address.areaInfo}
                        </span>
                        <span className="address-line">
                            {address.address}
                        </span>
                    </div>
                </div>
            );
        })
    }
    render(){
        let goodsList = this.props.goodsList ||[];
        let extraFeeList = this.props.extraFeeList ||[];
        let store = this.props.store||{};
        let address = this.props.address||{};
        let afterPayClass = "after-pay btn"+(this.state.orderInfo.pay_way=="D"?' btn-select':'');
        let inLinePayClass = "inline-pay btn"+(this.state.orderInfo.pay_way=="Z"?' btn-select':'');

        return(
            <div className="preview-body">
                <div className="breadcrumb">{store.storeName} >
                    <span> 确认购买</span>
                </div>
                {this.renderAddressDialog()}
                <div className="preview-content">
                    <div className="content-left">
                        <div className="goods-info">
                            <div className="info-item head">
                                <div className="left-info">菜品</div>
                                <div className="right-price">价格/份数</div>
                            </div>
                            {goodsList.map((item,i)=>{
                                return (
                                     <div className="info-item">
                                        <div className="left-info">{item.goodsName}</div>
                                        <div className="right-price">
                                            {`¥${item.goodsPrice}*${item.goodsNum}`}
                                        </div>
                                    </div>
                                )
                            })}

                            {extraFeeList.map((item,i)=>{
                                return (
                                     <div className="info-item">
                                        <div className="left-info">{item.chargName}</div>
                                        <div className="right-price">
                                            {`¥${item.amount}`}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="info-item total">
                                <div className="left-info">合计</div>
                                <div className="right-price">{`¥${this.props.totalPrice||0}`}</div>
                            </div>
                        </div>
                        <div className="info-footer">
                            <div className="operation">
                                <div className="operation-label">
                                    优惠券：
                                </div>
                                <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange}>
                                  <Option value="jack">Jack</Option>
                                  <Option value="lucy">Lucy</Option>
                                  <Option value="disabled" disabled>Disabled</Option>
                                  <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="footer-img">
                            <Img src='./order-bot-bg1.png'></Img>
                        </div>
                    </div>
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
                                <div className="select-address">
                                    {this.renderAddressList()}
                                </div>
                                <div className="message">
                                    <span className="message-label">
                                        给商家留言：
                                    </span>
                                    <div className="message-box">
                                        <input
                                            className="message-input"
                                            type="text"
                                            onChange={(e)=>this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            message:e.target.value
                                                        }
                                                    })
                                                }
                                            value={this.state.orderInfo.message}
                                            placeholder="不要辣，多放盐等口味要求" />
                                    </div>
                                </div>
                                <div className="message">
                                    <span className="message-label">
                                        发票信息：
                                    </span>
                                    <div className="message-box">
                                        <input
                                            className="message-input"
                                            value={this.state.orderInfo.invoice}
                                            onChange={(e)=>this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            invoice:e.target.value
                                                        }
                                                    })
                                                }
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="pay-way">
                                    <span className="pay-way-label">付款方式：</span>
                                    <div className="choose-way">
                                        <button
                                            className={afterPayClass}
                                            onClick={()=>{
                                                    this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            pay_way:"D"
                                                        }
                                                    });
                                                 }
                                            }
                                            type='button'
                                        >
                                            餐到付款
                                        </button>
                                        <button
                                            className={inLinePayClass}
                                            type='button'
                                            onClick={()=>{
                                                    this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            pay_way:"Z"
                                                        }
                                                    });
                                                 }
                                            }
                                        >
                                            在线支付
                                        </button>
                                    </div>
                                </div>
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
