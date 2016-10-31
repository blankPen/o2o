/*
* @Author: pengzhen
* @Date:   2016-10-19 17:18:52
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-10-31 13:33:49
*/

'use strict';
import {
    handleActions
}  from 'redux-actions';
import Cookie from 'js-cookie';
import storejs from 'storejs';

let hp = storejs.get('history-position') || [];
const DEFAULT_POSITION = hp.length ? hp[0] : {
    isUndefined: true,
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
        console.log("cookie保存期限："+action.expires+"天");
        Cookie.set('user_info', action.cookieInfo, { expires: action.expires });//cookie存储用户名密码
        sessionStorage.setItem('user_id',action.info.memberId);//session存储用户id
        return {
            ...state,
            userInfo: action.info
        }
    },
    'get/userInfo':(state, action) => {
        return {
            ...state,
            userInfo: action.info
        }
    },
    'logout/success' :(state, action)=>{
        sessionStorage.removeItem('user_id');
        Cookie.remove('user_info', { secure: true });
        return {
            ...state,
            userInfo: undefined
        }
    },
    'toggle/dialog/login': (state, action)=>{
        return {
            ...state,
            show_login_dialog: action.status
        }
    }
}, {
    userInfo: undefined,
    position: DEFAULT_POSITION,
    show_login_dialog: false
});
