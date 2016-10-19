/*
* @Author: pengzhen
* @Date:   2016-10-19 17:22:49
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-10-19 17:24:08
*/

'use strict';
import store from 'stores';
export function getPosition(){
    return store.getState().common.position;
}
