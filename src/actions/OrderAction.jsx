'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import { message } from 'antd'
import { getPositionPoint } from 'actions/commonAction';


/**
 * 获取订单信息
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
 * [getCouponList description]
 * @param  {[type]} params [description]
 * @param  {[type]} call   [description]
 * @return {[type]}        [description]
 */
export function getCouponList(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/coupon/orderCouponMemberList',
            data: params,
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/order/coupon/list',
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

export function getPayInfo(orderSn,call){
    return function(dispatch){
        ajax({
            url:'/rest/api/order/goToPay',
            data:{orderSn:orderSn},
            success:function(res){
                dispatch({
                    type:'get/pay/info',
                    payInfo:res.data
                });
                call&&call(res);
            }
        });
    }
}

export function toWeiXinPay(params,call){
    return function(dispatch){
        ajax({
            url:'/rest/api/order/wxPay',
            data:{paysn:params},
            success:function(res){
                call&&call(res)
            }
        });
    }
}

export function toAliPay(params,call){
    return function(dispatch){
        ajax({
            url:'/rest/api/order/zfbPay',
            data:{paysn:params},
            success:function(res){
                call&&call(res)
            }
        });
    }
}

export function toPredepositPay(params,call) {
    return function(dispatch){
        ajax({
            url:"/rest/api/predeposit/predepositPay",
            data:{...params},
            success:function(res){
                call&&call(res);
            }
        });
    }
}

export function getPayResult(paysn,call){
    return function(dispatch){
        ajax({
            url:"/rest/api/order/getPaystate",
            data:{paysn:paysn},
            success:function(res){
                call&&call(res)
            }
        });
    }
}

/**
 * [saveEvaluateInfo   保存评价]
 */
export function saveEvaluateInfo(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/order/saveEvaluatePage',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}