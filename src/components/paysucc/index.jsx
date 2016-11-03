'use strict';
import './index.less';
import React from 'react';
import {
  Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    theAjax,
    getMenuList
} from 'actions/UserAction';
import Img from 'common/Img';
import Loading from 'components/common/Loading/'

import {TimeConvert} from 'components/common/TimeConvert.jsx';


function mapStateToProps(state) {
    return{};
}
export class PaySucc extends React.Component {
     constructor(props) {
        super(props);
        this.state={
            mobPhone:"",
            orderReceiving:"",
            arrive:null
        }
    }
    componentDidMount(){
        if(this.props.params.type==1){
            this.props.dispatch(getMenuList(this.props.params.orderId||"",(res)=>{
                let yujimin=res.data.paymentTime+15*60*1000;
                let songda=res.data.paymentTime+60*60*1000;
                let min=TimeConvert.dateDiff("n",new Date().getTime(),yujimin);
                this.setState({
                    mobPhone:res.data.address.mobPhone,
                    orderReceiving:min,
                    arrive:TimeConvert.minsCon(songda,"hm")
                });
            }));
        }
    }
    render(){
        return(
            <div className="paysucc clearfix">
                <Loading  isLoading={!this.state.arrive}>
                    <div className="succ-left">
                        {this.props.params.type==2?(
                            <div className="content">
                                <div className="title">
                                    <span className="icon">
                                        <i className="fa fa-check" />
                                    </span>
                                    <span className="text">充值成功!</span>
                                    <div className="goorder">
                                        <Link to={"/user/info"}>
                                            返回我的账号
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="content">
                                <div className="title">
                                    <span className="icon">
                                        <i className="fa fa-check" />
                                    </span>
                                    <span className="text">支付成功!</span>
                                </div>
                                <div className="desc">
                                    请保持您的手机{this.state.mobPhone||"00****00"}畅通，方便送餐人员联系您。
                                </div>
                                <div className="jiedan">
                                    <div className="theys">
                                        <i className="fa fa-clock-o" />
                                        预计接单时间
                                        <span className="import">{this.state.orderReceiving||0}</span>
                                        分钟
                                    </div>
                                    <div className="theys">
                                        <i className="fa fa-clock-o" />
                                        预计
                                        <span className="import">{this.state.arrive||0}</span>
                                        左右到达
                                    </div>

                                </div>
                                <div className="goorder">
                                    <Link to={"/user/order"}>
                                        查看我的订单
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="succ-right">
                        <div className="title">下载雷鸣o2o</div>
                        <div className="tip theys">请用手机扫描下方二维码</div>
                        <div className="qrcode">
                            <span className="imgK">
                                <Img src="ios.png" isShow={true} />
                                <span className="imgtip">ios</span>
                            </span>
                            <span className="imgK">
                                <Img src="https://static.pgyer.com/app/qrcode/pjq4" isShow={true} />
                                <span className="imgtip">android</span>
                            </span>
                        </div>
                        {/*<div className="theys">或者用电脑直接下载</div>
                        <div className="btnlist">
                            <a href="http://fir.im/aeby" target="view_window">
                                <div className="btn ipone">
                                    <i className="fa fa-mobile-phone" />
                                    iPhone下载
                                </div>
                            </a>
                            <a href="https://www.pgyer.com/pjq4" target="view_window">
                                <div className="btn android">
                                    <i className="fa fa-android" />
                                    Android下载
                                </div>
                            </a>
                        </div>*/}
                        <div className="theys">也可以从各大手机市场下载雷铭O2OAPP</div>
                        <div className="wxgzh">
                            <div className="wxgzh-K clearfix">
                                <Img src="wxgzh.jpg" isShow={true} />
                                <span className="tip">关注雷铭科技微信公众号，微信也可以叫外卖</span>
                            </div>
                        </div>
                    </div>
                </Loading>
            </div>
            );
    }
}

export default connect(
    mapStateToProps,
)(PaySucc)
