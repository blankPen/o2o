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

function mapStateToProps({
    common
}){
    return {
        userInfo: common.userInfo
    };
}

export class index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = this.resetState(props.userInfo);
    }

    handleCancel = () => {
        this.setState({
            priviewVisible: false,
        });
    }
    handleChange = (info) => {
        console.log(info);
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        if (info.file.status === 'done') {
            fileList = fileList.map((file) => {
                if (file.response) {
                    console.log(file.response);
                    if(file.response.result==1){
                        let url = getRealPath(file.response.Path);
                        file.url = url;
                        this.setState({
                            priviewImage: url
                        });
                        message.success(`${info.file.name} 上传成功。`);
                        file.name = "";
                    }else{
                        message.error(`${info.file.name} 上传失败。`);
                        file.url=this.state.priviewImage;
                        file.thumbUrl=this.state.priviewImage;
                        this.setState({
                            priviewImage: this.state.priviewImage
                        });
                        file.name = "";
                    }
                }
                return file;
            });
            //this.loadGetUserInfo();
        } else if (info.file.status === 'error') {
            message.error("上传超时，请重试。");
            fileList=this.state.defaultList;
            this.setState({
                priviewImage: fileList[0].url
            });
        }
        this.setState({
            fileList:fileList
        });
    }

    beforeUpload = (file) => {
        console.log(file.type);
        let isBoolean = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/jpg') || (file.type === 'image/gif') || (file.type === 'image/bmp');
        if (!isBoolean) {
            message.error('文件格式不正确，只能上传 JPG/PNG文件哦！');
        }
        return isBoolean;
    }
    handleImg = () => {
        this.setState({
            priviewVisible: true
        });
    }

    componentWillMount = () => {
        console.log("componentWillMount");
        this.setState({
            userInfo: this.props.userInfo || {},
        })
    }
    resetState(userInfo) {
        let imgurl =  null;
        if (userInfo) {
            imgurl = userInfo.memberAvatar;
        }
        imgurl = getRealPath(imgurl);
        return {
            userInfo: userInfo || {},
            priviewVisible: false,
            priviewImage: imgurl,
            fileList: [{
                uid: -1,
                status: 'done',
                url: imgurl,
                thumbUrl: imgurl
            }],
            defaultList:[{
                uid: -1,
                status: 'done',
                url: imgurl,
                thumbUrl: imgurl
            }]
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.userInfo, this.props.userInfo)) {
           this.setState(this.resetState(nextProps.userInfo));
        }
    }
    render() {
        const userInfo = this.props.userInfo || {};
        const props = { //上传请求
            action: '/rest/api/member/updateMemberFace',
            data:{
                memberId:userInfo.memberId
            },
            listType: 'picture',
            onChange: this.handleChange,
            multiple: false,
            fileList: this.state.fileList,
            name:"face",
            accept:"image/*",
            beforeUpload: this.beforeUpload,
        }
        return (
            <div className="personal-center-box">
                <div className="avatar-container">
                    <h3>亲爱的{(userInfo.memberTruename?userInfo.memberTruename:userInfo.memberName)||"默认用户"}，来上传一张头像吧</h3>
                    <div className="avatar-content">
                        <Upload {...props} className="upload-list-inline"
                        >
                          <Button disabled={!userInfo.memberId?true:false} type="ghost"  id="antBtn">
                            <Icon type="upload" /> 上传新头像
                          </Button>
                        </Upload>
                        <div onClick={this.handleImg} id="openImg"></div>
                        <Modal  className="open-image-modal" visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel}>
                            <div className="defauleImg">{this.state.priviewImage!=undefined?<Img alt="example" src={this.state.priviewImage} className="example_img" />:<i className="anticon anticon-picture"></i>}</div>
                        </Modal>
                    </div>
                    <div className="tips">支持JPG，JPEG，GIF，PNG，BMP，<br/>且小于5M</div>
                </div>
                <div className="userexinfo-form">
                    <form >
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
                            <Button className="btn"><Link to="/personal_center">修改</Link></Button>
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
                    </form>
                </div>
            </div>
        );
      }
    }

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)

