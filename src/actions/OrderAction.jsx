/*
 * @Author: liuyang
 * @Date:   2016-10-19 21:48:10
 * @Desc: this_is_desc
 */

'use strict';
import ajax from 'common/Ajax';

export function getOrderList(params,call){
    return function(dispatch) {
        ajax({
            url: '/rest/api/order/orderlist',
            data: {
                memberId:"a114f24da925405cade144695e592df8",
                ...params,
            },
            success: function(res){
                dispatch({
                    type: 'order/orderList',
                    list: res.data
                })
                call && call(res);
            }
        })
    }
}

export function getMenuList(id,call){
    return function(dispatch) {
        ajax({
            url: '/rest/api/order/orderDetail',
            data: {
                orderId:id
            },
            success: function(res){
                dispatch({
                    type: 'order/orderDetail',
                    list: res.data||{}
                })
                call && call(res);
            }
        })
    }
}

export function selectItem(id){
    return function(dispatch) {
        dispatch({
            type: 'order/selectItem',
            id: id
        })
    }
}