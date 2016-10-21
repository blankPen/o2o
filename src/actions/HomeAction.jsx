/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:48:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-21 16:44:47
 */

'use strict';
import ajax from 'common/Ajax';
import { getPositionPoint } from 'actions/commonAction'

export function getHomeList(params,call) {
    return function(dispatch) {
        ajax({
            url: '/api/store/list',
            data: {
                ...getPositionPoint(),
                isOpenInvoice: 1,
                ...params
            },
            success: function(res){
                if(res.result == 1){
                    dispatch({
                        type: 'get/home/list',
                        list: res.data,
                        isRefresh: params.pageNo == 1
                    })
                }
                call && call(res);
            }
        })
    }
}

export function getClassList(id,call){
    return function(dispatch) {
        if(id !== undefined){
            if(id == '0'){ // 选中全部分类 清空子分类
                dispatch({
                    type: 'get/home/class/child',
                    list: []
                })
            }else{
                ajax({
                    url: '/api/classs/child',
                    data: {
                        ...getPositionPoint(),
                        parentId: id
                    },
                    success: function(res){
                        if(res.result == 1){
                            dispatch({
                                type: 'get/home/class/child',
                                list: res.data
                            })
                        }
                        call && call(res);
                    }
                })
            }
        }else{
            ajax({
                url: '/api/classs/list',
                data: getPositionPoint(),
                success: function(res){
                    if(res.result == 1){
                        dispatch({
                            type: 'get/home/class/list',
                            list: res.data
                        })
                    }
                    call && call(res);
                }
            })
        }
    }
}
