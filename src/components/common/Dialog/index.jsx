/*
 * @Author: pengzhen
 * @Date:   2016-10-24 11:33:55
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-24 11:43:11
 */

'use strict';
import './index.less';
import React from 'react';
import { Modal } from 'antd';

export default class Dialog extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                title='收货地址'
                className={'dialog'+(this.props.className || '')}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={undefined}
            >
                <div className="dialog-body">
                    {this.props.children}
                </div>
            </Modal>
        );
    }
}
