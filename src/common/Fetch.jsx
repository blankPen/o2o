'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
    if (res.status === 401) {
        location.href = '/401';
    }
    return res;
}

function check404(res) {
    if (res.status === 404) {
        return Promise.reject(errorMessages(res));
    }
    return res;
}

function jsonParse(res) {
    return res.json();
}

function parseData(obj) {
    let data = new FormData();
    Object.keys(obj).forEach(key => {
        data.append(key, obj[key]);
    })
    return data;
}
const server = 'http://o2o.leimingtech.com/leimingtech-front';
function _fetch(url,opt={}){
    url = server + url;
    opt = Object.assign({},{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': server
        },
    },opt);
    return fetch(url,opt)
        .then(check401)
        .then(check404)
        .then(jsonParse);
}

export default {
    get(url,opt){
        return _fetch(url,opt);
    },
    post(url,data,opt){
        opt = Object.assign({},opt,{
            method: 'POST',
            body: parseData(data)
        });
        return _fetch(url,opt);
    }
}
