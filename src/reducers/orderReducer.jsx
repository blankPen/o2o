'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'orderState';
export default handleActions({
    'order/orderList': (state, action) => {
        if(action.pageNo=="1"){
            return {
                ...state,
                list: [
                    ...action.list
                ]
            }
        }else{
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.list
                ]
            }
        }
        
    },
    'order/orderDetail': (state, action) => {
        return {
            ...state,
            detail: action.list
        }
    },
    'order/selectItem': (state, action) => {
        return {
            ...state,
            selectId: action.id
        }
    }
}, {
    list : [],
    detail : {},
    selectId: ""
});
