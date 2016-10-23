'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
import {
  Link
} from 'react-router';
import ListView from 'components/common/ListView';
function mapStateToProps(state) {
    return {

    };
}
const menu=[
			{"title":"订单查询","chrilden":[{"title":"近三个月订单","path":"/order","id":"1"}]},
			{"title":"账号管理","chrilden":[{"title":"我的账户","path":"/personal_center","id":"2"},{"title":"密码找回","path":"/","id":"3"},
            {"title":"我的收藏","path":"/collect","id":"4"}]},
			];

//个人中心主组件
export class PersonNav extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };
	constructor(props) {
        super(props);
    }
    render() {
        let href=this.props.location.pathname;
    	return (
    		<div className="mypersonal">
    			<div className="leftMenu">
    				{menu.map((item,i)=>{
						let list ;
						if(item.chrilden){
							list = item.chrilden.map((item2,i2)=>{
								return(<li
										className={href==item2.path?"active":""}
										key={i2} >
                                            <Link to={item2.path}>
											{item2.title}
                                            </Link>
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
    				{this.props.children}
    			</div>
    		</div>
    		);
    }
}
export default connect(
    mapStateToProps
)(PersonNav)