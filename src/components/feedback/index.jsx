'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
    theAjax
} from 'actions/UserAction';
import { message } from 'antd';
import History from 'common/History';
import {toggleLoginDialog}  from 'actions/SignPageAction';

function mapStateToProps({
	    common
	}){
	    return {
	        userInfo: common.userInfo
	    };
}
export class Feedback extends React.Component {
	constructor(props) {
        super(props);
        this.disable=false;
    }
    onSend=()=>{
    	let value=this.refs.textarea.value||"";
    	let state=this.props.location.state||{};
        console.log("状态：",this.props.userInfo);
        if(!this.props.userInfo){
            this.props.dispatch(toggleLoginDialog(true));
            return;
        }
        if(this.disable){
            message.error("不能提交多次哦!");
            return;
        }
    	if(!value.trim()){
    		message.error("不能提交空白内容!");
    		return;
    	}
    	if(value.trim().length>70){
    		message.error("内容不得超过70字!");
    		return;
    	}
    	if(!this.props.userInfo.memberMobile){
    		message.error("还未绑定手机,无法提交反馈信息!");
    		return;
    	}
        this.disable=true;
    	this.props.dispatch(theAjax("/rest/api/feedback/feeback",{
    		phoneType:"3",
    		content:value,
    		memberId:this.props.userInfo.memberId,
    		phone:this.props.userInfo.memberMobile,
    		orderSn:state.orderSn
    	},(res)=>{
    		if(res.result==1){
                message.success(res.msg+",一秒后返回主页!");
                setTimeout(()=>{
                    History.push("/");
                },1000);
    		}else{
                this.disable=false;
    			message.error(res.msg);
    		}
    		if(res.result==2){
    			History.push("/login");
    		}
    	},()=>{
    		message.error("服务器异常,请稍后再试!");
    	}));
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
    				<textarea ref="textarea" placeholder="我们非常珍视您的反馈，请留下您的宝贵意见。"></textarea>
    			</div>
    			<div className="feedback-btn" onClick={this.onSend}>发送</div>
    		</div>
    		);
    }
}

export default connect(
    mapStateToProps
)(Feedback)
