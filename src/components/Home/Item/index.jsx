/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:10:11
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-17 22:30:53
 */

'use strict';
import './index.less';
import React from 'react';

export default class HomeItem extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-item">
                <div className="item-content">
                    <div className="preview">
                        <img src="http://p1.meituan.net/xianfu/714f1313d04c4286e18bc079ea540f6c30697.jpg"/>
                    </div>
                    <div className="info">
                        <h4 className='name'>周黑鸭中关村店</h4>
                        <div className='rank'>
                            <span className="rater">*****</span>
                            <span className="sales">月售1234单</span>
                        </div>
                        <div className="price">
                            <span className="start-price">起送:￥20</span>
                            <span className="send-price">
                              配送费:￥5
                            </span>
                            <span className="send-time">
                                <i className="fa fa-fw fa-clock-o"></i>38分钟
                            </span>
                        </div>
                    </div>
                </div>
                <div className="discount"></div>
            </div>
        );
    }
}
