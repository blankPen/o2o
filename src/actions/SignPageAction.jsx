/*
 * @Author: MoCheng
 */
'use strict';
import ajax from 'common/Ajax';
import History from 'common/History'

/**
 * [getMemberDetail   获取用户信息]
 */
export function getMemberDetail(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/memberDetail',
            data: {
                ...params
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'get/userInfo',
                        info: res.data,
                    })
                    History.push('/');
                }
                call && call(res);
            }
        })
    }
}

/**
 * [phoneLogin  手机账号登录]
 */
export function phoneLogin(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/login/loginByCode',
            data: {
                ...params
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.username, password: params.validateCode, user_id: res.data.memberId  }
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
            url: '/rest/api/login/login',
            data: {
                ...params
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.username, password: params.password, user_id: res.data.memberId  }
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
        dispatch({
            type: 'logout/success'
        })
        History.push('/login');
    }
}

export function getVerifyCode(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/index/verifyCode',
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
            url: '/rest/api/index/checkCode',
            data: {
                ...params
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
