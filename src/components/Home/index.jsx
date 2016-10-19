'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import Item from './Item/'
import Filter from 'components/common/Filter/'
import ListView from 'components/common/ListView'
import {
    getHomeList
} from 'actions/HomeAction';
import {
    Checkbox,
    Select
} from 'antd';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

function mapStateToProps({
    homeState
}) {
    return {
        dataSource: homeState.list
    };
}

const filter_type = [{
    label: '全部',
    value: 'ALL'
}, {
    label: '美食',
    value: '2'
}, {
    label: '甜点饮品',
    value: '3'
}];

const filter_special = [{
    label: '首单立减',
    value: '1'
}, {
    label: '限时优惠',
    value: '2'
}, {
    label: '美团专送',
    value: '3'
}];

const filter_order = [{
    label: '默认排序',
    value: '1'
}, {
    label: '销量',
    value: '2'
}, {
    label: '评价',
    value: '3'
}];

const filter_price = [{
    label: '全部商家',
    value: 'ALL'
}, {
    label: '10元以下',
    value: '10'
}, {
    label: '20元以下',
    value: '20'
}];

export class Home extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            type: 'ALL',
            special: [],
            order: '1',
            range: 'ALL'
        }
    }
    handleListLoad = (params, callback) => {
        this.props.dispatch(getHomeList(params, (res) => {
            callback(res.totalRows > res.pageSize * res.pageNo);
        }));
    }
    handleSelect=(key,value)=>{
        this.setState({
            [key]: value
        });
    }
    renderTypeFilter(data=[]){
        let curValue = this.state.type;
        return (
            <div className="filter-wrap">
                <div className="filter-title">
                    <i className="fa fa-fw fa-shopping-bag"></i><span>商家分类</span>
                </div>
                <div className="filter-content">
                    <div className="filter-type">
                        {data.map((item, i) => {
                            let classname = curValue === item.value?"active":""
                            return (
                                <span key={item.value}
                                    className={classname}
                                    onClick={this.handleSelect.bind(this,'type',item.value)}>
                                    {item.label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    renderSpecialFilter(data=[]){
        let curValue = this.state.special;
        return (
            <div className="filter-wrap">
                <div className="filter-title">
                    <i className="fa fa-fw fa-filter"></i><span>优惠筛选</span>
                </div>
                <div className="filter-content">
                    <div className="filter-special">
                        <CheckboxGroup
                            options={data}
                            value={curValue}
                            onChange={this.handleSelect.bind(this,'special')}
                        />
                    </div>
                </div>
            </div>
        );
    }
    renderOrderFilter(data){
        let curValue = this.state.order;
        return (
            <div className="filter-order">
                {data.map((item, i) => {
                    let classname = curValue === item.value?"active":""
                    return (
                        <span key={item.value}
                            className={classname}
                            onClick={this.handleSelect.bind(this,'order',item.value)}>
                            {item.label}
                        </span>
                    );
                })}
            </div>
        );
    }
    renderPriceSelect(data){
        let curValue = this.state.range;
        return (
            <div className='filter-price'>
                <span>起送价筛选</span>
                <Select value={curValue} onChange={this.handleSelect.bind(this,'range')}>
                    {data.map(item =>
                        <Option key={item.value} value={item.value}>{item.label}</Option>)}
                </Select>
            </div>
        )
    }
    renderListItem(list){
        return list.map((item, i) => {
            return <Item key={item.storeId} data={item} end={(i+1)%4 == 0} />
        })
    }
    render() {
        return (
            <div className="page-home">
                <div className="panel-filter">
                    {this.renderTypeFilter(filter_type)}
                    {this.renderSpecialFilter(filter_special)}
                </div>
                <div className="panel-list">
                    <div className="tool-bar">
                        {this.renderOrderFilter(filter_order)}
                        {this.renderPriceSelect(filter_price)}
                    </div>
                    <div className="list-content">
                        <ListView
                            keySet='storeId'
                            dataSource={this.props.dataSource}
                            handleLoad={this.handleListLoad}
                            renderChildren={this.renderListItem}
                        >
                            <Item />
                        </ListView>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home)
