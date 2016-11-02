/*
 * @Author: pengzhen
 * @Date:   2016-10-17 20:24:06
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-02 21:51:54
 */

'use strict';
import './index.less';
import React from 'react';
import Img from 'common/Img';
import {
    connect
} from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

export class Footer extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className='footer'>
                <div className="copyright" >
                    <p className="one_line">
                        ©<span title="">2016</span>
                        <a href="http://www.leimingtech.com/">雷铭官网</a>
                             www.leimingtech.com
                        <a href="http://www.beianbeian.com/beianxinxi/283f39a9-4c00-427a-97ef-3c7a9e1e0af1.html" target="_blank">京ICP证070791号</a> |
                        <a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备10211739号</a> |
                        <a href="http://www.leimingtech.com" target="_blank"> 电子公告服务规则</a>
                    </p>
                    <div className="two_line">
                        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502025545" >
                            <Img src="1.png"/>
                            <p>京公网安备11010502025545号</p>
                        </a>
                    </div>
                </div>
                {/*<ul className="cert cf">
                    <li className="cert__item"><a className="sp-ft sp-ft--record" title="备案信息" href="http://www.meituan.com/about/openinfo" target="_blank">备案信息</a></li>
                    <li className="cert__item"><a className="idinfo-zhejiang gongshang-logo-zj" href="http://122.224.75.236/wzba/login.do?method=hdurl&amp;doamin=http://hz.meituan.com/&amp;id=330106000216288&amp;SHID=1223.0AFF_NAME=com.rouger.gs.main.UserInfoAff&amp;AFF_ACTION=qyhzdetail&amp;PAGE_URL=ShowDetail" title="浙江省工商局营业执照网上标识" target="_blank">浙江省工商局营业执照网上标识</a></li>
                    <li className="cert__item"><a className="sp-ft sp-ft--knet" href="http://t.knet.cn/index_new.jsp" target="_blank" title="可信网站认证" rel="nofollow">可信网站</a></li>
                    <li className="cert__item"><a className="sp-ft sp-ft--12315" href="http://www.bj315.org/xfwq/lstd/201209/t20120910_3344.shtml?dnrpluojqxbceiqq" target="_blank" title="12315消费争议" rel="nofollow">12315消费争议</a></li>
                </ul>*/}
            </footer>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Footer)
