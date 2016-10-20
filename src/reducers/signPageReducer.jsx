/*
 * @Author: MoCheng
 */
'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'signPageState';
export default handleActions({
    // 'login/success': (state, action) => {
    //     return {
    //         ...state,
    //         loginPhoneList:action.list
    //     }
    // },
    // 'get/login/list': (state, action) => {
    //     return {
    //         ...state,
    //         loginList: action.list
    //     }
    // }
}, {
    loginPhoneList: [],
    loginList: [],
});

