/*
 * @Author: MoCheng
 */
'use strict';
import ajax from 'common/Ajax';
import History from 'common/History'

/**
 * [phoneLogin  手机账号登录]
 */
export function phoneLogin(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/login/loginByCode',
            data: {
                ...params
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.username, password: params.validateCode  }
                    })
                    History.push('/');
                }
                call && call(res);
            }
        })
    }
}
/**
 * [otherLogin 其他账号登录]
 */
export function otherLogin(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/login/login',
            data: {
                ...params
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.username, password: params.password  }
                    })
                    History.push('/');
                }
                call && call(res);
            }
        })
    }
}
/**
 * [logout 用户退出登录]
 */
export function logout(callback){
    return function(dispatch){
        ajax({
            url: '',
            success: function(result){
                dispatch({
                    type: TYPES.LOG_OUT
                })
                if(callback){
                    callback()
                }else{
                    let isOpen = store.getState().common.site_logo.isOpenOutsideWorld == 'Y';
                    History.push(isOpen?'/':'/login');
                }
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
