/*
 * @Author: pengzhen
 * @Date:   2016-10-24 15:40:57
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-24 21:37:34
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { searchStore } from 'actions/SearchAction';
import ListView from 'components/common/ListView';
import Item from './Item'

function mapStateToProps({searchState}) {
    return {
        dataSource: searchState.searchData
    };
}

export class Search extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

    }
    getPostData=()=>{
        return {
            keyword: this.props.location.query.keyword
        }
    }
    handleListLoad=(params,callback)=>{
        this.props.dispatch(searchStore(params, (res) => {
            callback(res.totalRows > res.pageSize * res.pageNo);
        }));
    }
    render() {
        let keyword = this.props.location.query.keyword;
        return (
            <div className="page-search">
                <div className="search-content">
                    <h2 className='search-title'>搜索"<span>{keyword}</span>"的餐厅结果</h2>
                    <ListView
                        keySet='storeId'
                        params={this.getPostData()}
                        dataSource={this.props.dataSource}
                        handleLoad={this.handleListLoad}
                    >
                        <Item />
                    </ListView>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Search)
