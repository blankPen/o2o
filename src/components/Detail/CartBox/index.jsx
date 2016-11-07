/*
 * @Author: pengzhen
 * @Date:   2016-10-22 12:37:44
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-03 19:09:40
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import * as DomUtils from 'common/utils/dom';
import History from 'common/History';
import { needLogin } from 'common/Permission';
import NumInput from 'components/common/NumInput';
import Parabola from './parabola.js';

let mousePosition = null;
export default class CartBox extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        startPrice: React.PropTypes.number
    };
    static defaultProps = {
        onChange: function(){},
        startPrice: 0
    };
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }
    triggerAnim(position){
        if(position){
            let { x,y } = position;
            let icon = this.refs.icon;
            let target = `<div class="cart-anim-point" style="top: ${y}px;left: ${x}px;"></div>`;
            target = DomUtils.createElement(target);
            document.body.appendChild(target);
            Parabola(target,icon,{
                complete: ()=>{
                    document.body.removeChild(target);
                    target = null;
                }
            }).init();
        }
    }
    toggleOpen=()=>{
        this.setState({
            open: !this.state.open
        });
    }
    clearCart=()=>{
        this.props.onChange({});
    }
    changeItem(id,num){
        const data = {...this.props.data};
        let isAdd = false;
        if(num){
            if(num > data[id].num){
                this.triggerAnim();
                isAdd = true;
            }
            data[id].num = num;
        }else{
            delete data[id];
        }
        this.props.onChange(data,isAdd && id);
    }
    parseData(){
        const data = this.props.data || {};
        let totalNum = 0 ,totalPrice = 0, orderList=[];
        Object.keys(data).forEach((id)=>{
            let { num,data:goods } = data[id];
            totalNum+=num;
            totalPrice+=(num*goods.goodsStorePrice);
            orderList.push(
                <div key={id} className='order-item'>
                    <span>
                        <div>{goods.goodsName}</div>
                    </span>
                    <span>
                        <NumInput max={99} value={num} onChange={this.changeItem.bind(this,id)} />
                    </span>
                    <span>￥{goods.goodsStorePrice}</span>
                </div>
            );
        });
        return {
            totalNum,
            totalPrice,
            orderList,
        }
    }
    toOrderPreview=()=>{
        this.props.onSubmit && this.props.onSubmit();
    }
    renderRest(){
        return (
            <div className="cart-box">
                <div className="btn-box">
                    <div ref='icon' className="icon">
                        <i className="fa fa-shopping-cart"></i>
                    </div>
                    <button disabled className="submit">休息中</button>
                </div>
            </div>
        )
    }
    render() {
        let { open } = this.state;
        const { startPrice,isOpen } = this.props;
        const {
            totalNum,
            totalPrice,
            orderList,
        } = this.parseData();
        open = totalNum && open;

        if(!isOpen){ return this.renderRest(); }
        return (
            <div className="cart-box">
                <div className={"order-box"+(open?' open':'')}>
                    <div className="notice">
                        <span className="fl">电脑下单不享优惠了哦，优惠活动手机专享~</span>
                    </div>
                    <div className="order-table">
                        <div className="title">
                            <span className="dishes">
                                菜品<a onClick={this.clearCart} className="clear-cart">[清空]</a>
                            </span>
                            <span className="count">份数</span>
                            <span className="price">价格</span>
                        </div>
                        {orderList}
                    </div>
                    <div className="total">
                        共<span className="totalnumber">{totalNum}</span>份，
                        总计<span className="bill">¥{totalPrice}</span>
                    </div>
                </div>
                <div className="btn-box">
                    <div ref='icon' className="icon" onClick={!!totalNum && this.toggleOpen}>
                        <i className="fa fa-shopping-cart"></i>
                    </div>
                    {!open && !!totalNum &&
                        <div className="count">{totalNum}份&nbsp;&nbsp;¥{totalPrice}</div>}
                    {totalPrice >= startPrice?
                        needLogin(<button className="submit" onClick={this.toOrderPreview}>去下单</button>):
                        <button disabled className="submit">
                            还差{(startPrice-totalPrice).toFixed(2)}元起送
                        </button>
                    }
                </div>
            </div>
        );
    }
}
