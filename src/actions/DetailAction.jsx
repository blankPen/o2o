'use strict';
import ajax from 'common/Ajax';

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

/**
 * 获取店铺详情
 */
export function getStoreDetail(params,call) {
    return function(dispatch) {
        ajax({
            url: 'rest/api/store/info',
            data: {
                memberId:-1,
                storeId:params.storeId
            },
            success: function(res){
                dispatch({
                    type: 'get/store/info',
                    storeDetail: res.data
                })
                call && call(res);
            }
        })
    }
}
/**
 * 获取分类和分类下的菜品列表
 */
export function getClassAndGoodsList(params,call) {
    console.log(11111);
    return function(dispatch) {
        ajax({
            url: 'rest/api/storegoodsclass/list',
            data: {
                storeId:params.storeId
            },
            success: function(res){
                dispatch({
                    type: 'get/classAndGoods/list',
                    classAndGoodsList: res.data
                })
                call && call(res);
            }
        })
    }
}

/**
 * 获取评价列表
 */

export function getStoreEvaluatList(params,call) {
    console.log(11111);
    return function(dispatch) {
        ajax({
            url: 'rest/api/order/storeEvaluatePage',
            data: {
                storeId:params.storeId
            },
            success: function(res){
                dispatch({
                    type: 'get/StoreEvaluat/list',
                    evaluatList: res.data.evaluateGoodList
                })
                call && call(res);
            }
        })
    }
}
