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
    },
    'toggle/collect':(state,action) => {
        return{
            ...state,
            storeDetail: {
                ...state.storeDetail,
                isStoreCollect: action.status,
                storeCollect: state.storeDetail.storeCollect+(action.status?1:-1)
            }
        }
    }
}, {
    classAndGoodsList:[]
});
