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
        console.log(userInfo);
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
                        <Modal title="个人头像" className="open-image-modal" visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel}>
                            <div className="defauleImg">{this.state.priviewImage!=undefined?<Img alt="example" src={this.state.priviewImage} className="example_img" />:<i className="anticon anticon-picture"></i>}</div>
                        </Modal>
                    </div>
                    <div className="tips">支持JPG，JPEG，GIF，PNG，BMP，<br/>且小于5M</div>
                </div>
                <div className="userexinfo-form">
                    <form  method="post" action="/account/userexinfo">
                        <div className="userexinfo-form__section">
                             姓名：{userInfo.memberTruename}    修改
                        </div>
                        <div className="userexinfo-form__section">
                             密码：******    修改
                        </div>
                        <div className="userexinfo-form__section">
                             支付密码：******     修改
                        </div>
                        <div className="userexinfo-form__section">
                             手机号：{userInfo.memberMobile}    修改
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

