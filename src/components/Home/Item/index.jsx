/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:10:11
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-18 21:03:34
 */

'use strict';
import './index.less';
import React from 'react';
import Img from 'common/Img';
import { Rate } from 'antd';


const TagMap = {
    'first': <i className="icon-first"></i>,
    'invoice': <i className="icon i-cheque"></i>
};

export default class HomeItem extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    renderTags(list){
        return list.map((item,i)=>{
            return React.cloneElement(TagMap[item.tagKey],{
                key: i
            });
        })
    }
    render() {
        const data = this.props.data || {};
        return (
            <div className="home-item">
                <div className="item-content">
                    <div className="preview">
                        <Img src={data.storeLogo}/>
                    </div>
                    <div className="info">
                        <h4 className='name'>{data.storeName}</h4>
                        <div className='rank'>
                            <span className="rater">
                                <Rate onChange={this.handleChange} value={data.storeScore} />
                                <span className="ant-rate-text">{data.storeScore} 分</span>
                            </span>
                            <span className="sales">月售{data.storeSales}单</span>
                        </div>
                        <div className="price">
                            <span className="start-price">起送:￥{data.startPrice}</span>
                            <span className="send-price">
                              配送费:￥{data.storeDeliverycredit}
                            </span>
                            <span className="send-time">
                                <i className="fa fa-fw fa-clock-o"></i>{data.storeDomainTimes}分钟
                            </span>
                        </div>
                    </div>
                </div>
                <div className="discount">
                    {this.renderTags(data.tagList)}
                    {/*
                    <i className="icon i-delivery"></i>
                    <i className="icon i-pay"></i>
                    <i className="icon-order"></i>
                    <i className="icon-discount"></i>
                    <i className="icon-giving"></i>
                    <i className="icon-first"></i>
                    <i className="icon-minus"></i>
                    */}
                </div>
            </div>
        );
    }
}
