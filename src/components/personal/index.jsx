'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
function mapStateToProps(state) {
    return {

    };
}
const menu=[
			{"title":"订单查询","chrilden":[{"title":"近三个月订单","id":"1"}]},
			{"title":"账号管理","chrilden":[{"title":"我的历史","id":"2"},{"title":"我的收藏","id":"3"}]}
			];
export class Personal extends React.Component {
	constructor(props) {
        super(props);
        this.state={
        	select:"1",
            zk:false
        }
    }
    liClick=(id)=>{
    	this.setState({
    		"select":id
    	});
    }
    zk=()=>{
        console.log(1);
        this.setState({
            zk:!this.state.zk
        });
    }
    returnOrder=()=>{
    	return(
            <div className="orderDescs">
        		<div className="theOrder" onClick={this.zk}>
        			<div className="headimg">
        				<img src="http://p1.meituan.net/120.0/xianfu/0d3fd154e5ec8486d9176ebca64cbc51585134.jpg"/>
        			</div>
        			<div className="orderdesc">
        				<div className="title">
        					<span className="text">Fate/Zero</span>
        					<span className="right"><i className="fa fa-arrow-right" /></span>
        				</div>
        				<div className="ordercode thedesc">订单号：11098722264231320</div>
        			</div>
        			<div className="orderdesc">
        				<div className="phone thedesc">商家电话：13852871817</div>
        				<div className="time thedesc">下单时间：2016-08-02 18:10</div>
        			</div>
        			<div className="tousu"> <i className="fa  fa-edit" /> 投诉傻瓜</div>
        		</div>
                <div className={this.state.zk?"yincang-active yincang clearfix ":"yincang clearfix "}>
                    <div className="lfetlist">
                        <div className="head">菜品共43份，总价¥152.1</div>
                        <ul>
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                            <li>
                                <span className="name">小青菜</span>
                                <span className="pirce">¥1.8*2</span>
                            </li>
                        </ul>
                    </div>
                    <div className="rightTimeline">
                        <Timeline>
                            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
                            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                          </Timeline>
                    </div>
                </div>
            </div>
    		);
    }
    returnHistory=()=>{
        return (
            <div className="account">
                <div className="desc">
                   <span className="userimg">
                         <i className="fa fa-user"></i>
                   </span>
                   <div className="name theys">用户名：BMt296183248</div>
                   <div className="phone theys">手机号：1507****1036</div>
                   <div className="pswd theys">密　码：尚未设置密码</div>
                   <div className="btn">修改账户信息</div>
                </div>
            </div>
            );
    }
    render() {
    	return (
    		<div className="mypersonal">
    			<div className="leftMenu">
    				{menu.map((item,i)=>{
						let list ;
						if(item.chrilden){
							list = item.chrilden.map((item2,i2)=>{
								return(<li
										className={this.state.select==item2.id?"active":""}
										key={i2}
										onClick={this.liClick.bind(null,item2.id)}>
											{item2.title}
										</li>);
							});

						}
						return(
								<div key={i} className="menulist">
									<span className="menutitle">{item.title}</span>
									<ul>
										{list}
									</ul>
								</div>
								);
					})}
    			</div>
    			<div className="rightText">
    				{/*this.state.select=="1"?this.returnOrder():
    					(this.state.select=="2"?this.returnHistory():
    						(this.state.select=="3"?this.returnCollect():null))*/}
                            {this.returnOrder()}
                            {this.returnOrder()}
    			</div>
    		</div>
    		);
    }
}
export default connect(
    mapStateToProps
)(Personal)