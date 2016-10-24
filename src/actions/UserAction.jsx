/*
 * @Author: liuyang
 * @Date:   2016-10-19 21:48:10
 * @Desc: this_is_desc
 */

'use strict';
import ajax from 'common/Ajax';
import { getPositionPoint } from 'actions/commonAction'

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
export function selectItem(id){
    return function(dispatch) {
        dispatch({
            type: 'order/selectItem',
            id: id
        })
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
    return function(dispatch) {
        ajax({
            url: '/rest/api/store/storecollection',
            data: {
                storeId:storeid,
                status:0,
                memberId:id
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}