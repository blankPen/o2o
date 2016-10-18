/*
 * @Author: pengzhen
 * @Date:   2016-10-18 20:53:40
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-18 20:58:00
 */

'use strict';
import React from 'react';
const IMG_SERVER = 'http://o2o.leimingtech.com/';

export function getRealPath(src){
    if(src.startWith('/')){
        return IMG_SERVER + src;
    }else{
        return require(src);
    }
}

export default class Img extends React.Component {
    static propTypes = {
        src: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img {...this.props} src={getRealPath(this.props.src)} />
        );
    }
}
