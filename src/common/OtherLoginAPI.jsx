/*
 * @Author: pengzhen
 * @Date:   2016-11-01 15:34:55
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-03 15:05:21
 */

'use strict';
import loadJS from 'common/utils/loader';
import ajax from 'common/Ajax';
import reqwest from 'reqwest';

let redirectUri = location.protocol +'//'+location.host+'/leimingtech-front/rest/api/login/thirdLogin';
if(process.env.NODE_ENV !== 'production'){
    redirectUri = 'http://testo2o.leimingtech.com/leimingtech-front/rest/api/login/thirdLogin';
}
const TencentConfig = {
    appid: 101244672,
    appkey: 'dfd8be1247c2e27237f012f696be223b',
    prefix: process.env.NODE_ENV !== 'production'?'':'https://graph.qq.com/',
};

const WxConfig = {
    sdk: 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
    appid: 'wxa98139e63a254389',
    secret: 'd38be49198dbd6df5fb347f6c231c96f',
    prefix: process.env.NODE_ENV !== 'production'?'':'https://api.weixin.qq.com/',
};
export const QQLogin = {
    init(callback) {
        // var script = document.createElement("script");
        // script.src = TencentConfig.sdk;
        // document.body.appendChild(script);
    },
    login(){
        var link = `https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=${TencentConfig.appid}&redirect_uri=${redirectUri}&state=qq&scope=get_user_info,get_info`
        location.href = link;
    },
    getAccessToken(code,callback){
        ajax({
            type: 'get',
            url: `${TencentConfig.prefix}oauth2.0/token?grant_type=authorization_code&client_id=${TencentConfig.appid}&client_secret=${TencentConfig.appkey}&code=${code}&redirect_uri=${redirectUri}`,
            dataType: 'none',
            success: function(resp){
                console.log(resp,parseParams(resp))
                callback && callback(parseParams(resp));
            }
        })
    },
    getOpenId(token,callback){
        ajax({
            type: 'get',
            url: `${TencentConfig.prefix}oauth2.0/me?access_token=${token}`,
            dataType: 'none',
            success: function(resp){
                callback && callback(parseParams(resp));
            }
        })
    },
    getUserInfo(code,callback){
        this.getAccessToken(code,(tokenRes)=>{
            console.log(tokenRes)
            let token = tokenRes.access_token;
            if(token){
                this.getOpenId(token,(meRes)=>{
                    let openid = meRes.openid;
                    if(openid){
                        ajax({
                            type: 'get',
                            url: `${TencentConfig.prefix}user/get_user_info?access_token=${token}&oauth_consumer_key=${TencentConfig.appid}&openid=${openid}`,
                            success: function(res){
                                res.openid = openid;
                                callback && callback(res);
                            }
                        })
                    }else{
                        callback && callback(tokenRes,'获取Openid失败');
                    }
                })
            }else{
                callback(tokenRes,'获取Token失败');
            }
        })
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
            redirect_uri: encodeURIComponent(redirectUri),
            state: 'wx',
        });
    },
    getUserInfo(code, callback) {
        this.getAccessToken(code, ({
            access_token,
            openid
        },error) => {
            if(error){
                return callback && callback(null,error);
            }
            ajax({
                url: `${WxConfig.prefix}/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
                success: function(res) {
                    if (res.errcode) {
                        callback && callback(null,"getUserInfo", res.errcode + ":" + res.errmsg);
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
            url: `${WxConfig.prefix}/sns/oauth2/access_token?appid=${WxConfig.appid}&secret=${WxConfig.secret}&code=${code}&grant_type=authorization_code`,
            success: function(res) {
                if (res.errcode) {
                    callback && callback(res,"getAccessToken", res.errcode + ":" + res.errmsg);
                    console.log("getAccessToken", res.errcode + ":" + res.errmsg);
                } else {
                    callback && callback(res);
                }
            }
        })
    }
};

function parseParams(params){
    let res = params;
    if(typeof params === 'string'){
        res = parseCallback(params) || parseToken(params);
    }
    return res;
}
function parseCallback(str){
    var reg = new RegExp("callback\(.*\);","i");
    var r = str.match(reg);
    if(r && r.length == 2){
        r = r[1].substr(1,r[1].length-2);
        return JSON.parse(r);
    }
}
function parseToken(str){
    let obj = {};
    let arr = str.split('&');
    arr.forEach(function(item){
        let res = item.split('=');
        if(res.length == 2){
            obj[res[0]] = res[1];
        }
    });
    return obj;
}
