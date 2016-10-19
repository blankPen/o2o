/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:10:11
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-19 10:26:26
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
        let smallTags = [];
        let bigTags = [];
        list.forEach((item,i)=>{
            let icon = React.cloneElement(TagMap[item.tagKey],{
                key: item.tagKey
            });
            smallTags.push(icon);
            bigTags.push(
                <div key={item.tagKey} className='discount-item'>
                    {icon}
                    <span className="alias">{item.alias}</span>
                    {/*<span className="alias primary">(xxxxx)</span>*/}
                </div>
            );
        });
        return {
            small: smallTags,
            big: bigTags
        };
    }
    render() {
        const data = this.props.data || {};
        const tagObj = this.renderTags(data.tagList);
        return (
            <div className="home-item">
                <div className="mask">
                    <a className="btn-collect"><i className="fa fa-heart-o"></i></a>
                </div>
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
                    <div className={"popover "+(this.props.end?'popover-left':'')}>
                        <div className="popover-info">
                            <h4 className="title">商家信息</h4>
                            <div className='body'>
                                {tagObj.big}
                            </div>
                        </div>
                        <div className="popover-info">
                            <h4 className="title">商家公告</h4>
                            <div className='body'>
                                {data.storeDescription || '无'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="discount">
                    {tagObj.small}
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
