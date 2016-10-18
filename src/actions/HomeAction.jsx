/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:48:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-18 11:08:54
 */

'use strict';
import ajax from 'common/Ajax';

export function getList(params) {
    return function(dispatch) {
        ajax({
            url: '/api/store/list',
            data: {
                longitude: 116.429493,
                atitude: 39.93695,
                isOpenInvoice: 1
            },
            success: function(res){
                console.log(res)
            }
        })
        // reqwest({
        //     url: 'http://o2o.leimingtech.com/leimingtech-front/rest/api/store/list?longitude=39.93695&atitude=116.429493',
        //     success: (res)=>{
        //         console.log(res)
        //     }
        // });
        // Fetch.get('/rest/api/store/list', {
        //     longitude: 39.93695,
        //     atitude: 116.429493,
        // }).then(res => {
        //     console.log(res)
        // });
    }
}
