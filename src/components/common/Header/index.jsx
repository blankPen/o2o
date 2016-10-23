import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import Img from 'common/Img';

function mapStateToProps(state) {
    return {

    };
}

export class Header extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <div className="header-content">
                    {/*<div className="sign_logo">
                        <a href='/#/'>
                          <Img alt="雷铭O2O" src="logo.png" className="sign_img" />
                        </a>
                   </div>*/}
                    <Link to='/' className='left-logo'>
                        <Img alt="雷铭O2O" src="logo.png" className="sign_img"/>
                    </Link>
                    <div className="menu">
                        <Link to='/' className='menu-item'>
                            首页
                        </Link>
                        <span>|</span>
                        <Link to='/order' className='menu-item'>
                            我的外卖
                        </Link>
                        <span>|</span>
                        <Link to='/' className='menu-item'>
                            加盟合作
                        </Link>
                    </div>
                    <div className="search-bar">
                        <div className="search-content">
                            <i className='fa fa-search search-icon'></i>
                            <input className='search-input'type="text" placeholder='搜索商家，美食'/>
                            <button type ='button' className='search-btn'>搜索</button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Header)
