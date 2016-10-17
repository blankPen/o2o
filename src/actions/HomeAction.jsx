/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:48:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-17 22:16:56
 */

'use strict';
import Fetch from 'common/Fetch';
import reqwest from 'reqwest';
export function getList(params) {
    return function(dispatch) {
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
