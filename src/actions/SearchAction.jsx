/*
* @Author: pengzhen
* @Date:   2016-10-24 14:52:37
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-10-24 21:41:05
*/

'use strict';
import ajax from 'common/Ajax';
import { getPositionPoint } from 'actions/commonAction';

export function searchAutoComplete(value,call){
    if(value === null){
        return {
            type: 'get/search/complete',
            data: [],
        }
    }
    return function(dispatch){
        ajax({
            url: '/rest/api/store/list',
            data: {
                ...getPositionPoint(),
                keyword: value,
                pageNo: 1,
                pageSize: 5
            },
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/search/complete',
                        data: res.data,
                    })
                }
                call && call(res);
            }
        })
    }
}

export function searchStore(params,call){
    return function(dispatch){
        ajax({
            url: '/rest/api/store/list',
            data: {
                ...getPositionPoint(),
                ...params,
            },
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/search/data',
                        data: res.data,
                    })
                }
                call && call(res);
            }
        })
    }
}
