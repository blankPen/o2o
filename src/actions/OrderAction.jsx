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

//获取订单信息
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

//获取微信二维码
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

//支付宝支付
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

//余额支付
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

//获取订单支付状态
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
        let data = '';
        Object.keys(params).forEach(key=>{
            data +=`&${key}=${params[key]}`;
        });
        data = data.substr(1);
        ajax({
            contentType:"multipart/form-data; boundary=ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC",
            url: '/rest/api/order/saveEvaluatePage',
            type: 'get',
            data: data,
            // data: { ...params},
            success: function(res){
                call && call(res);
            }
        })
    }
}
/**
 * [balanceRecharge  余额充值]
 */
export function balanceRecharge(params,call) {
    return function(dispatch) {
        ajax({
            url: 'rest/api/order/recharge',
            data: {
                ...params
            },
            success: function(res){
                console.log("余额充值：");
                console.log(res);
                dispatch({
                    type:'get/pay/info',
                    payInfo:res.data[0]
                });
                call && call(res);
            }
        })
    }
}
/**
 * [myEvaluateInfo   我的评价]
 */
export function myEvaluateInfo(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/order/myEvaluatePage',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
