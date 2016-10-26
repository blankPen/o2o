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
    'get/order/address/list': (state, action) => {
        return {
            ...state,
            addressList: action.list
        }
    },

}, {
    orderInfo:[],
    addressList: []
});
