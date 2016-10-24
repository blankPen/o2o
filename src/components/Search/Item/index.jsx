/*
 * @Author: pengzhen
 * @Date:   2016-10-24 18:11:42
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-24 18:14:52
 */

'use strict';
import React from 'react';

export default class Item extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-item">
                <div className="search-item-title"></div>
                <p class="price ct-lightgrey">
                    <span class="start-price">0元起送</span>
                    <span class="send-price">
                        19元配送费
                    </span>
                </p>
                <p class="rank clearfix">
                    <span class="star-ranking fl">
                    <span class="star-score" style="width: 0px"></span>
                    </span>
                    <span class="total fl cc-lightred-new">
                    月售14单
                    </span>
                </p>
                <div class="discount clearfix">
                    <i class="icon i-pay fl"></i>
                </div>
            </div>
        );
    }
}
