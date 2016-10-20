/*
 * @Author: pengzhen
 * @Date:   2016-10-20 09:26:57
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-20 16:53:53
 */

'use strict';
import loader from 'common/utils/loader';

const ak = 'Y5beUs8WwpN72mQWjGaMEawPl8L69G4f';
const url = `http://api.map.baidu.com/api?v=2.0&ak=${ak}`;

const defaultParams = {
    longitude: 116.331398,
    latitude: 39.897445,
    zoom: 12
}

const BaiduMap = function(id, callback) {
    var self = this;
    var BMap = window.BMap;
    // init
    this.map = new BMap.Map(id);
    var point = new BMap.Point(defaultParams.longitude, defaultParams.latitude);
    this.map.centerAndZoom(point, defaultParams.zoom);

    this.geolocation = new BMap.Geolocation();
    // 创建地理编码实例
    this.geocoder = new BMap.Geocoder();
    this.local = new BMap.LocalSearch(this.map, {
        onSearchComplete: function(results) {
            if(self.searchCallback){
                // 判断状态是否正确
                if (self.local.getStatus() == BMAP_STATUS_SUCCESS) {
                    var s = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i++) {
                        s.push(results.getPoi(i));
                    }
                    self.searchCallback(s);
                    self.searchCallback = undefined;
                }
            }
        }
    });
}
BaiduMap.prototype = {
    // 获取当前地理位置信息
    getCurrentPosition(callback) {
        var _self = this;
        var map = this.map;
        this.geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                map.panTo(r.point);
                _self.getPositionAddress(r.point.lng, r.point.lat, callback.bind(null, r.point))
            } else {
                console.error('BMap failed' + this.getStatus());
            }
        }, {
            enableHighAccuracy: true
        })
    },
    // 根据坐标获取当前地理位置信息
    getPositionAddress(lng, lat, callback) {
        this.geocoder.getLocation(new BMap.Point(lng, lat), function(result) {
            if (result) {
                callback(result);
            }
        });
    },
    // 搜索
    search(value, callback) {
        this.searchCallback = callback;
        this.local.search(value);
    },
    setPlace(value, callback) {
        var map = this.map;
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
            var results = local.getResults();
            var pp = results.getPoi(0).point; //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            // map.addOverlay(new BMap.Marker(pp)); //添加标注
            callback && callback(pp,results);
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(value);
    },

    createAutocomplete({id,onhighlight,onconfirm}){
        var self = this;
        var ac = new BMap.Autocomplete({
            "input": id,
            "location": this.map
        });
        ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
            var value = "";
            if (e.toitem.index > -1) {
                var _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
                onhighlight(value);
            }
        });
        ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
            var value = "";
            if (e.item.index > -1) {
                var _value = e.item.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
                onconfirm(value);
            }
            self.setPlace(value);
        });
        return ac;
    }
}
BaiduMap.init = function(id, callback) {
    window.initBMap = function() {
        let maper = new BaiduMap(id);
        callback(maper);
        window.initBMap = undefined;
    }
    if(BMap){
        initBMap();
    }else{
        var script = document.createElement("script");
        script.src = `${url}&callback=initBMap`;
        document.body.appendChild(script);
    }
}

export default BaiduMap;
