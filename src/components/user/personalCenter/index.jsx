/*
 * @Author: MoCheng
 */
'use strict';
import React from 'react';
import './index.less';
import {
    connect
} from 'react-redux';
import Img from 'common/Img';
import {
  Form,
  Button,
  Input,
  Icon,
  Checkbox,
  message,
  Modal,
  Upload
} from 'antd';
import {
    getMemberDetail
} from 'actions/SignPageAction';
import {getRealPath} from 'common/Img'
import {
  Link
} from 'react-router';
import Dialog from 'components/common/Dialog';

const FormItem = Form.Item;
const createForm = Form.create;
const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 12
  },
}

function mapStateToProps({
    common
}){
    return {
        userInfo: common.userInfo
    };
}

let index= class extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = this.resetState(props.userInfo);
    }

    handleChange = (info) => {
        const userInfo = this.props.userInfo || {};
        if (info.file.status === 'done') {
            let file = info.file;
            if(file.response.result==1){
                message.success(`${info.file.name} 上传成功。`);
                this.props.dispatch(getMemberDetail({
                    "memberId": userInfo.memberId
                }));
            }else{
                message.error(`${info.file.name} 上传失败。`);
            }
        } else if (info.file.status === 'error') {
            message.error("上传超时，请重试。");
        }
    }

    beforeUpload = (file) => {
        console.log(file.type);
        let isBoolean = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/jpg') || (file.type === 'image/gif') || (file.type === 'image/bmp');
        if (!isBoolean) {
            message.error('文件格式不正确，只能上传 JPG/PNG文件哦！');
        }
        return isBoolean;
    }
    resetState(userInfo) {
        return {
            userInfo: userInfo || {},
            dailog_title: "",
            show_dialog:false,
            loading: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.userInfo, this.props.userInfo)) {
           this.setState(this.resetState(nextProps.userInfo));
        }
    }
    componentWillMount = () => {
        console.log("componentWillMount");
        this.setState({
            userInfo: this.props.userInfo || {},
        })
    }
    handleOnCancel=()=>{
        this.setModalVisible(false)
    }
    handleOnOk=()=>{
        console.log("点击");
    }
    setModalVisible=(modalVisible)=> {
        this.setState({
            show_dialog:modalVisible
        });
    }
    changeName=()=>{
        this.setState({
            dailog_title: "修改用户名",
            show_dialog: true
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        /*this.setState({
            loading:true
        })*/
        console.log("Submit");
        this.props.form.validateFields((errors, values) => {
          if (errors) {
            console.log(' 表单验证错误!');
            return;
          }
          console.log('表单验证成功');
          console.log(values);
        })
    }
    render() {
        const userInfo = this.state.userInfo || {};
        const props = { //上传请求
            action: '/rest/api/member/updateMemberFace',
            data:{
                memberId: userInfo.memberId
            },
            listType: 'text',
            onChange: this.handleChange,
            multiple: false,
            // fileList: this.state.fileList,
            name: "face",
            accept: "image/*",
            beforeUpload: this.beforeUpload,
        };
        return (
            <div className="personal-center-box">
                <div className="avatar-container">
                    <h3>亲爱的{(userInfo.memberTruename?userInfo.memberTruename:userInfo.memberName)||"默认用户"}，来上传一张头像吧</h3>
                    <div className="avatar-content">
                        <div className="img-wrap">
                            <Img isShow={true} src={userInfo.memberAvatar} />
                        </div>
                        <Upload {...props} className="upload-list-inline">
                          <Button disabled={!userInfo.memberId?true:false} type="ghost"  id="antBtn">
                            <Icon type="upload" /> 上传新头像
                          </Button>
                        </Upload>
                    </div>
                    <div className="tips">支持JPG，JPEG，GIF，PNG，BMP，<br/>且小于5M</div>
                </div>
                <div className="userexinfo-form">
                    <div className="userexinfo-form__header">
                        <div className="section-div-1">
                            <span>账号：{userInfo.memberName}</span>
                            <span>性别：{userInfo.memberSex===1?"男":"女"}</span>
                        </div>
                        {/*<div className="section-div-1">
                            <span>生日：{userInfo.memberBirthday}</span>
                            <span>qq：{userInfo.memberQq}</span>
                        </div>*/}
                        <div className="section-div-2">
                            <span>已完成的订单：{userInfo.finishOrder}</span>
                            <span>未支付的订单：{userInfo.noPayOrder}</span>
                            <span>待发货订单：{userInfo.noFilledOrder}</span>
                            <span>待收货订单：{userInfo.noReceiveOrder}</span>
                        </div>
                    </div>
                    <div className="userexinfo-form__section">
                        <span className="userimg">
                             <i className="fa fa-user"></i>
                        </span>
                            姓名：{userInfo.memberTruename}
                        <Button className="btn" onClick={this.changeName}>修改</Button>
                    </div>
                    <div className="userexinfo-form__section">
                        <span className="userimg">
                             <i className="fa fa-key"></i>
                        </span>
                            密码：******
                        <Button className="btn"><Link to="/personal_center">修改</Link></Button>
                    </div>
                    <div className="userexinfo-form__section">
                        <span className="userimg">
                             <i className="fa fa-mobile-phone"></i>
                        </span>
                            手机号：{userInfo.memberMobile}
                        <Button className="btn"><Link to="/personal_center">更换</Link></Button>
                    </div>
                    <div className="userexinfo-form__section">
                        <span className="userimg">
                             <i className="fa fa-credit-card"></i>
                        </span>
                            我的钱包：{userInfo.availablePredeposit}
                        <Button className="btn"><Link to="/personal_center">充值</Link></Button>
                    </div>
                    <div className="userexinfo-form__footer">
                        <span>收藏的店铺：{userInfo.favStoreCount}</span>
                        <span>收藏的商品：{userInfo.favGoodsCount}</span>
                       {/* <span>会员积分：{userInfo.memberConsumePoints}</span>*/}
                    </div>
                    <Dialog
                        visible={this.state.show_dialog}
                        onCancel={this.handleOnCancel}
                        onOk={this.handleOnOk}
                        title={this.state.dailog_title}
                        footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.handleOnCancel}>取消</Button>
                        ]}
                    >
                        {this._popUpBox()}
                    </Dialog>
                </div>
            </div>
        );
      }
      _popUpBox=()=>{
        const {
          getFieldDecorator,
          getFieldError,
          isFieldValidating
        } = this.props.form;
        if(true){
            return(
                <div>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <div>用户名：{this.props.userInfo.memberTruename}</div>
                         <FormItem
                          id="control-user"
                          {...formItemLayout}
                          label="用户名"
                          hasFeedback
                          help={isFieldValidating('name') ? 'validating...' : (getFieldError('name') || []).join(', ')}
                        >
                          {getFieldDecorator('name', {
                                rules: [
                                  { required: true, message: '用户名不能为空！' }
                                ],
                            })(
                            <Input id="control-user" placeholder="" />
                          )}
                        </FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={this.state.loading} >
                          确定
                        </Button>
                    </Form>
                </div>
            )
        }
      }
    }

index = createForm()(index);
export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)

