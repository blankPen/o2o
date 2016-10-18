/*
 * @Author: pengzhen
 * @Date:   2016-10-18 13:34:55
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-18 13:59:47
 */

'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'homeState';
export default handleActions({
    'get/home/list': (state, action) => {
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
