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
                    <div className="content-right"></div>
                </div>
            </div>
        )
    }
}


export default connect(
    mapStateToProps,
)(OrderPreview)
