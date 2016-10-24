'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import { message } from 'antd'


/**
 * 获取评价列表
 */

export function getOrderInfo(params,call) {
    return function(dispatch) {
        ajax({
            url: 'rest/api/order/genOrder',
            data: {
                storeId:params.storeId
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
