/*
* @Author: pengzhen
* @Date:   2016-10-19 17:18:52
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-10-19 17:20:43
*/

'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'common';
export default handleActions({
    'set/position': (state, action) => {
        return {
            ...state,
            position: action.position
        }
    },
    'login/success':(state, action) => {
        return {
            ...state,
            userInfo: action.data
        }
    }
}, {
    position: {
        longitude: 116.429493,
        atitude : 39.936957,
    }
});
