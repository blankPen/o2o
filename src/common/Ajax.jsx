import reqwest from 'reqwest'

export default function(opt){
    let call_succ = opt.success;
    let call_error = opt.success;
    opt.method = opt.type || 'post';
    opt.type = opt.dataType || 'json';
    opt = {
        cache: 'false',
        ...opt
    };
    opt.success = (result)=> {
        // setTimeout(()=>{

            if(this && this.isMounted) {
                if(this.isMounted()) {
                    call_succ && call_succ.call(this, result);
                }
            } else {
                call_succ && call_succ.call(this, result);
            }
        // },10000);
    };
    reqwest(opt);
}
