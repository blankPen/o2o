'use strict';
import React from 'react';
import './index.less';

import {
    connect
} from 'react-redux';
import {
  Link
} from 'react-router';
import { Timeline, Icon,Rate  } from 'antd';
import ListView from 'components/common/ListView';
function mapStateToProps(state) {
    return {

    };
}
export class Collect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange=(value)=>{

    }
    renderTags(list){
        let smallTags = [];
        let bigTags = [];
        list.forEach((item,i)=>{
            let icon = <Img key={item.tagKey} className='icon' src={item.tagIcon} />;
            smallTags.push(icon);
            bigTags.push(
                <div key={item.tagKey} className='discount-item'>
                    {icon}
                    <span className="alias">{item.alias}</span>
                    {/*<span className="alias primary">(xxxxx)</span>*/}
                </div>
            );
        });
        return {
            small: smallTags,
            big: bigTags
        };
    }
    render(){
        const data = this.props.data || {};

        const tagObj = this.renderTags(data.tagList||[]);
        
        return(
            <div className="collectlist ">
                <ul className="clearfix collectul">
                    <li className="collectli">
                        <Link to={"/#"} className="collect">
                            <div className="collect-top">
                                <div className="image">
                                    <img src="http://a3.qpic.cn/psb?/V13YrEcN1YFUK0/*.1UjqCMWAE6EU0tiI3elUWyzbIZxStNmnh60Nqbptk!/m/dLIAAAAAAAAAnull&bo=bAQgA2wEIAMFCSo!&rf=photolist&t=5" alt=""/>
                                </div>
                                <div className="title">Fate/Zero</div>
                                <div className="starAndNum">
                                    <div className="star">
                                        <Rate allowHalf disabled count={5} onChange={this.handleChange} value={4.5} />4.8分
                                    </div>
                                    <div className="num">月售404单</div>
                                </div>
                                <div className="sendDesc">
                                    <span className="theys qisong">起送:￥</span>
                                    <span className="theys peisong">3元配送费</span>
                                    <span className="thetime">
                                        <Icon type="clock-circle-o"/>
                                        30分钟
                                    </span>
                                </div>
                            </div>
                            <div className="collect-bottom">
                                <div className="iconlist">
                                    {tagObj.small}
                                </div>
                                <div className="removecollect">
                                    <Icon type="heart" style={{"color":"red"}} />
                                    取消收藏
                                </div>
                                <div className="collectnum">
                                    收藏 <span>(300)</span>
                                </div>
                            </div>

                        </Link>
                    </li>
                </ul>
                
            </div>
            );
    }
}

export default connect(
    mapStateToProps
)(Collect)