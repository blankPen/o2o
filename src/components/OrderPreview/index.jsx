'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Select } from 'antd';
import Img from 'common/Img';
import * as actions from 'actions/OrderAction';
import Dialog from 'components/common/Dialog';
const Option = Select.Option;


function mapStateToProps({
    orderState
}) {
    return {
         ...orderState
    };
}

export class OrderPreview extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state={
            show_address_dialog:false,
            orderInfo:{
                message:'11111',
                invoice:'21312313'
            }
        }
    }

    componentWillMount(){
        let store_id=this.props.params&&this.props.params.store_id;
        this.props.dispatch(actions.getOrderInfo({store_id},(res)=>{

        }));
    }

    handleChange = (value)=> {
      console.log(`selected ${value}`);
    }

    renderAddressDialog=()=>{
        return(
            <Dialog 
                visible={this.state.show_address_dialog}
                onCancel={this.toggleAddressDialog}
            >
                this is address dialog     
            </Dialog>
        )
    }

    toggleAddressDialog=(address)=>{
        this.setState({
            show_address_dialog:!this.state.show_address_dialog
        });
    }
    
    render(){
        let goodsList = this.props.goodsList ||[];
        let extraFeeList = this.props.extraFeeList ||[];
        let store = this.props.store||{};
        let address = this.props.address||{};
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
                                    <div className="address-box">
                                        <div className="member-top">
                                            <span className="member-name">{address.trueName}</span>
                                            <span className="member-sex">
                                                {address.sex=='0'?'先生：':'女生：'}
                                            </span>
                                            <span className="member-phone">
                                                {address.mobPhone}
                                            </span>
                                            <span className="operation-box">
                                                <span 
                                                    onClick={()=>this.toggleAddressDialog(address)}
                                                >
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
                                </div>
                                <div className="message">
                                    <span className="message-label">
                                        给商家留言：
                                    </span>
                                    <div className="message-box">
                                        <input 
                                            className="message-input" 
                                            type="text" 
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
                                            type="text" 
                                        />
                                    </div>
                                </div>
                                <div className="pay-way">
                                    <span className="pay-way-label">付款方式：</span>
                                    <div className="choose-way">
                                        <button className="after-pay btn btn-select" type='button'>
                                            餐到付款
                                        </button>
                                        <button className="inline-pay btn" type='button'>
                                            在线支付
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div className="preorder-time">
                            <span>期望送出时间：</span>
                            <Select defaultValue="jack" style={{ width: 92 }} onChange={this.handleChange}>
                                  <Option value="jack">立即送出</Option>
                                  <Option value="lucy">Lucy</Option>
                                  <Option value="disabled" disabled>Disabled</Option>
                                  <Option value="Yiminghe">yiminghe</Option>
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
