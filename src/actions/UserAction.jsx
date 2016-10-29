/*
 * @Author: liuyang
 * @Date:   2016-10-19 21:48:10
 * @Desc: this_is_desc
 */

'use strict';
import ajax from 'common/Ajax';
import { getPositionPoint } from 'actions/commonAction';
import {
    getMemberDetail
} from 'actions/SignPageAction';
import store from 'stores';

//一般请求后台用方法
export function theAjax(url,data,call,error){
    return function(dispatch) {
        ajax({
            url: url,
            data:data,
            success: function(res){
                call && call(res);
            },
            error:function(err){
                error&&error(err);
            }
        })
    }
}
//获取订单list
export function getOrderList(params,call){
    return function(dispatch) {
        ajax({
            url: '/rest/api/order/orderlist',
            data: {
                ...params,
            },
            success: function(res){
                dispatch({
                    type: 'order/orderList',
                    list: res.data,
                    pageNo:params.pageNo
                })
                call && call(res);
            }
        })
    }
}
//获取订单详情
export function getMenuList(id,call){
    return function(dispatch) {
        ajax({
            url: '/rest/api/order/orderDetail',
            data: {
                orderId:id
            },
            success: function(res){
                dispatch({
                    type: 'order/orderDetail',
                    list: res.data||{}
                })
                call && call(res);
            }
        })
    }
}
//设置选择某个订单展开
export function selectItem(id,call){
    return function(dispatch) {
        dispatch({
            type: 'order/selectItem',
            id: id
        });
        call&&call();
    }
}
//我的收藏请求
//获取订单详情
export function getCollectList(id,call){
    return function(dispatch) {
        ajax({
            url: '/rest/api/store/storeFavoritesList',
            data: {
                ...getPositionPoint(),
                memberId:id
            },
            success: function(res){
                dispatch({
                    type: 'store/storeFavoritesList',
                    list: res.data||{}
                })
                call && call(res);
            }
        })
    }
}
//删除收藏
export function removeCollect(storeid,id,call){
    let userInfo = store.getState().common.userInfo;
    return function(dispatch) {
        ajax({
            url: '/rest/api/store/storecollection',
            data: {
                storeId:storeid,
                status:0,
                memberId:id
            },
            success: function(res){
                if(res.result == 1){
                    dispatch(getMemberDetail({
                        "memberId": userInfo.memberId
                    }));
                }
                call && call(res);
            }
        })
    }
}

/*
 * @Author: MoCheng
 */
/**
 * [updateToName  更新姓名]
 */
export function updateToName(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/updateMemberName',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
/**
 * [updateToMobiphone  更新手机号码]
 */
export function updateToMobiphone(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/bindMobile',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
/**
 * [updateToPaypass  更新支付密码]
 */
export function updateToPaypass(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/updatePayPassword',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
/**
 * [retrieveToPaypass  找回支付密码]
 */
export function retrieveToPaypass(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/findPayPassword',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
/**
 * [updateToLoginpass  更新登录密码]
 */
export function updateToLoginpass(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/updatePassword',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
/**
 * [retrieveToLoginpass  找回登录密码]
 */
export function retrieveToLoginpass(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/findPassword',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
