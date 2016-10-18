'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import List from './List/'

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
                    Filter
                </div>
                <div className="panel-list">
                    <div className="tool-bar"></div>
                    <List></List>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home)
