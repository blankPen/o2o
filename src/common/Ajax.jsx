import reqwest from 'reqwest';
import History from 'common/History';
import doSign from 'common/doSign';
import store from 'stores';
import {
    message
} from 'antd';
import {
    logout
} from 'actions/SignPageAction';

export default function(opt) {
    let call_succ = opt.success;
    let call_error = opt.success;
    opt.method = opt.type || 'post';
    opt.type = opt.dataType ? (opt.dataType == 'none' ? undefined : opt.dataType) : 'json';
    // opt.url = opt.url.startWith('/rest') ? `/leimingtech-front${opt.url}` : opt.url;
    opt = {
        cache: 'false',
        ...opt,
    };
    opt.data = opt.data || {};
    opt.data.sign = getSign(opt.data);
    opt.data.timestamp = Date.now();
    opt.success = (res) => {
        if (res.result == 2) {
            console.log("登录超时");
            store.dispatch(logout(function() {
                History.push('/login');
            }, false));
            message.error(res.msg);
        } else {
            call_succ && call_succ.call(this, res);
        }
    };
    reqwest(opt);
}

function getSign(params={}){
    let value = '';
    Object.keys(params).sort().map((key)=>{
        value+=`${key}&${params[key]}`;
    });
    return doSign(value);
}

