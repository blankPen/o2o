import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import Img from 'common/Img';
import History from 'common/History';
import { message } from 'antd';
import { searchAutoComplete } from 'actions/SearchAction';


function mapStateToProps({ searchState }) {
    return {
        autoCompleteData: searchState.completeData
    };
}

export class Header extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            activeIndex: 0
        }
    }
    handleSearchChange=(e)=>{
        let value = e.target.value;
        this.setState({
            searchValue: value
        });
        this.props.dispatch(searchAutoComplete(value));
    }
    keyDown=(e)=>{
        let result = this.props.autoCompleteData;
        let index = this.state.activeIndex;
        switch(e.keyCode){
            case 13:
                if(index == 0){
                    return this.toSearch();
                }else{
                    this.handleSelect(result[index-1]);
                }
            case 38:
                index--;
                break;
            case 40:
                index++;
                break;
        }
        index = index > result.length ? 0 : index;
        index = index < 0 ? result.length : index;
        this.setState({
            activeIndex: index
        });
    }
    handleSelect(data){
        this.setState({
            searchValue: ''
        });
        this.props.dispatch(searchAutoComplete(null));
        History.push(`/detail/${data.storeId}`);
    }
    toSearch=()=>{
        let value = this.state.searchValue;
        if(value){
            History.push(`/search?keyword=${value}`);
            this.setState({
                searchValue: ''
            });
            this.props.dispatch(searchAutoComplete(null));
        }else{
            message.warn('请输入商家名称');
        }
    }
    renderSearch(){
        let result = this.props.autoCompleteData;
        const children = result.map((item,i) => {
            let className = 'search-input-item';
            className+=(this.state.activeIndex==i+1)?' active':'';
            return (
                <div className={className} key={i}
                    onClick={this.handleSelect.bind(this,item)}>
                    <Img src={item.storeLogo} />
                    <div className='text'>
                        {item.storeName}
                        <span className="other">{item.distance}km</span>
                    </div>
                </div>
            );
        });
        return (
            <div className="search-bar">
                <div className="search-content">
                    <i className='fa fa-search search-icon'></i>
                    <div className="search-wrap">
                        <input
                            type="text"
                            className='search-input'
                            placeholder='搜索商家'
                            value={this.state.searchValue}
                            onChange={this.handleSearchChange}
                            onKeyDown={this.keyDown}
                        />
                        {!!children.length &&
                            <div className="search-auto-complete">
                                {children}
                            </div>
                        }
                    </div>
                    <button type='button' className='search-btn' onClick={this.toSearch}>
                        搜索
                    </button>
                </div>
            </div>
        );
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
                        <a href='http://testo2o.leimingtech.com/leimingtech-seller/' className='menu-item'>
                            商家入驻
                        </a>
                    </div>
                    {this.renderSearch()}
                </div>
            </header>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Header)
