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
import { Rate,Tooltip } from 'antd';
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
                    <div className="right-box">
                        <div className="rate-box">
                            <div className="rate"><span>4.5</span>分</div>
                            <div className="rate-text">商家评分</div>
                        </div>
                        <div className="commas"></div>
                        <Tooltip title="prompt text" placement="bottom">
                            <div className="rate-box">
                                <div className="rate"><span>36</span>分钟</div>
                                <i className="fa fa-caret-down turn"></i>
                                <div className="rate-text">平均送餐时间</div>
                            </div>
                        </Tooltip>
                        <div className="commas"></div>
                        <Tooltip title="prompt text" placement="bottom">
                            <div className="rate-box">
                                <div className="rate"><span>91</span>%</div>
                                <i className="fa fa-caret-down turn"></i>
                                <div className="rate-text">及时送餐率</div>
                            </div>
                        </Tooltip>
                    </div>
                    <div className="fold-3d"></div>
                    <div className="collection">
                        <i className="fa fa-heart-o"></i>
                        <span>收藏</span>
                        <div className="collection-num">(646)</div>
                    </div>
               </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Detail)
