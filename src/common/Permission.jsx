/*
* @Author: pengzhen
* @Date:   2016-10-24 10:51:14
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-10-31 11:16:08
*/

'use strict';
import store from 'stores';
import React from 'react';
import {
    Link
} from 'react-router';
import History from 'common/History';
import { getPosition } from 'actions/commonAction';
function noop() {}

// 第一次访问需要设置地址
export function requireSetPosition(rextState, replace, callback){
    if(getPosition().isUndefined){
        console.log('初次访问，未设置地址');
        History.replace('/map');
    }else{
        callback();
    }
}

// 为按钮注册需要登录权限才能执行操作
export function needLogin(el, opt = {}) {
    const common = store.getState().common;
    const userInfo = common.userInfo;
    if (userInfo) {
        return el;
    } else {
        // let prevent = noop;
        // if (opt.autoEvent !== false) {
        //     if (el.props.onClick) {
        //         prevent = el.props.onClick.bind(el);
        //     } else if (Link == el.type) {
        //         prevent = function() {
        //             History.push(el.props.to);
        //         }
        //     }
        // }
        // delete opt.autoEvent;
        return React.cloneElement(el, {
            ...opt,
            onClick: function(e) {
                History.push('/login');
                e.preventDefault();
                e.stopPropagation();
            }
        })
    }
}
