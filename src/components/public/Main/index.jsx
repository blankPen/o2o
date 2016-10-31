'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { toggleLoginDialog } from 'actions/SignPageAction';
import Dialog from 'components/common/Dialog';
import TopNav from 'components/common/TopNav';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Elevator from 'components/common/Elevator';
import LoginSingle from 'components/SignPage/LoginSingle/';
function mapStateToProps({ common }) {
    return {
        showLogin: common.show_login_dialog,
        userInfo: common.userInfo
    };
}

export class Main extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    closeLogin=()=>{
        this.props.dispatch(toggleLoginDialog(false));
    }
    render() {
        return (
            <div className='application'>
                <Elevator userInfo={this.props.userInfo}/>
                { !this.props.userInfo &&
                    <Dialog
                        title='请登录雷铭账号'
                        className='dialog-login'
                        width={400}
                        visible={this.props.showLogin}
                        onCancel={this.closeLogin}
                    >
                        <LoginSingle redirect={false}/>
                    </Dialog>
                }
                <TopNav/>
                <Header/>
                <div className="page-wrap">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Main)
