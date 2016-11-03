/*
 * @Author: pengzhen
 * @Date:   2016-10-25 17:19:49
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-03 19:38:28
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Form, Input, Button, Radio} from 'antd';
import BaiduMap from 'common/BaiduMap';
import { updateAddress } from 'actions/AddressAction'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function mapStateToProps({common}) {
    return {
        userInfo: common.userInfo
    };
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
            trueName : undefined,
            sex : '1',
            mobPhone : undefined,
            address : undefined,
            areaInfo : undefined,
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
        let memberId = this.props.userInfo && this.props.userInfo.memberId;
        if(memberId){
            this.props.form.validateFieldsAndScroll((errors, values) => {
                if (errors) {
                    return;
                }
                this.setState({
                    loading: true
                });
                values.memberId = memberId;
                this.props.dispatch(updateAddress(values,(res)=>{
                    this.setState({
                        loading: false
                    });
                    this.props.onSubmit(res);
                }));
            });
        }
    }
    handleCancel=()=>{
        this.setState({
            loading: false
        });
        this.props.form.resetFields();
        this.props.onCancel();
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
                    label="收餐地址"
                    help='请输入地址，并在下拉框中选择'
                >
                {getFieldDecorator('address', {
                    rules: [{ required: true }, ],
                })(
                    <Input type='hidden' />
                )}
                <input id='search-input'
                    placeholder="学校/校区/街道" />
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
    // Implement map dispatch to props
)(AddressForm)



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
