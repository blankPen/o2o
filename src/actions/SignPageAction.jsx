/*
 * @Author: MoCheng
 */
'use strict';
import ajax from 'common/Ajax';

export function getLoginByCode(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/login/loginByCode',
            data: {
                ...params
            },
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/login/list',
                        list: res.data,
                        isRefresh: params.pageNo == 1
                    })
                }
                call && call(res);
            }
        })
    }
}
export function getVerifyCode(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/index/verifyCode',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
export function getCheckCode(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/index/checkCode',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
