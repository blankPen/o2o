'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
function mapStateToProps(state){
    return {
    };
}
export class Feedback extends React.Component {
	constructor(props) {
        super(props);
    }
    render(){
    	return(
    		<div className="feedback">
    			<div className="title-babel">
    				反馈通道
    			</div>
    			<div className="phoneAndName">
    				<span className="theys"><span>客服电话：</span>010-65546961</span>
					<span className="theys"><span>客服微信：</span>雷铭科技</span>
    			</div>
    			<div className="title-babel">反馈建议</div>
    			<div className="feedback-text">
    				<textarea placeholder="我们非常珍视您的反馈，请留下您的宝贵意见。"></textarea>
    			</div>
    			<div className="feedback-btn">发送</div>
    		</div>
    		);
    }
}

export default connect(
    mapStateToProps
)(Feedback)