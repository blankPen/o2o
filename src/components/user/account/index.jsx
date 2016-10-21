'use strict';
import React from 'react';
import './index.less';

import {
    connect
} from 'react-redux';
import {
  Link
} from 'react-router';
import { Collapse } from 'antd';
import { Timeline, Icon } from 'antd';
import ListView from 'components/common/ListView';
function mapStateToProps(state) {
    return {

    };
}
export class Account extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        
        return(
            <div className="accountlist ">
                <ul className="clearfix">
                    <li>
                        <Link to={"/#"} className="account">
                            <div className="image">
                                <img src="http://a3.qpic.cn/psb?/V13YrEcN1YFUK0/*.1UjqCMWAE6EU0tiI3elUWyzbIZxStNmnh60Nqbptk!/m/dLIAAAAAAAAAnull&bo=bAQgA2wEIAMFCSo!&rf=photolist&t=5" alt=""/>
                            </div>

                        </Link>
                    </li>
                </ul>
                
            </div>
            );
    }
}

export default connect(
    mapStateToProps
)(Account)