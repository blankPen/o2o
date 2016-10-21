'use strict';
import ajax from 'common/Ajax';

export function getHomeList(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/store/list',
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
