'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Select } from 'antd';
import Img from 'common/Img';

const Option = Select.Option;


function mapStateToProps({
    detailState
}) {
    return {
         ...detailState
    };
}

export class OrderPreview extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    handleChange = (value)=> {
      console.log(`selected ${value}`);
    }
    
    render(){
        return(
            <div className="preview-body">
                <div className="breadcrumb">马兰拉面（朝外店）> 
                    <span> 确认购买</span>
                </div>
                <div className="preview-content">
                    <div className="content-left">
                        <div className="goods-info">
                            <div className="info-item head">
                                <div className="left-info">菜品</div>
                                <div className="right-price">价格/份数</div>
                            </div>
                            <div className="info-item">
                                <div className="left-info">营养分享餐</div>
                                <div className="right-price">¥21</div>
                            </div>
                            <div className="info-item">
                                <div className="left-info">餐盒费</div>
                                <div className="right-price">¥2</div>
                            </div>
                            <div className="info-item">
                                <div className="left-info">配送费</div>
                                <div className="right-price">¥5</div>
                            </div>
                            <div className="info-item total">
                                <div className="left-info">合计</div>
                                <div className="right-price">¥28</div>
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
                                    <div className="add-address">
                                        <i className="fa fa-plus"></i>
                                        添加新地址
                                    </div>
                                </div>
                                <div className="select-address">
                                    <div className="address-box">
                                        <div className="member-top">
                                            <span className="member-name">陈经纬</span>
                                            <span className="member-sex">先生：</span>
                                            <span className="member-phone">
                                                15074861036
                                            </span>
                                            <span className="operation-box">
                                                <span>修改</span>
                                                <span>删除</span>
                                            </span>
                                        </div>
                                        <div className="address-bottom">
                                            <span className="address-area">
                                                美罗家园
                                            </span>
                                            <span className="address-line">
                                                美安路美安苑19号楼1001室
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
                        <div className="order-info">

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
