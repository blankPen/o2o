/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:48:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-31 13:28:31
 */

'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import Cookie from 'js-cookie';
import storejs from 'storejs';


// 坐标相关
export function savePosition(position) {
    position = {
        point: {...position.point},
        city: position.city,
        title: position.title,
        address: position.address,
    };
    let hp = getHistoryPositions() || [];
    hp = hp.filter((p)=>{
        return !_.isEqual(position, p);
    });
    hp.unshift(position);
    // 最多缓存5个地址
    if(hp.length >= 5){
        hp = hp.slice(0,5);
    }
    storejs.set('history-position',hp);
    return {
        type: 'set/position',
        position
    }
}
export function getPosition(){
    return store.getState().common.position;
}
export function getPositionPoint(){
    let point = getPosition().point;
    return {
        longitude: point.lng,
        atitude: point.lat,
    };
}
export function getHistoryPositions(){
    return storejs.get('history-position') || [];
}

