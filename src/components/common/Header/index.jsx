import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';

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
                    <Link to='/' className='left-logo'>
                        <img 
                            src="http://waimai.meituan.com/static/img/logos/normal-new2.png" 
                            alt="商标"
                        />
                    </Link>
                    <div className="menu">
                        <Link to='/' className='menu-item'>
                            首页
                        </Link>
                        <span>|</span>
                        <Link to='/' className='menu-item'>
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
