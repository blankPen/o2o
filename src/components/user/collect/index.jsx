'use strict';
import React from 'react';
import './index.less';

import {
    connect
} from 'react-redux';
import Img from 'common/Img';

import {
    getCollectList,
    removeCollect
} from 'actions/UserAction';
import { Timeline, Icon,Rate ,message } from 'antd';
import History from 'common/History';
function mapStateToProps({
    common,
    userState
}){
    return {
        userInfo: common.userInfo,
        collectState:userState||{}
    };
}
export class CollectList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.refresh();
    }
    componentWillReceiveProps=(nextProps)=>{
        if(nextProps.userInfo!=this.props.userInfo){
            this.props.dispatch(getCollectList(nextProps.userInfo.memberId));
        }
    }
    refresh=()=>{
        let user=this.props.userInfo||{};
        this.props.dispatch(getCollectList(user.memberId));
    }
    render(){
        let list = this.props.collectState.collectList || [];
        return(
             <div className="collectlist ">
                <ul className="clearfix collectul">
                    {list.map((item,i)=>{
                        return (<Collect 
                                        key={i} 
                                        data={item} 
                                        dispatch={this.props.dispatch}
                                        userInfo={this.props.userInfo} 
                                        refresh={this.refresh} />);
                    })}
                </ul>
                
            </div>
            );
        
    }
}
export class Collect extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleChange=(value)=>{

    }
    renderTags(list){
        let smallTags = [];
        let bigTags = [];
        list.forEach((item,i)=>{
            let icon = <Img key={item.tagKey} className='icon' src={item.tagIcon} />;
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
    removeCollect=(e)=>{
        let data=this.props.data||{};
        this.props.dispatch(removeCollect(data.storeId,this.props.userInfo.memberId,(res)=>{
            if(res.result){
                message.success(res.msg);
                this.props.refresh();
            }else{
                message.error(res.msg);
            }
        }));
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    }
    goShop=()=>{
        let data=this.props.data||{};
        History.push('/detail/'+data.storeId);
    }
    render(){
        let data=this.props.data||{};
        let tagObj = this.renderTags(data.tagList||[]);
        
        return(
            <li className="collectli collect" onClick={this.goShop}>
                            <div className="collect-top">
                                <div className="image">
                                    <Img src={data.storeLogo} />
                                </div>
                                <div className="title">{data.storeName}</div>
                                <div className="starAndNum">
                                    <div className="star">
                                        <Rate allowHalf disabled count={5} onChange={this.handleChange} value={data.storeScore||0} />{data.storeScore||0}分
                                    </div>
                                    <div className="num">月售 {data.storeMonSales} 单</div>
                                </div>
                                <div className="sendDesc">
                                    <span className="theys qisong">起送:￥{data.startPrice}</span>
                                    <span className="theys peisong">{data.expressFee?data.expressFee+"元":"免"}配送费</span>
                                    <span className="thetime">
                                        <Icon type="clock-circle-o"/>
                                        30分钟
                                    </span>
                                </div>
                            </div>
                            <div className="collect-bottom">
                                <div className="iconlist">
                                    {tagObj.small}
                                </div>
                                <div className="removecollect" onClick={this.removeCollect}>
                                    <Icon type="heart" style={{"color":"red"}} />
                                    取消收藏
                                </div>
                                <div className="collectnum">
                                    收藏 <span>({data.storeCollect})</span>
                                </div>
                            </div>

                    </li>
            );
    }
}

export default connect(
    mapStateToProps
)(CollectList)