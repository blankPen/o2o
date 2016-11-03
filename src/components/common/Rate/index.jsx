/*
 * @Author: pengzhen
 * @Date:   2016-11-03 16:10:26
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-03 16:11:19
 */

'use strict';
import React from 'react';
import {
    Rate
} from 'antd';

export default class index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Rate allowHalf count={5} {...this.props} />
        );
    }
}
