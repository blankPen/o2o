'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Select,Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';

import BaiduMap from 'common/BaiduMap';
import Img from 'common/Img';
import * as actions from 'actions/OrderAction';
import Dialog from 'components/common/Dialog';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function mapStateToProps({
    orderState
}) {
    return {
         ...orderState
    };
}

export class OrderPreview extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state={
            show_address_dialog: true,
            orderInfo:{
                message:'11111',
                invoice:'21312313',
                pay_way:"D", //D：餐到付款 Z：在线付款
                send_time:"14:00"
            }
        }
    }

    componentWillMount(){
        // let store_id=this.props.params&&this.props.params.store_id;
        // this.props.dispatch(actions.getOrderInfo({store_id},(res)=>{

        // }));
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    addAddress=(values,callback)=>{
        console.log("添加地址成功",values);
        callback();
    }
    toggleAddressDialog=(address)=>{
        this.setState({
            show_address_dialog:!this.state.show_address_dialog
        });
    }

    renderAddressDialog=()=>{
        return(
            <Dialog
                visible={this.state.show_address_dialog}
                onCancel={this.toggleAddressDialog}
                title="添加新地址"
            >
                <AddressForm
                    data={{}}
                    onSubmit={this.addAddress}
                    onCancel={this.toggleAddressDialog}/>
            </Dialog>
        )
    }
    render(){
        let goodsList = this.props.goodsList ||[];
        let extraFeeList = this.props.extraFeeList ||[];
        let store = this.props.store||{};
        let address = this.props.address||{};
        let afterPayClass = "after-pay btn"+(this.state.orderInfo.pay_way=="D"?' btn-select':'');
        let inLinePayClass = "inline-pay btn"+(this.state.orderInfo.pay_way=="Z"?' btn-select':'');

        return(
            <div className="preview-body">
                <div className="breadcrumb">{store.storeName} >
                    <span> 确认购买</span>
                </div>
                {this.renderAddressDialog()}
                <div className="preview-content">
                    <div className="content-left">
                        <div className="goods-info">
                            <div className="info-item head">
                                <div className="left-info">菜品</div>
                                <div className="right-price">价格/份数</div>
                            </div>
                            {goodsList.map((item,i)=>{
                                return (
                                     <div className="info-item">
                                        <div className="left-info">{item.goodsName}</div>
                                        <div className="right-price">
                                            {`¥${item.goodsPrice}*${item.goodsNum}`}
                                        </div>
                                    </div>
                                )
                            })}

                            {extraFeeList.map((item,i)=>{
                                return (
                                     <div className="info-item">
                                        <div className="left-info">{item.chargName}</div>
                                        <div className="right-price">
                                            {`¥${item.amount}`}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="info-item total">
                                <div className="left-info">合计</div>
                                <div className="right-price">{`¥${this.props.totalPrice||0}`}</div>
                            </div>
                        </div>
                        <div className="info-footer">
                            <div className="operation">
                                <div className="operation-label">
                                    优惠券：
                                </div>
                                <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange}>
                                  <Option value="jack">Jack</Option>
                                  <Option value="lucy">Lucy</Option>
                                  <Option value="disabled" disabled>Disabled</Option>
                                  <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="footer-img">
                            <Img src='./order-bot-bg1.png'></Img>
                        </div>
                    </div>
                    <div className="content-right">
                        <div className="address-info">
                            <div className="top-box">
                                <div className="title">
                                    <div className="address-label">请选择您的收餐地址</div>
                                    <div className="add-address" onClick={this.toggleAddressDialog}>
                                        <i className="fa fa-plus"></i>
                                        添加新地址
                                    </div>
                                </div>
                                <div className="select-address">
                                    <div className="address-box">
                                        <div className="member-top">
                                            <span className="member-name">{address.trueName}</span>
                                            <span className="member-sex">
                                                {address.sex=='0'?'先生：':'女生：'}
                                            </span>
                                            <span className="member-phone">
                                                {address.mobPhone}
                                            </span>
                                            <span className="operation-box">
                                                <span
                                                    onClick={()=>this.toggleAddressDialog(address)}
                                                >
                                                    修改
                                                </span>
                                                <span>删除</span>
                                            </span>
                                        </div>
                                        <div className="address-bottom">
                                            <span className="address-area">
                                                {address.areaInfo}
                                            </span>
                                            <span className="address-line">
                                                {address.address}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="message">
                                    <span className="message-label">
                                        给商家留言：
                                    </span>
                                    <div className="message-box">
                                        <input
                                            className="message-input"
                                            type="text"
                                            onChange={(e)=>this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            message:e.target.value
                                                        }
                                                    })
                                                }
                                            value={this.state.orderInfo.message}
                                            placeholder="不要辣，多放盐等口味要求" />
                                    </div>
                                </div>
                                <div className="message">
                                    <span className="message-label">
                                        发票信息：
                                    </span>
                                    <div className="message-box">
                                        <input
                                            className="message-input"
                                            value={this.state.orderInfo.invoice}
                                            onChange={(e)=>this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            invoice:e.target.value
                                                        }
                                                    })
                                                }
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="pay-way">
                                    <span className="pay-way-label">付款方式：</span>
                                    <div className="choose-way">
                                        <button
                                            className={afterPayClass}
                                            onClick={()=>{
                                                    this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            pay_way:"D"
                                                        }
                                                    });
                                                 }
                                            }
                                            type='button'
                                        >
                                            餐到付款
                                        </button>
                                        <button
                                            className={inLinePayClass}
                                            type='button'
                                            onClick={()=>{
                                                    this.setState({
                                                        orderInfo:{
                                                            ...this.state.orderInfo,
                                                            pay_way:"Z"
                                                        }
                                                    });
                                                 }
                                            }
                                        >
                                            在线支付
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div className="preorder-time">
                            <span>期望送出时间：</span>
                            <Select defaultValue="now" style={{ width: 92 }} onChange={this.handleChange}>
                                  <Option value="now">立即送出</Option>
                                  <Option value="14:00">14:00</Option>
                                  <Option value="14:20">14:20</Option>
                            </Select>
                        </div>
                        <div className="order-info clearfix">
                            <div className="need-pay">
                                您需要支付<span className="need-price">￥117</span>
                            </div>
                            <div className="app-download">
                                <div className="download-label">
                                    使用App下单享更多优惠
                                </div>
                                <div className="to-download">
                                    <i className="fa fa-mobile-phone"></i>
                                    去下载
                                </div>
                            </div>
                            <div className="to-pay">
                                去付款
                            </div>
                            <div className="send-by">
                                * 由 美团专送 提供专业高品质送餐服务
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function noop(){};
export class AddressForm extends React.Component {
    static propTypes = {
        data: React.PropTypes.object,
    };
    static defaultProps = {
        onSubmit: noop,
        onCancel: noop,
        data: {
            addressId: undefined,
            longitude : 0,
            latitude : 0,
            trueName : '',
            sex : '1',
            mobPhone : '',
            address : '',
            areaInfo : '',
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        this.createAddressControl();
    }
    createAddressControl(){
        const { setFieldsValue } = this.props.form;
        let setAddress = (value,item,point)=>{
            setFieldsValue({
                address: value,
                longitude: point.lng,
                latitude: point.lat
            })
        }
        BaiduMap.init(null,()=>{
            createAutocomplete({
                id: 'search-input',
                onhighlight: setAddress,
                onconfirm: setAddress
            })
        });
    }
    checkPhone = (rule, value, callback) => {
        const {
            validateFields
        } = this.props.form;
        if (value) {
            if(!(/^1[34578]\d{9}$/.test(value))){
                callback([new Error('请输入正确的手机号码。')]);
            }
        }
        callback();
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            this.setState({
                loading: true
            });
            console.log('Submit!!!');
            this.props.onSubmit(values,(res)=>{
                this.setState({
                    loading: false
                });
            });
        });
    }
    handleCancel=()=>{
        this.setState({
            loading: false
        });
        this.props.onCancel && this.props.onCancel();
    }
    validateHelp(name){
        const { getFieldError, isFieldValidating } = this.props.form;
        return isFieldValidating(name) ? '验证中...' : (getFieldError(name) || []).join(', ');
    }
    getFieldDecorator=(name,opt)=>{
        const data = {
            ...AddressForm.defaultProps.data,
            ...this.props.data,
        };
        const { getFieldDecorator } = this.props.form;
        return getFieldDecorator(name,{
            ...opt,
            initialValue: data[name],
        });
    }
    render() {
        const formItemLayout = {labelCol: {span: 4 }, wrapperCol: {span: 18 }, };
        const getFieldDecorator = this.getFieldDecorator;
        return (
            <Form className='address-form' horizontal onSubmit={this.handleSubmit}>
                {getFieldDecorator('addressId')(<Input type='hidden' />)}
                {getFieldDecorator('longitude')(<Input type='hidden' />)}
                {getFieldDecorator('latitude')(<Input type='hidden' />)}
                <FormItem
                    {...formItemLayout}
                    label="联系人"
                    hasFeedback
                    help={this.validateHelp('trueName')}
                >
                {getFieldDecorator('trueName', {
                    rules: [{ required: true, message: '姓名不能为空' },],
                })(
                    <Input placeholder="请输入姓名" />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                >
                {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '请选择性别' }],
                })(
                    <RadioGroup>
                        <Radio value="1">先生</Radio>
                        <Radio value="0">女士</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                    hasFeedback
                    help={this.validateHelp('mobPhone')}
                >
                {getFieldDecorator('mobPhone', {
                    rules: [
                        { required: true, message: '手机号码不能为空' },
                        { validator: this.checkPhone },
                    ],
                })(
                    <Input placeholder="请输11位手机号" />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    className='item-address'
                    label="收餐地址"
                    help='请输入地址，并在下拉框中选择'
                >
                {getFieldDecorator('address', {
                    rules: [{ required: true }, ],
                })(
                    <Input type='hidden' />
                )}
                <input id='search-input' placeholder="学校/校区/街道" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="详细地址"
                >
                {getFieldDecorator('areaInfo', {
                    rules: [{ required: true, message: '请输入详细地址' }],
                })(
                    <Input placeholder="你可以填楼牌号，宿舍楼等信息" />
                )}
                </FormItem>
                <div className='btn-box' >
                    <Button loading={this.state.loading} className='btn-save' htmlType="submit">
                        保存
                    </Button>
                    <Button className='btn-cancel' type="button" onClick={this.handleCancel}>
                        取消
                    </Button>
                </div>
            </Form>
        );
    }
}

AddressForm = Form.create()(AddressForm);
export default connect(
    mapStateToProps,
)(OrderPreview)



function createAutocomplete({id, onhighlight, onconfirm }){
    if(!BMap) return;
    var ac = new BMap.Autocomplete({
        "input": id,
    });
    var myGeo = new BMap.Geocoder();

    function getPiont(value,item,callback){
        myGeo.getPoint(value, function(point){
            callback && callback(value,item,point);
        }, item.city);
    }

    ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
        var value = "";
        if (e.toitem.index > -1) {
            var _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
            getPiont(value,_value,onhighlight);
        }
    });
    ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
        var value = "";
        if (e.item.index > -1) {
            var _value = e.item.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
            getPiont(value,_value,onconfirm);
        }
    });
    return ac;
}
