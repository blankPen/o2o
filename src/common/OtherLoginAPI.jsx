/*
 * @Author: pengzhen
 * @Date:   2016-11-01 15:34:55
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-01 17:58:17
 */

'use strict';
import loadJS from 'common/utils/loader';
import ajax from 'common/Ajax';

const TencentConfig = {
    sdk: 'http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js',
    appid: 123,
};

const WxConfig = {
    sdk: 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
    appid: 'wxa98139e63a254389',
    secret: 'd38be49198dbd6df5fb347f6c231c96f',
};

export function QQLogin() {

}
export const WeixinLogin = {
    init: function(callback) {
        loadJS(WxConfig.sdk, function() {
            callback();
        });
    },
    createCode(id) {
        var obj = new WxLogin({
            id: id,
            appid: WxConfig.appid,
            scope: "snsapi_login",
            redirect_uri: encodeURIComponent('http://testo2o.leimingtech.com/leimingtech-seller/login')
        });
    },
    getUserInfo(code,callback){
        this.getAccessToken(code,({access_token,openid})=>{
            ajax({
                url: `/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
                success: function(res){
                    if(res.errcode){
                        console.log("getUserInfo",res.errcode +":"+res.errmsg);
                    }else{
                        callback && callback(res);
                    }
                }
            })
        });
    },
    getAccessToken(code,callback){
        ajax({
            type: 'get',
            url: `/sns/oauth2/access_token?appid=${WxConfig.appid}&secret=${WxConfig.secret}&code=${code}&grant_type=authorization_code`,
            success: function(res){
                if(res.errcode){
                    console.log("getAccessToken",res.errcode +":"+res.errmsg);
                }else{
                    callback && callback(res);
                }
            }
        })
    }
};



