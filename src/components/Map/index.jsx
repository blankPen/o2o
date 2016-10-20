/*
 * @Author: pengzhen
 * @Date:   2016-10-19 21:02:26
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-20 20:03:33
 */

'use strict';
import './inedx.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import Img from 'common/Img';
import BaiduMap from 'common/BaiduMap';
import * as DomUtils from 'common/utils/dom';
import CitySelector from 'components/Map/CitySelector/'

function mapStateToProps(state) {
    return {

    };
}

export class Maper extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };
    maper = undefined;
    constructor(props) {
        super(props);
        this.state = {
            cityControl: false, // 城市选择是否展开
            historyControl: false, // 历史浏览是否展开
            searchKey: '',  // 搜索关键字
            searchResult: [], // 搜索结果
            selectCity: '北京市', // 选中的城市
            guessCity: '北京市',
            point: {
                lng: 0,
                lat: 0
            }
        }
    }
    componentDidMount() {

        let { cityControl:cityDom,historyControl:historyDom } = this.refs;
        this.event = DomUtils.addEventListener(window,'click',(e)=>{
            let { cityControl,historyControl } = this.state;
            let target = e.target;
            // if(cityControl && !DomUtils.contains(cityDom,target)){
            //     this.toggleSelector('cityControl');
            // }
            if(historyControl && !DomUtils.contains(historyDom,target)){
                this.toggleSelector('historyControl');
            }
        });

        BaiduMap.init('map',(maper)=>{
            console.log('地图初始化成功');
            this.maper = maper;
            // 获取用户当前所在城市
            maper.getCurrentPosition((point,address)=>{
                this.setState({
                    selectCity: address.addressComponents.city,
                    guessCity: address.addressComponents.city
                });
            });
             //建立一个自动完成的对象
            maper.createAutocomplete({
                id: "search-input",
                onhighlight: this.handleSearchKeyChange,
                onconfirm: this.handleSearchKeyChange
            })
        })
    }
    componentWillUnmount() {
        this.event && this.event.remove();
    }
    handleSearchKeyChange=(e)=>{
        this.setState({
            searchKey: e.target ? e.target.value : e
        });
    }
    handleCitySelect=(value)=>{
        this.setState({
            selectCity: value,
            cityControl: false
        });
        this.maper.map.centerAndZoom(value,12);
    }
    toggleSelector(type){
        this.setState({
            [type]: !this.state[type]
        });
    }
    searchMap=()=>{
        this.maper.setPlace(this.state.searchKey,(point,results)=>{
            // console.log(results.getPoi)
            for (var i = 0; i < results.getCurrentNumPois(); i ++){
                console.log(results.getPoi(i).title + ", " + results.getPoi(i).address);
            }
        });
    }
    renderSearchControl(){
        const dataSource = this.state.searchResult;

        return (
            <div className="search-wrap">
                <button type='button' onClick={this.searchMap}>搜索</button>
                <div className="input-wrap">
                    <input
                        id="search-input"
                        type="text"
                        size="20"
                        onChange={this.handleSearchKeyChange}
                        value={this.state.searchKey} />
                </div>
            </div>
        )
    }
    renderCityControl(){
        return (
            <div className="selector city-selector"
                ref='cityControl'>
                <div onClick={this.toggleSelector.bind(this,'cityControl')}>
                    <span className="text" title={this.state.selectCity}>
                        {this.state.selectCity}
                    </span>
                    <i className="fa fa-caret-down"></i>
                </div>
                {this.state.cityControl &&
                    <div className="selector-content">
                        <CitySelector
                            onChange={this.handleCitySelect}
                            guessCity={this.state.guessCity}
                        />
                    </div>}
            </div>
        )
    }
    renderHistoryControl(){
        return (
            <div className="selector history-selector"
                ref='historyControl'
                onClick={this.toggleSelector.bind(this,'historyControl')}>
                <span className="text">历史地址</span>
                <i className="fa fa-caret-down"></i>
                {this.state.historyControl &&
                    <div className="selector-content">
                        <div className="history-item">美惠大厦</div>
                    </div>}
            </div>
        )
    }
    render() {
        return (
            <div className='page-map'>
                <div className="map-header">
                    <div className="container">
                        <Img className='logo' src='http://waimai.meituan.com/static/img/logos/small_4.png' />
                        <span className="sign-box">
                            <Link to="/register" className='btn-regist'>注册</Link>
                            <i className="separator"></i>
                            <Link to="/login" className='btn-login'>登录</Link>
                        </span>
                    </div>
                </div>
                <div className="map-content">
                    <div className="address-controller">
                        {this.renderCityControl()}
                        {this.renderHistoryControl()}
                        {this.renderSearchControl()}
                    </div>
                    <div className="map-controller">
                        <div className="map-result">
                            <div className="map-result-head">
                                共<span className="num">40</span>地址
                            </div>
                            <div className="map-result-list">
                            </div>
                        </div>
                        <div id="map"></div>
                    </div>
                </div>
                <div className="map-footer">
                    <div className="map-footer-entry">
                    <a className="map-footer-link" href="#" target="_blank">手机版下载</a>
                    <i className="map-footer-separator"></i>
                    <a className="map-footer-link" href="#" target="_blank">零售招商合作申请</a>
                    </div>
                    <div className="map-footer-copyright">
                        ©2015 meituan.com
                        <a target="_blank" href="#">京ICP证070791号</a> 京公网安备11010502025545号
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Maper)
