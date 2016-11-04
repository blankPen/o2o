/*
 * @Author: pengzhen
 * @Date:   2016-10-17 21:48:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-04 18:04:02
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
// 获取当前选择的百度地图坐标对象
export function getPosition(){
    return store.getState().common.position;
}
// 获取当前用户坐标值
export function getPositionPoint(){
    let point = getPosition().point;
    return {
        longitude: point.lng,
        atitude: point.lat,
    };
}
// 从localStorage里获取坐标历史记录
export function getHistoryPositions(){
    return storejs.get('history-position') || [];
}
