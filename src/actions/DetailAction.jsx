'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
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
// 收藏店铺
export function collectStore(storeId,status,callback){
    let userInfo = store.getState().common.userInfo;
    return function(dispatch){
        ajax({
            url: '/rest/api/store/storecollection',
            data: {
                storeId,
                status: status?1:0,
                memberId: userInfo.memberId
            },
            success: function(res){
                // dispatch({
                //     type: 'get/home/list',
                //     list: res.data
                // })
                if(res.result == 1){
                    console.log(res)
                    callback && callback(res);
                }
            }
        })
    }
}
