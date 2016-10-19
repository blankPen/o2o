'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
    getHomeList
} from 'actions/DetailAction';
import Img from 'common/Img'
import { Rate } from 'antd';
function mapStateToProps({
    detailState
}) {
    return {
        detailState: detailState
    };
}

export class Detail extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="detail-body">
               <div className="business-top">
                    <div className="content-box">
                        <div className="left-box">
                            <Img className="business-logo" src='./business.jpg' />
                            <div className="business-box">
                                <div className="business-name">
                                    四季甜品（东四店）
                                    <i className="fa fa-caret-down hide"></i>
                                </div>
                                <Rate value={4} /> 4.9
                                <div className="option">
                                    <span>30元起送</span>
                                    <span>4元配送费</span>
                                    <span>由商家配送</span>
                                </div>
                            </div>
                            <div className="buttom-info">
                                <div>商家地址：XXXXXXXXXXXX</div>
                                <div>商家电话：XXXXXXXXXXXX</div>
                                <div>营业时间：XXXXXXXXXXXX</div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Detail)
