/*
 * @Author: pengzhen
 * @Date:   2016-11-01 15:34:55
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-02 11:28:59
 */

'use strict';
import loadJS from 'common/utils/loader';
import ajax from 'common/Ajax';

const redirectUri = encodeURIComponent(location.protocol +'//'+location.host+'/#/login');
const TencentConfig = {
    appid: 101244672,
    appkey: 'dfd8be1247c2e27237f012f696be223b',
};

const WxConfig = {
    sdk: 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
    appid: 'wxa98139e63a254389',
    secret: 'd38be49198dbd6df5fb347f6c231c96f',
};

export const QQLogin = {
    init(callback) {
        // var script = document.createElement("script");
        // script.src = TencentConfig.sdk;
        // document.body.appendChild(script);
    },
    showPopup(){
        let QC = window.QC;
        QC.Login.showPopup({
            appId: TencentConfig.appid,
            redirectURI: redirectUri
        });
    },
    login(){
        var link = `https://graph.qq.com/oauth2.0/authorize?response_type=code&state=1&client_id=${TencentConfig.appid}&redirect_uri=${redirectUri}`;
        window.open(link);
    }
};
export const WeixinLogin = {
    init(callback) {
        loadJS(WxConfig.sdk, function() {
            callback && callback();
        });
    },
    createCode(id) {
        var obj = new WxLogin({
            id: id,
            appid: WxConfig.appid,
            scope: "snsapi_login",
            redirect_uri: redirectUri
        });
    },
    getUserInfo(code, callback) {
        this.getAccessToken(code, ({
            access_token,
            openid
        }) => {
            ajax({
                url: `/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
                success: function(res) {
                    if (res.errcode) {
                        console.log("getUserInfo", res.errcode + ":" + res.errmsg);
                    } else {
                        callback && callback(res);
                    }
                }
            })
        });
    },
    getAccessToken(code, callback) {
        ajax({
            type: 'get',
            url: `/sns/oauth2/access_token?appid=${WxConfig.appid}&secret=${WxConfig.secret}&code=${code}&grant_type=authorization_code`,
            success: function(res) {
                if (res.errcode) {
                    console.log("getAccessToken", res.errcode + ":" + res.errmsg);
                } else {
                    callback && callback(res);
                }
            }
        })
    }
};
