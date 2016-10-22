/*
* @Author: pengzhen
* @Date:   2016-10-19 17:18:52
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-10-21 17:12:24
*/

'use strict';
import {
    handleActions
}  from 'redux-actions';
import Cookie from 'js-cookie';

let hp = Cookie.getJSON('history-position') || [];
const DEFAULT_POSITION = hp.length ? hp[0] : {
    title: '北京市',
    city: '北京市',
    point: {
        lng: 116.429493,
        lat: 39.936957,
    }
};
export const stateName = 'common';
export default handleActions({
    'set/position': (state, action) => {
        return {
            ...state,
            position: action.position
        }
    },
    'login/success':(state, action) => {
        Cookie.set('user_info', action.cookieInfo, { expires: 7 });//cookie存储用户名密码
        console.log("cookie存储用户名密码");
        sessionStorage.setItem('user_id',action.info.memberId);//session存储用户id
        console.log("session存储用户id");
        return {
            ...state,
            userInfo: action.info
        }
    },
    'get/userInfo':(state, action) => {
        console.log("获取用户信息为：");
        console.log(action.info);
        return {
            ...state,
            userInfo: action.info
        }
    },
    'logout/success' :(state, action)=>{
        console.log("退出登录");
        let user_info = Cookie.getJSON('user_info') || "";
        let user_id = sessionStorage.getItem("user_id") || "";
        if (user_id) {
            sessionStorage.removeItem('user_id');
        }
        if(user_info){
            Cookie.remove('user_info', { secure: true });
        }
        return {
            ...state,
            userInfo: []
        }
    }
}, {
    position: DEFAULT_POSITION
});
