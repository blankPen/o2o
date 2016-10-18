/*
 * @Author: pengzhen
 * @Date:   2016-10-18 13:08:28
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-18 14:22:13
 */

'use strict';
import React from 'react';
import {
    connect
} from 'react-redux';
import Item from '../Item/';
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



export class List extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pageSize: 20,
            pageNo: 1
        }
    }
    componentWillMount() {
        this.refresh();
    }
    loadNextPage = (params) => {
        if (!this.state.loading) {
            this.setState({
                loading: true
            })
            this.props.dispatch(getHomeList({
                ...this.props.params,
                pageSize: this.state.pageSize,
                pageNo: this.state.pageNo,
                ...params
            },this.onLoaded));
        }
    }
    onLoaded = () => {
        console.log(this.state.pageNo + 1)
        this.setState({
            pageNo: this.state.pageNo + 1,
            loading: false
        });
    }
    refresh() {
        this.loadNextPage({
            pageNo: 1
        });
    }
    renderList(list = []) {
        return list.map((item, i) => {
            return <Item key={i} data={item}/>
        })
    }
    render() {
        let {
            dataSource,
            params
        } = this.props;
        return (
            <div className='list-content'>
                {this.renderList(dataSource)}
                <div className="loading-box" onClick={()=>{this.loadNextPage()}}>
                    正在加载更多商家...
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(List)
