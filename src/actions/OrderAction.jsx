/*
 * @Author: liuyang
 * @Date:   2016-10-19 21:48:10
 * @Desc: this_is_desc
 */

'use strict';
import ajax from 'common/Ajax';

export function getOrderList(id,call){
    return function(dispatch) {
        ajax({
            url: '/api/order/orderlist',
            data: {
                memberId:"a114f24da925405cade144695e592df8"
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