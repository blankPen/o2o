'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'searchState';
export default handleActions({
    'get/search/complete': (state, action) => {
        return {
            ...state,
            completeData: action.data
        }
    },
    'get/search/data': (state, action) => {
        return {
            ...state,
            searchData: action.data
        }
    },
}, {
    completeData: [],
    searchData: []
});

