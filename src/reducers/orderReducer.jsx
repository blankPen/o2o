'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'orderState';

export default handleActions({
    'get/order/info': (state, action) => {
        return {
            ...state,
            orderInfo: action.orderInfo
        }
    },

}, {
    list:[]
});
