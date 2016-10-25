'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import storejs from 'storejs';
import { message } from 'antd'

// 收藏店铺
export function collectStore(storeId,status,callback){
    let userInfo = store.getState().common.userInfo;
    return function(dispatch){
        if(userInfo){
            ajax({
                url: '/rest/api/store/storecollection',
                data: {
                    storeId,
                    status: status?1:0,
                    memberId: userInfo.memberId
                },
                success: function(res){
                    if(res.result == 1){
                        dispatch({
                            type: 'toggle/collect',
                            status: res.isfav,
                        })
                        message.success(`${status?'收藏':'取消收藏'}成功`)
                        callback && callback(res);
                    }
                }
            })
        }
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
                memberId: params.memberId,
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
    return function(dispatch) {
        ajax({
            url: 'rest/api/order/storeEvaluatePage',
            data: {
                storeId:params.storeId,
                ...params.search
            },
            success: function(res){
                dispatch({
                    type: 'get/StoreEvaluat/list',
                    evaluatList: res.data
                })
                call && call(res);
            }
        })
    }
}

const CART_KEY = 'CART_KEY';
/**
 * 保存购物车数据到缓存
 */
export function saveCartList(storeId,memberId = "global",newData){
    return function(dispatch){
        let data = storejs.get(CART_KEY) || {};
        data[memberId] = data[memberId] || {};
        data[memberId][storeId] = newData;
        storejs.set(CART_KEY,data);
    }
}

/**
 * 获取购物车缓存数据
 */
export function getCartList(storeId,memberId = "global"){
    let data = storejs.get(CART_KEY) || {};
    data = data[memberId] || {};
    return data[storeId];
}

/**
 * 清空购物车缓存数据
 */
export function clearCart(storeId,memberId = "global"){
    return function(dispatch){
        let data = storejs.get(CART_KEY) || {};
        data[memberId] = data[memberId] || {};
        delete data[memberId][storeId];
        storejs.set(CART_KEY,data);
    }
}
