/*
 * @Author: MoCheng
 */
'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'signPageState';
export default handleActions({
    'get/login/list': (state, action) => {
        return {
            ...state,
            list: [
                ...state.list,
                ...action.list
            ]
        }
    }
}, {
    list: []
});
