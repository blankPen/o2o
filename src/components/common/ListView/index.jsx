/*
 * @Author: pengzhen
 * @Date:   2016-10-19 10:38:40
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-19 18:07:57
 */

'use strict';
import './index.less';
import React from 'react';

export default class ListView extends React.Component {
    static propTypes = {
        dataSource: React.PropTypes.array,
        keySet: React.PropTypes.string,
        renderChildren: React.PropTypes.func,
        handleLoad: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pageSize: 20,
            pageNo: 1
        }
    }

    componentWillMount() {
        this.refresh();
    }
    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(nextProps.params, this.props.params)){
            this.refresh(nextProps.params);
        }
    }
    getPostData(){
        return {
            ...this.props.params,
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo,
        }
    }
    loadNextPage = (params) => {
        if (!this.state.loading) {
            this.setState({
                loading: true
            })
            params = {
                ...this.getPostData(),
                ...params
            };
            this.props.handleLoad(params,this.onLoaded);
        }
    }
    onLoaded = (hasMore) => {
        this.setState({
            pageNo: this.state.pageNo + 1,
            loading: false,
            hasMore
        });
    }
    refresh(params) {
        this.loadNextPage({
            ...params,
            pageNo: 1 ,
        });
    }
    renderChildren(list = []) {
        if(this.props.renderChildren){
            return this.props.renderChildren(list,this);
        }else{
            let keySet = this.props.keySet;
            if(!keySet) console.error('ListView: keySet is required');
            return list.map((item, i) => {
                return React.cloneElement(this.props.children,{
                    key: item[keySet],
                    data: item
                })
            })
        }
    }
    renderFooter(){
        let { loading,hasMore } = this.state;
        if(this.props.renderFooter){
            return this.props.renderFooter(loading,hasMore,this);
        }else{
            if(loading){
                return <div className="list-view-more">正在加载...</div>
            }else if(hasMore){
                return <div className="list-view-more"
                    onClick={this.loadNextPage.bind(this,{})}>点击加载更多</div>
            }else{
                return <div className="list-view-more">没有更多内容</div>
            }
        }
    }
    render() {
        let { dataSource } = this.props;
        return (
            <div className='list-view'>
                <div className="list-view-content">{this.renderChildren(dataSource)}</div>
                {this.renderFooter()}
            </div>
        );
    }
}
