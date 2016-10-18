'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import List from './List/'
import Filter from '../common/Filter/'

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
    }
    render() {
        return (
            <div className="page-home">
                <div className="panel-filter">
                    <Filter type="text" />
                    <Filter type="checked" />
                </div>
                <div className="panel-list">
                    <div className="tool-bar">
                        <Filter type="filter" />
                    </div>
                    <List></List>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home)
