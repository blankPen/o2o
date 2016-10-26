'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import { message } from 'antd'
import { getPositionPoint } from 'actions/commonAction';


/**
 * 获取评价列表
 */

export function getOrderInfo(params,call) {
    return function(dispatch) {
        ajax({
            url: 'rest/api/order/genOrder',
            data: {
                ...getPositionPoint(),
                ...params,
            },
            success: function(res){
                dispatch({
                    type: 'get/order/info',
                    orderInfo: res.data
                })
                call && call(res);
            }
        })
    }
}
/**
 * [saveOrder 保存订单]
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function saveOrder(params,callback){
    return function(dispatch){
        ajax({
            url: '/rest/api/order/saveOrder',
            data: params,
            success: function(res){
                // dispatch({
                //     type: 'get/order/info',
                //     orderInfo: res.data
                // })
                callback && callback(res);
            }
        })
    }
}
/**
 * [getAddressList description]
 * @param  {[type]} params [description]
 * @param  {[type]} call   [description]
 * @return {[type]}        [description]
 */
export function getAddressList(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/address/addressList',
            data: params,
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/order/address/list',
                        list: res.data
                    })
                }else{
                    message.error(res.msg);
                }
                call && call(res);
            }
        })
    }
}
