'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import { message } from 'antd'

/**
 * 添加或更新地址
 */

export function updateAddress(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/address/saveAddress',
            data: params,
            success: function(res){
                if(res.result != 1){
                    message.error(res.msg);
                }
                call && call(res);
            }
        })
    }
}

/**
 * 获取地址列表
 * params 参数
 * memberId 用户id 必填
 * storeId 商店id 选填，用户下单时判断用户的收货地址是否在配送范围内
 */
export function getAddressList(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/address/addressList',
            data: params,
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/address/list',
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
