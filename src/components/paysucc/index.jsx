'use strict';
import './index.less';
import React from 'react';
import {
  Link
} from 'react-router';
import Img from 'common/Img';

export default class PaySucc extends React.Component {
     constructor(props) {
        super(props);
        
    }
    render(){
        let data=this.props.data||{};
        /**从父容器接受参数 data
        *@parms:
        *phone:手机号码;
        *orderReceiving:预计接单时间;
        *arrive:预计到达时间
        */
        
        return(
            <div className="paysucc clearfix">
                <div className="succ-left">
                    <div className="content">
                        <div className="title">
                            <span className="icon">
                                <i className="fa fa-check" />
                            </span>
                            <span className="text">支付成功!</span>
                        </div>
                        <div className="desc">
                            请保持您的手机{data.phone||"00****00"}畅通，方便送餐人员联系您。
                        </div>
                        <div className="jiedan">
                            <div className="theys">
                                <i className="fa fa-clock-o" />
                                预计接单时间 
                                <span className="import">{data.orderReceiving||0}</span>
                                分钟
                            </div>
                            <div className="theys">
                                <i className="fa fa-clock-o" />
                                预计
                                <span className="import">{data.arrive||0}</span>
                                左右到达
                            </div>

                        </div>
                        <div className="goorder">
                            <Link to={"/order"}>
                                查看我的订单
                            </Link>
                        </div>
                    </div>
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
                    <div className="theys">也可以从各大手机市场下载雷铭o2o</div>
                    <div className="wxgzh">
                        <div className="wxgzh-K clearfix">
                            <Img src="wxgzh.jpg" isShow={true} />
                            <span className="tip">关注雷铭科技微信公众号，微信也可以叫外卖</span>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
