'use strict';
import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    connect
} from 'react-redux';
import History from 'common/History';
import Img from 'common/Img';
import * as DomUtils from 'common/utils/dom';
import * as actions from 'actions/DetailAction';
import { message,Tooltip ,Tabs,Radio,Checkbox,Affix,Pagination} from 'antd';
import Rate from 'components/common/Rate/'
import CartBox from 'components/Detail/CartBox/';
import Loading from 'components/common/Loading/'
const moment = require('moment');


const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

let positionMap = {};
function saveTarget(id,e){
    positionMap[id] = e.target;
}
function getPosition(id){
    let el = positionMap[id];
    if(el){
        let scroll = DomUtils.getScroll();
        let offset = DomUtils.getOffset(el);
        return {
            x: offset.left - scroll.left,
            y: offset.top - scroll.top
        }
    }
}
function mapStateToProps({
    detailState,
    common
}) {
    return {
         ...detailState,
         userInfo: common.userInfo || {}
    };
}

export class Detail extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        let memberId = this.props.userInfo.memberId;
        let storeId = this.props.params.storeId;
        let data = actions.getCartList(storeId,memberId);
        this.state = {
            inCartItems: data || {},
            is_show_category:true,
            show_loading:true
        }
    }
    componentWillMount=()=>{
        this.now = moment().format('YYYY-MM-DD HH:mm:ss');
        let memberId = this.props.userInfo.memberId;
        let storeId = this.props.params.storeId;
        this.props.dispatch(actions.getStoreDetail({
            storeId,
            memberId,
        }));
        this.props.dispatch(actions.getClassAndGoodsList({storeId},()=>{
            this.setState({
                show_loading:false
            })
        }));
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.params.storeId != this.props.params.storeId ||
            nextProps.userInfo.memberId != this.props.userInfo.memberId){
            let memberId = nextProps.userInfo.memberId;
            let storeId = nextProps.params.storeId;
            this.props.dispatch(actions.getClassAndGoodsList({storeId}));
            this.props.dispatch(actions.getStoreDetail({
                storeId,
                memberId,
            }));
        }
    }
    tabsChange = (key)=>{ //切换Tab
        let storeId = this.props.params.storeId;
        this.setState({
            is_show_category:key==1?true:false
        });
        if(key==2){
            this.props.dispatch(actions.getStoreEvaluatList({storeId:storeId}));
        }
    }
    menuClick = (key)=>{    //菜单点击事件
        let el = ReactDOM.findDOMNode(this.refs[key]);
        if(el){
            let offset = DomUtils.getOffset(el).top;
            DomUtils.scrollTo(offset);
        }
    }
    saveCartList=()=>{ //保存购物车
        let memberId = this.props.userInfo.memberId;
        let storeId = this.props.params.storeId;
        let data = this.state.inCartItems;
        this.props.dispatch(actions.saveCartList(storeId,memberId,data));
    }
    handleAddCart=(data)=>{ //加入购物车
        let newItems = {...this.state.inCartItems};
        let goods = newItems[data.goodsId];
        goods = goods ? {
            num: (goods.num || 0)+1,
            data: data,
        } : {
            num: 1,
            data: data,
        };
        newItems[data.goodsId] = goods;
        this.setState({
            inCartItems: newItems
        },this.saveCartList);
        this.refs.cartBox && this.refs.cartBox.triggerAnim(getPosition(data.goodsId));
    }
    toggleCollect=(flag)=>{ //收藏
        let storeId = this.props.params.storeId;
        this.props.dispatch(actions.collectStore(storeId,flag));
    }
    handleChangeCart=(value,addId)=>{ //改变购物车
        this.setState({
            inCartItems: value
        },this.saveCartList);
        this.refs.cartBox && this.refs.cartBox.triggerAnim(getPosition(addId));
    }
    toOrderPreview=()=>{    //去订单预览页
        let memberId = this.props.userInfo.memberId;
        let storeId = this.props.params.storeId;
        this.props.dispatch(actions.clearCart(storeId,memberId));
        if(_.isEqual(this.state.inCartItems, {})){
            message.warn('请选择要购买的商品');
        }else{
            History.push({
                pathname: '/order_preview',
                state: {
                   data: this.state.inCartItems,
                   storeId: storeId
                }
            });
        }

    }
    renderTooltipTitle=(type,level,num1,num2)=>{ 
        if(type=='time'){
            return(
                <div>
                    <div className="top-text">
                        餐厅大约在<span>{num1}</span>分钟之内将美食送达
                    </div>
                    <div className="contrast">
                        <i className="fa fa-arrow-up"></i>
                        {level?'快于':'慢于'}周边<span>{num2}</span>%的餐厅
                    </div>
                </div>
            )
        }else if(type=='promptness'){
            return(
                <div>
                    <div className="top-text">
                        <span>{num1}</span>的订单会在45分钟内送达
                    </div>
                    <div className="contrast">
                        <i className="fa fa-arrow-up"></i>
                        {level?'高于':'低于'}周边<span>{num2}</span>%的餐厅
                    </div>
                </div>
            )
        }
    }

    renderAdtiudeTab=()=>{
        let data = this.props.storeDetail ||{};
        if(data.businessLicense||data.foodLicence){
            return(
                <TabPane tab="餐厅资质" key="3">
                    <div className="aptitude">
                        {
                            data.businessLicense?
                            (<div className="aptitude-item">
                                <div className="aptitude-title">营业执照</div>
                                <Img
                                    isShow={true}
                                    src={data.businessLicense}
                                />
                            </div>):
                            undefined
                        }
                        {
                            data.foodLicence?
                            (<div className="aptitude-item">
                                <div className="aptitude-title">餐饮服务许可证</div>
                                <Img
                                    isShow={true}
                                    src={data.foodLicence}
                                />
                            </div>):undefined
                        }
                    </div>
                </TabPane>
            )
        }
    }
    render() {
        let data = this.props.storeDetail ||{};
        let categoryList = [];

        let isOpen = data.isOpen == 1;
        if(isOpen){
            // 24小时营业
            if(!data.startBusinessTime || !data.endBusinessTime){
                isOpen = true;
            }else{
                let beginTime = new Date(moment(this.now).format(`YYYY-MM-DD ${data.startBusinessTime}:00`)).getTime(),
                    endTime = new Date(moment(this.now).format(`YYYY-MM-DD ${data.endBusinessTime}:00`)).getTime();
                // 判断是否在营业中
                isOpen = Date.now() >= beginTime && Date.now() <= endTime;
            }
        }
        let classList = this.props.classAndGoodsList.map((item,i)=>{
            categoryList.push(
                <Category
                    key={i}
                    ref={'menu_'+i}
                    data={item.goodsList}
                    title={item.stcName}
                    inCartItems={this.state.inCartItems}
                    onAdd={this.handleAddCart}
                    isOpen={isOpen}
                />
            );
            return(
                <div
                    key={i}
                    className="menu-item"
                    onClick={this.menuClick.bind(this,'menu_'+i)}
                >
                    {item.stcName}
                </div>
            );
        });
        return (
            <Loading isLoading={this.state.show_loading} >
                <div className="detail-body">
                    <CartBox
                        ref='cartBox'
                        isOpen={isOpen}
                        startPrice={data.startPrice}
                        data={this.state.inCartItems}
                        onChange={this.handleChangeCart}
                        onSubmit={this.toOrderPreview}
                    />
                   <div className="business-top">
                        <div className="content-box">
                            <div className="left-box">
                                <Img className="business-logo" src={data.storeLogo} />
                                <div className="business-box">
                                    <div className="business-name">
                                        {data.storeName}
                                        <i className="fa fa-caret-down hide"></i>
                                    </div>
                                    <Rate value={data.storeScore} disabled /> {data.storeScore}
                                    <div className="option">
                                        <span>{data.startPrice+'元起送'}</span>
                                        <span>{data.expressFee+'元配送费'}</span>
                                        <span>{data.shippingMethod=='1'?'由平台配送':'由商家配送'}</span>
                                    </div>
                                </div>
                                <div className="buttom-info">
                                    <div>{'商家地址：'+data.storeAddress}</div>
                                   {data.storeTels?
                                        (<div>{'商家电话：'+data.storeTels}</div>):undefined} 
                                    <div>
                                        营业时间：{
                                            data.startBusinessTime && data.endBusinessTime ?
                                            data.startBusinessTime+'-'+data.endBusinessTime
                                            : '24小时营业'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-box">
                            <div className="rate-box">
                                <div className="rate"><span>{data.storeScore}</span>分</div>
                                <div className="rate-text">商家评分</div>
                            </div>
                            <div className="commas"></div>
                            <Tooltip
                                title={this.renderTooltipTitle('time',true,36,21)}
                                placement="bottom"
                            >
                                <div className="rate-box">
                                    <div className="rate">
                                        <span>{data.storeDeliverycredit||0}</span>分钟
                                    </div>
                                    <i className="fa fa-caret-down turn"></i>
                                    <div className="rate-text">平均送餐时间</div>
                                </div>
                            </Tooltip>
                            <div className="commas"></div>
                            <Tooltip
                                title={this.renderTooltipTitle('promptness',true,91,36)}
                                placement="bottom"
                            >
                                <div className="rate-box">
                                    <div className="rate"><span>91</span>%</div>
                                    <i className="fa fa-caret-down turn"></i>
                                    <div className="rate-text">及时送餐率</div>
                                </div>
                            </Tooltip>
                        </div>
                        <div className="fold-3d"></div>
                        <div className="collection">
                            {/*
                                data.isStoreCollect>1?
                                    <i className="fa fa-heart is-conllect"></i>:
                                    <i className="fa fa-heart-o"></i>
                            */}
                            <i onClick={this.toggleCollect.bind(this,!data.isStoreCollect)}
                                className={`fa ${!!data.isStoreCollect?'fa-heart is-conllect':'fa-heart-o'}`}></i>
                            <span>{!!data.isStoreCollect?'已收藏':'收藏'}</span>
                            <div className="collection-num">{data.storeCollect}</div>
                        </div>
                   </div>
                   <div className="business-content">
                        <div className="content-left">
                            <div className="cate-tab">
                             <Tabs defaultActiveKey="1" onChange={this.tabsChange}>
                                 <TabPane tab="菜单" key="1">
                                    {classList}

                                 </TabPane>
                                 <TabPane tab="评价" key="2">
                                    <RatedBox
                                        storeId={this.props.params.storeId}
                                        dispatch={this.props.dispatch}
                                        evaluatList={this.props.evaluatList}
                                        >
                                    </RatedBox>
                                 </TabPane>
                                 {this.renderAdtiudeTab()}
                             </Tabs>
                            </div>
                            {this.state.is_show_category?categoryList:undefined}
                        </div>
                        <div className="content-right">
                            {
                                data.sellerNotify?
                                (<div className="notice-top">
                                    <div className="notice-title">订餐必读&商家公告</div>
                                    <div className="notice-content">{data.sellerNotify}</div>
                                </div>):
                                undefined
                            }
                            <Affix>
                                <StoreNotice data={this.props.storeDetail}></StoreNotice>
                            </Affix>
                        </div>
                   </div>
                </div>
            </Loading>

        );
    }
}


/**
 * 评价
 */
export class RatedBox extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            rateSearchData:{
                gevalType:0,
                isHaveContent:0,
                pageNo:1,
                pageSize:15
            }
        }
    }

    filterChange=(e)=>{
        this.setState({
            rateSearchData:{
                ...this.state.rateSearchData,
                gevalType:e.target.value
            }
        },()=>{
            this.loadRate();
        });
    }

    componentWillMount(){
        this.loadRate();
    }

    loadRate=()=>{
        this.props.dispatch(
            actions.getStoreEvaluatList(
                {storeId:this.props.storeId,search:this.state.rateSearchData}));
    }

    handleCheck = (e)=>{
        this.setState({
            rateSearchData:{
                ...this.state.rateSearchData,
                isHaveContent:e.target.checked?1:0
            }
        },()=>{
            this.loadRate();
        });

    }

    pageChange =(page)=>{
        this.setState({
            rateSearchData:{
                ...this.state.rateSearchData,
                pageNo:page
            }
        },()=>{
            this.loadRate();
        });
    }

    renderRateContent=()=>{
        let data = this.props.evaluatList&&this.props.evaluatList.shopEvaluateTagSave||{};
        let list = this.props.evaluatList&&this.props.evaluatList.evaluateGoodList||[];
        if(list.length>0){
            return(
                <div className="content-box">
                    {list.map((item,i)=>{
                        return(
                            <RateItem key={i} data={item}></RateItem>
                        )
                    })}
                    <div className="pagination-bar">
                        <Pagination
                            defaultCurrent={1}
                            total={data.allReview}
                            onChange={this.pageChange}
                            pageSize={15}
                        />
                    </div>
                </div>
            )
        }else{
            return(
                <div className="content-box">
                    <div className="no-content">
                        暂无评价内容
                    </div>
                </div>
            )
        }

    }

    render(){
        let data = this.props.evaluatList&&this.props.evaluatList.shopEvaluateTagSave||{};
        let list = this.props.evaluatList&&this.props.evaluatList.evaluateGoodList||[];
        let greatReview = data.allReview - data.mediumReview - data.badReview;
        return(
            <div className="rated-box">
                <div className="rate-filter">
                    <div className="filter-item">
                        <RadioGroup onChange={this.filterChange}
                            value={this.state.rateSearchData.gevalType}
                        >
                            <Radio key="a" value={0}>
                                全部评价<span>{`(${data.allReview||0})`}</span>
                            </Radio>
                            <Radio key="b" value={1}>
                                好评
                                <span>{`(${greatReview||0})`}</span>
                            </Radio>
                            <Radio key="c" value={2}>
                                中评<span>{`(${data.mediumReview||0})`}</span>
                            </Radio>
                            <Radio key="d" value={3}>
                                差评<span>{`(${data.badReview||0})`}</span>
                            </Radio>
                        </RadioGroup>
                        <div className="have-content">
                            <Checkbox onChange={this.handleCheck}>有内容的评价</Checkbox>
                        </div>
                    </div>
                </div>
                {this.renderRateContent()}
            </div>
        )
    }
}

/**
 * 评价Item
 */
export class RateItem extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

    }

    render(){
        let data = this.props.data||{};
        let feelText = data.gevalScore>4.5?'好评':data.gevalScore>2?'中评':'差评';
        return(
            <div className="rate-item">
                <div className="rate-info">
                    <span className="user-name">{data.gevalFrommembername}</span>
                    <span className="all-rate">总体评价:</span>
                    <Rate value={data.gevalScore} disabled />
                    <span className="feel">{feelText}</span>
                    <span className="rate-time">
                        评价时间
                        <span>{moment(data.gevalAddTime).format('YYYY-MM-DD')}</span>
                    </span>
                </div>
                <div className="user-reply">
                    {data.gevalContent}
                </div>
            </div>
        )
    }
}

/**
 * 菜单列表
 */
export class Category extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

    }
    componentWillMount(){

    }
    render(){
        var inCartItems = this.props.inCartItems;
        return(
            <div className="category">
                <div className="category-title">
                    <div className="tag-name">{this.props.title}</div>
                    {this.props.showFilter &&
                        <CategoryFilter title=''></CategoryFilter>}
                </div>
                <div className="category-content clearfix">
                    { this.props.data.map((item,i)=>{
                        let goods = inCartItems[item.goodsId];
                        return <CategoryItem
                            key={i}
                            data={item}
                            inCartNum={goods && goods.num}
                            onAdd={this.props.onAdd}
                            isOpen={this.props.isOpen}
                        />
                    })}
                </div>
            </div>
        )
    }
}

/**
 * 菜单Item
 */
export class CategoryItem extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
        onAdd: React.PropTypes.func
    };
    static defaultProps = {
        onAdd: function(){}
    };
    constructor(props) {
        super(props);
    }
    onAdd=(e)=>{
        let {data} = this.props;
        saveTarget(data.goodsId,e);
        this.props.onAdd(data);
    }
    render(){
        let {data} = this.props;
        return(
            <div className="category-box">
                <div className="avatar">
                    <Img className='category-img'
                     src={data.goodsImage} />
                    {/*<div className="description">    销量冠军，招牌馅料，汁多味美，食指大动。豆角具有益气生津功效。
                    </div>*/}
                </div>
                <div className="categroy-name">{data.goodsName}</div>
                <div className="sale-info clearfix">
                    <div className="sold-count">{`月售${data.goodsMonSales||0}份`}</div>
                    <div className="zan-count">
                        <i className="fa fa-fw fa-thumbs-up"></i>
                       ({data.praise})
                    </div>
                </div>
                <div className="labels clearfix">
                    <div className="price">{'￥'+data.goodsStorePrice+data.unitName}</div>
                    {this.props.isOpen?
                        <div className="add" onClick={this.onAdd}>
                            <i className="fa fa-plus"></i>
                        </div> :
                        <div className="rest">休息中</div>}
                    {this.props.isOpen && !!this.props.inCartNum &&
                        <div className="add-num">{this.props.inCartNum}</div>}
                </div>
            </div>
        )
    }
}

export class StoreNotice extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render(){
        let {data={}} = this.props;
        let tagList = data.tagList||[];
        return(
            <div className="notice-box">

                <div className="notice-info">
                    <div className="start-price">
                        {`起送价：${data.startPrice}元`}
                    </div>
                    <div className="send-price">
                       {`配送费：${data.expressFee}元`}
                    </div>
                    {tagList.map((item,i)=>{
                        return(
                            <div className="info-detail" key={i}>
                                <Img src={item.tagIcon}></Img>
                                {item.alias}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default connect(
    mapStateToProps,
)(Detail)
