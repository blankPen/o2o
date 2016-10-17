/*
 * @Author: pengzhen
 * @Date:   2016-10-17 20:24:06
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-17 22:35:49
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

export class Footer extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className='footer'>Footer</footer>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Footer)
