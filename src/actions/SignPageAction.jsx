/*
 * @Author: MoCheng
 */
'use strict';
import ajax from 'common/Ajax';
import History from 'common/History';
import { message } from 'antd';
/**
 * 控制登录弹框显隐
 */
export function toggleLoginDialog(flag){
    return {
        type: 'toggle/dialog/login',
        status: flag
    };
}
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
                    // History.push('/');
                }
                call && call(res);
            }
        })
    }
}

/**
 * [phoneLogin  手机账号登录]
 */
export function phoneLogin(params,call,redirect) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/login/loginByCode',
            data: {
                "validateCode": params.validateCode,
                "username": params.username
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.username, password: params.validateCode, user_id: res.data.memberId  },
                        expires: params.expires
                    })
                    if(redirect){
                        History.push(redirect);
                    }
                }
                call && call(res);
            }
        })
    }
}
/**
 * [otherLogin 其他账号登录]
 */
export function otherLogin(params,call,redirect) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/login/login',
            data: {
                "password": params.password,
                "username": params.username
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.username, password: params.password, user_id: res.data.memberId  },
                        expires: params.expires
                    })
                    if(redirect){
                        History.push(redirect);
                    }
                }
                call && call(res);
            }
        })
    }
}
/**
 * [register  注册用户]
 */
export function register(params,call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/member/register',
            data: {
                ...params
            },
            success: function(res){
                console.log(res);
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: { username: params.name, password: params.password, user_id: res.data.memberId  },
                        expires: 7
                    })
                    History.push('/');
                    dispatch(getMemberDetail({
                        "memberId": res.data.memberId
                    }));
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
            url: '/rest/api/login/logout',
            success: (res)=>{
                if(res.result == 1){
                    dispatch({
                        type: 'logout/success'
                    })
                    location.reload();
                }
            }
        })
        // History.push('/login');
    }
}
/**
 * [getVerifyCode  获取动态码]
 */
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
/**
 * [getCheckCode  验证动态码]
 */
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

export function thirdLogin(params,call){
    return function(dispatch){
        ajax({
            url: '/rest/api/member/thirdLogin',
            data: params,
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'login/success',
                        info: res.data,
                        cookieInfo: {
                            username: params.username,
                            password: params.validateCode,
                            user_id: res.data.memberId
                        },
                        expires: params.expires
                    })
                }else{
                    message.error(res.msg);
                }
            }
        })
    }
}
