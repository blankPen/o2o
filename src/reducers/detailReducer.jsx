'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'detailState';
export default handleActions({
    'get/store/info': (state, action) => {
        return {
            ...state,
            storeDetail: action.storeDetail
        }
    },
    
    'get/classAndGoods/list': (state, action) => {
        return {
            ...state,
            classAndGoodsList: action.classAndGoodsList
        }
    },
    'get/StoreEvaluat/list':(state,action) => {
        return {
            ...state,
            evaluatList: action.evaluatList
        }
    }
}, {
    classAndGoodsList:[]
});
