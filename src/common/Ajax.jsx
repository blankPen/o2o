import reqwest from 'reqwest';
import History from 'common/History';
import { message } from 'antd';

export default function(opt){
    let call_succ = opt.success;
    let call_error = opt.success;
    opt.method = opt.type || 'post';
    opt.type = opt.dataType ? (opt.dataType=='none' ? undefined:opt.dataType):'json';
    opt = {
        cache: 'false',
        ...opt
    };
    opt.success = (res)=> {
        if(res.result == 2){
            History.push('/login');
            message.error(res.msg);
        }else{
            call_succ && call_succ.call(this, res);
        }
    };
    reqwest(opt);
}
