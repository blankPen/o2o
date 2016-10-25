'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'addressState';

export default handleActions({
    'get/address/list': (state, action) => {
        return {
            ...state,
            list: action.list
        }
    },

}, {
    list:[]
});
