'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import Item from './Item/'
import Filter from '../common/Filter/'
import { getList } from 'actions/HomeAction';

function mapStateToProps(state) {
    return {

    };
}

export class Home extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(getList())
    }
    render() {
        return (
            <div className="page-home">
                <div className="panel-filter">
                    <Filter type="text" />
                    <Filter type="checked" />
                </div>
                <div className="panel-list">
                    <div className="tool-bar"></div>
                    <div className='list-content'>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home)
