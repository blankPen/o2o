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
    }
}, {
    list: []
});
