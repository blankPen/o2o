/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:48:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-18 14:22:29
 */

'use strict';
import ajax from 'common/Ajax';

export function getHomeList(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/store/list',
            data: {
                longitude: 116.429493,
                atitude: 39.93695,
                isOpenInvoice: 1,
                ...params
            },
            success: function(res){
                dispatch({
                    type: 'get/home/list',
                    list: res.data
                })
                call && call(res);
            }
        })
    }
}
