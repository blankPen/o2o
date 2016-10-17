/*
 * @Author: pengzhen
 * @Date:   2016-10-17 20:20:16
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-17 20:53:57
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

export class TopNav extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='top-nav'>
                <div className="nav-content">
                    <div className="nav-left">
                        北京
                    </div>
                    <div className="nav-right">
                        登录
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(TopNav)
