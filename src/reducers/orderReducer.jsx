'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'orderState';
export default handleActions({
    'order/orderList': (state, action) => {
        return {
            ...state,
            list: [
                ...state.list,
                ...action.list
            ]
        }
    },
    'order/orderDetail': (state, action) => {
        return {
            ...state,
            detail: action.list
        }
    }
}, {
    list : [],
    detail : {},
});
