/*
 * @Author: pengzhen
 * @Date:   2016-10-24 18:11:42
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-03 16:14:18
 */

'use strict';
import './index.less';
import React from 'react';
import { Link } from 'react-router';
import Img from 'common/Img';
import Rate from 'components/common/Rate';

export default class Item extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        return (
            <Link to={`/detail/${data.storeId}`} className="search-item">
                <div className="item-content">
                    <div className="title">{data.storeName}</div>
                    <div className="price">
                        <span className="start-price">{data.startPrice}元起送</span>
                        <span className="send-price">
                            {data.expressFee}元配送费
                        </span>
                    </div>
                    <div className="rank">
                        <Rate value={data.storeScore} />
                        <span className="total">
                        月售{data.storeMonSales}单
                        </span>
                    </div>
                    <div className="send-distance">
                        距离我{data.distance}km
                    </div>
                </div>
                <div className="discount">
                    {data.tagList.map((tag,i)=>{
                        return <Img key={tag.tagKey} className='icon' src={tag.tagIcon} />;
                    })}
                </div>
            </Link>
        );
    }
}
