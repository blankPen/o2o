'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import Item from './Item/'
import Filter from 'components/common/Filter/'
import ListView from 'components/common/ListView'
import {
    getHomeList
} from 'actions/HomeAction';

function mapStateToProps({
    homeState
}) {
    return {
        dataSource: homeState.list
    };
}

export class Home extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    handleLoad=(params,callback)=>{
        this.props.dispatch(getHomeList(params,(res)=>{
            callback(res.totalRows>res.pageSize*res.pageNo);
        }));
    }
    render() {
        return (
            <div className="page-home">
                <div className="panel-filter">
                    <Filter type="text" />
                    <Filter type="checked" />
                </div>
                <div className="panel-list">
                    <div className="tool-bar"><Filter type="filter" /></div>
                    <ListView
                        keySet='storeId'
                        dataSource={this.props.dataSource}
                        handleLoad={this.handleLoad}
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
)(Home)
