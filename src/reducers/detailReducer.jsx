'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'detailState';
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
